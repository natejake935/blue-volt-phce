"use client";

import { useRef, useState, useEffect } from "react";
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  ChevronLeft,
  Clock,
  RefreshCw,
  X,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type WindowStatus = "past" | "full" | "limited" | "available";

interface TimeWindow {
  id: string;
  startHour: number;
  endHour: number;
  label: string;
  status: WindowStatus;
  statusLabel: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

// 2-hour blocks starting every hour from 7 AM to 6 PM (last window: 6–8 PM)
const WINDOW_STARTS: number[] = Array.from({ length: 12 }, (_, i) => 7 + i);
// → 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatHour(h: number): string {
  if (h === 12) return "12:00 PM";
  if (h > 12) return `${h - 12}:00 PM`;
  return `${h}:00 AM`;
}

function sameDayAs(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function addDays(base: Date, n: number): Date {
  const d = new Date(base);
  d.setDate(d.getDate() + n);
  d.setHours(0, 0, 0, 0);
  return d;
}

// Deterministic mock for non-past slots — based on date + hour so it feels stable
function mockBaseStatus(date: Date, startHour: number): "full" | "limited" | "available" {
  const seed = ((date.getDate() * 31 + date.getMonth() * 7 + startHour * 13) >>> 0) % 10;
  if (seed < 2) return "full";
  if (seed < 4) return "limited";
  return "available";
}

function limitedLabel(date: Date, startHour: number): string {
  const seed = (date.getDate() + startHour) % 3;
  return ["1 SLOT LEFT", "2 SLOTS LEFT", "1 SLOT LEFT"][seed];
}

// Build the 12 windows for a given date, factoring in current time for today
function buildWindows(date: Date, now: Date): TimeWindow[] {
  const isToday = sameDayAs(date, now);
  const nowMins = now.getHours() * 60 + now.getMinutes();

  return WINDOW_STARTS.map((startHour) => {
    const endHour = startHour + 2;
    const label = `${formatHour(startHour)} – ${formatHour(endHour)}`;
    const id = String(startHour);

    // A window is "past" on today only if the current time has reached its start
    if (isToday && nowMins >= startHour * 60) {
      return { id, startHour, endHour, label, status: "past", statusLabel: "PASSED" };
    }

    const base = mockBaseStatus(date, startHour);
    const statusLabel =
      base === "full" ? "FULL" : base === "limited" ? limitedLabel(date, startHour) : "AVAILABLE";

    return { id, startHour, endHour, label, status: base, statusLabel };
  });
}

// Count bookable (non-past, non-full) slots on a date
function bookableCount(date: Date, now: Date): number {
  return buildWindows(date, now).filter(
    (w) => w.status !== "past" && w.status !== "full"
  ).length;
}

// Human-readable date label for the pill
function datePillLabel(date: Date, now: Date): string {
  if (sameDayAs(date, now)) return "Today";
  if (sameDayAs(date, addDays(now, 1))) return "Tomorrow";
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

// Label used in the booking summary / passed to parent
function buildWindowLabel(date: Date, now: Date, windowLabel: string): string {
  const prefix = datePillLabel(date, now);
  return `${prefix}, ${windowLabel}`;
}

// ZIP → neighborhood name — Backend hook: replace with ZIP-to-zone API lookup
const ZIP_NEIGHBORHOODS: Record<string, string> = {
  "92103": "Hillcrest / North Park",
  "92130": "Carmel Valley",
  "92037": "La Jolla",
  "92131": "Scripps Ranch",
  "92009": "Carlsbad",
  "92064": "Poway",
  "92139": "Skyline / Encanto",
  "91910": "Chula Vista",
  "92113": "Barrio Logan",
  "92110": "Mission Hills / Linda Vista",
};
const neighborhood = (zip: string) => ZIP_NEIGHBORHOODS[zip] ?? "San Diego Area";

// Status → static Tailwind classes (avoids purge issues with dynamic strings)
const STATUS_LABEL_CLASS: Record<WindowStatus, string> = {
  past: "text-gray-400",
  full: "text-red-600",
  limited: "text-orange-600",
  available: "text-green-600",
};

// ─── Component ────────────────────────────────────────────────────────────────

interface WindowStepProps {
  zip: string;
  onBack: () => void;
  onNext: (window: string) => void;
}

export default function WindowStep({ zip, onBack, onNext }: WindowStepProps) {
  // Stable "now" — captured once at mount so re-renders don't shift it mid-session
  const nowRef = useRef<Date>(new Date());
  const now = nowRef.current;

  // Generate 14-day date options starting from today
  const dateOptions: Date[] = Array.from({ length: 14 }, (_, i) => addDays(now, i));

  // ── Auto-select initial date ───────────────────────────────────────────────
  // If it's past 6 PM or today has zero bookable slots, jump straight to tomorrow
  const todayIsExhausted =
    now.getHours() >= 18 || bookableCount(dateOptions[0], now) === 0;

  const [selectedDate, setSelectedDate] = useState<Date>(
    todayIsExhausted ? dateOptions[1] : dateOptions[0]
  );
  const [notification, setNotification] = useState<string | null>(
    todayIsExhausted
      ? now.getHours() >= 18
        ? "It's past 6:00 PM — our last bookings for today are closed. You can get an electrician as early as tomorrow morning!"
        : "All appointment windows for today are fully booked. You can get an electrician as early as tomorrow — select a time below."
      : null
  );
  const [selectedWindowId, setSelectedWindowId] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const windows = buildWindows(selectedDate, now);
  const scrollListRef = useRef<HTMLDivElement>(null);
  const firstAvailableRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (firstAvailableRef.current && scrollListRef.current) {
      scrollListRef.current.scrollTop = firstAvailableRef.current.offsetTop - scrollListRef.current.offsetTop;
    }
  }, [selectedDate]);
  const area = neighborhood(zip);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedWindowId(null);
    setError(false);
  };

  const handleWindowClick = (w: TimeWindow) => {
    if (w.status === "past" || w.status === "full") return;
    setSelectedWindowId(w.id);
    setError(false);
  };

  const handleContinue = () => {
    if (!selectedWindowId) {
      setError(true);
      return;
    }
    const win = windows.find((w) => w.id === selectedWindowId);
    if (!win) return;
    onNext(buildWindowLabel(selectedDate, now, win.label));
  };

  const selectedWin = windows.find((w) => w.id === selectedWindowId) ?? null;

  return (
    <div className="grid md:grid-cols-5 gap-8 items-start">

      {/* ── Left column: picker ────────────────────────────────────────────── */}
      <div className="md:col-span-3 space-y-5">

        {/* Header */}
        <div>
          <h2 className="text-2xl font-black text-brand-navy">
            Availability for {zip}
          </h2>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="text-gray-500 text-sm">{area}</span>
            <button
              onClick={onBack}
              className="text-brand-blue text-sm font-semibold hover:underline"
            >
              ✏ Update ZIP
            </button>
          </div>
        </div>

        {/* Notification banner (auto-switched to tomorrow) */}
        {notification && (
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="flex-1 text-sm text-amber-800 leading-snug">{notification}</p>
            <button
              onClick={() => setNotification(null)}
              aria-label="Dismiss"
              className="text-amber-400 hover:text-amber-600 flex-shrink-0 mt-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ── Date strip ─────────────────────────────────────────────────── */}
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-brand-navy mb-3">
            <Calendar className="w-4 h-4 text-brand-blue" />
            Select a date
          </div>

          {/* Horizontally scrollable pill row */}
          <div
            className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1"
            style={{ scrollbarWidth: "thin", scrollbarColor: "#CBD5E1 transparent" }}
          >
            {dateOptions.map((date, i) => {
              const active = sameDayAs(date, selectedDate);
              const isToday = sameDayAs(date, now);
              const hasSlots = bookableCount(date, now) > 0;
              const dayLabel = isToday
                ? "TODAY"
                : date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();

              return (
                <button
                  key={i}
                  onClick={() => handleDateSelect(date)}
                  className={`
                    flex-shrink-0 flex flex-col items-center px-3.5 py-2.5 rounded-xl border-2
                    transition-all duration-150 min-w-[64px] focus:outline-none focus-visible:ring-2
                    focus-visible:ring-brand-blue
                    ${
                      active
                        ? "border-brand-blue bg-brand-blue text-white shadow-blue"
                        : hasSlots
                        ? "border-gray-200 bg-white text-brand-navy hover:border-brand-blue"
                        : "border-gray-100 bg-gray-50 text-gray-400 cursor-default"
                    }
                  `}
                >
                  <span className={`text-[10px] font-bold tracking-wide ${active ? "text-blue-200" : isToday ? "text-brand-blue" : "text-gray-400"}`}>
                    {dayLabel}
                  </span>
                  <span className={`text-xl font-black leading-tight ${active ? "text-white" : ""}`}>
                    {date.getDate()}
                  </span>
                  <span className={`text-[10px] ${active ? "text-blue-200" : "text-gray-400"}`}>
                    {date.toLocaleDateString("en-US", { month: "short" })}
                  </span>
                  {/* Availability dot */}
                  {!active && (
                    <span
                      className={`mt-1 w-1.5 h-1.5 rounded-full ${hasSlots ? "bg-green-500" : "bg-gray-300"}`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Window list ────────────────────────────────────────────────── */}
        <div>
          <p className="text-sm font-semibold text-brand-navy mb-3">
            Select your 2-hour arrival window
          </p>

          {/* Scrollable list — max ~5.5 slots visible, then scroll */}
          <div
            ref={scrollListRef}
            className="space-y-2 max-h-[352px] overflow-y-auto pr-1"
            style={{ scrollbarWidth: "thin", scrollbarColor: "#CBD5E1 transparent" }}
          >
            {windows.map((w, i) => {
              const disabled = w.status === "past" || w.status === "full";
              const active = selectedWindowId === w.id;
              const isFirstAvailable = w.status !== "past" && windows.slice(0, i).every((prev) => prev.status === "past");

              return (
                <button
                  key={w.id}
                  ref={isFirstAvailable ? firstAvailableRef : undefined}
                  type="button"
                  disabled={disabled}
                  onClick={() => handleWindowClick(w)}
                  className={`
                    w-full flex items-center justify-between px-4 py-3.5 rounded-xl border-2
                    text-left transition-all duration-150 focus:outline-none focus-visible:ring-2
                    focus-visible:ring-brand-blue
                    ${
                      disabled
                        ? "border-gray-100 bg-gray-50 cursor-not-allowed opacity-60"
                        : active
                        ? "border-brand-blue bg-blue-50 shadow-md"
                        : "border-gray-200 bg-white hover:border-brand-blue"
                    }
                  `}
                >
                  {/* Left: radio + label */}
                  <div className="flex items-center gap-3">
                    {/* Radio circle */}
                    <div
                      className={`
                        w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center
                        transition-colors
                        ${
                          active
                            ? "border-brand-blue bg-brand-blue"
                            : disabled
                            ? "border-gray-200 bg-gray-100"
                            : "border-gray-300"
                        }
                      `}
                    >
                      {active && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>

                    {/* Time label — strikethrough when past */}
                    <span
                      className={`
                        font-semibold text-sm
                        ${w.status === "past" ? "line-through text-gray-400" : "text-brand-navy"}
                      `}
                    >
                      {w.label}
                    </span>
                  </div>

                  {/* Right: status badge */}
                  <span className={`text-xs font-bold ml-4 flex-shrink-0 ${STATUS_LABEL_CLASS[w.status]}`}>
                    {w.statusLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Validation error */}
        {error && (
          <p className="text-sm text-red-600 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" /> Please select an available time window.
          </p>
        )}

        {/* Realtime notice */}
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <RefreshCw className="w-3.5 h-3.5" />
          Windows update in real time and are not held until confirmed.
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 border-2 border-gray-200 text-brand-navy font-semibold
              px-5 py-3 rounded-xl hover:border-gray-300 transition-colors text-sm flex-shrink-0"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <button
            onClick={handleContinue}
            disabled={!selectedWindowId}
            className="flex-1 bg-brand-blue text-white font-bold py-3 rounded-xl text-sm
              hover:bg-blue-700 transition-colors shadow-blue
              disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continue →
          </button>
        </div>
      </div>

      {/* ── Right column: sidebar ──────────────────────────────────────────── */}
      <div className="md:col-span-2 space-y-4">

        {/* What to expect */}
        <div className="bg-brand-gray rounded-2xl p-5 border border-gray-100">
          <div className="flex items-center gap-2 text-brand-navy font-bold text-sm mb-4">
            <Clock className="w-4 h-4 text-brand-blue" />
            What to expect
          </div>
          <ul className="space-y-3">
            {[
              "Electrician arrives in your selected 2-hour window",
              "You'll get a call 30 min before arrival",
              "Upfront pricing, no surprise fees",
              "Work is guaranteed",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Selected window summary card */}
        {selectedWin && (
          <div className="bg-blue-50 border-2 border-brand-blue rounded-2xl p-4 animate-fade-in">
            <div className="text-xs font-bold text-brand-blue mb-1.5 uppercase tracking-wide">
              Selected Window
            </div>
            <div className="font-bold text-brand-navy text-base">{selectedWin.label}</div>
            <div className="text-xs text-gray-500 mt-1">
              {datePillLabel(selectedDate, now)} · {area}
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Legend</div>
          <ul className="space-y-2 text-xs">
            {([
              ["bg-green-500", "Available"],
              ["bg-orange-500", "Limited slots"],
              ["bg-red-500", "Fully booked"],
              ["bg-gray-300", "Time passed"],
            ] as [string, string][]).map(([dot, label]) => (
              <li key={label} className="flex items-center gap-2 text-gray-600">
                <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${dot}`} />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
