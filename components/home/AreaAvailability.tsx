"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, RefreshCw, Zap, Pencil, Check, X, AlertTriangle } from "lucide-react";

// ── Availability logic (mirrors WindowStep) ────────────────────────────────

type WindowStatus = "past" | "full" | "limited" | "available";

function formatHour(h: number): string {
  if (h === 12) return "12:00 PM";
  if (h > 12) return `${h - 12}:00 PM`;
  return `${h}:00 AM`;
}

function sameDayAs(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function addDays(base: Date, n: number): Date {
  const d = new Date(base);
  d.setDate(d.getDate() + n);
  d.setHours(0, 0, 0, 0);
  return d;
}

function mockBaseStatus(date: Date, startHour: number): "full" | "limited" | "available" {
  const seed = ((date.getDate() * 31 + date.getMonth() * 7 + startHour * 13) >>> 0) % 10;
  if (seed < 2) return "full";
  if (seed < 4) return "limited";
  return "available";
}

function limitedLabel(date: Date, startHour: number): string {
  return ["1 SLOT LEFT", "2 SLOTS LEFT", "1 SLOT LEFT"][(date.getDate() + startHour) % 3];
}

const WINDOW_STARTS = Array.from({ length: 12 }, (_, i) => 7 + i);

function buildWindows(date: Date, now: Date) {
  const isToday = sameDayAs(date, now);
  const nowMins = now.getHours() * 60 + now.getMinutes();
  return WINDOW_STARTS.map((startHour) => {
    const endHour = startHour + 2;
    const label = `${formatHour(startHour)} – ${formatHour(endHour)}`;
    if (isToday && nowMins >= startHour * 60) {
      return { startHour, label, status: "past" as WindowStatus, statusLabel: "PASSED" };
    }
    const base = mockBaseStatus(date, startHour);
    const statusLabel = base === "full" ? "FULL" : base === "limited" ? limitedLabel(date, startHour) : "AVAILABLE";
    return { startHour, label, status: base as WindowStatus, statusLabel };
  });
}

function bookableCount(date: Date, now: Date) {
  return buildWindows(date, now).filter((w) => w.status !== "past" && w.status !== "full").length;
}

function datePillLabel(date: Date, now: Date) {
  if (sameDayAs(date, now)) return "Today";
  if (sameDayAs(date, addDays(now, 1))) return "Tomorrow";
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

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

// ── Component ──────────────────────────────────────────────────────────────

const DEFAULT_ZIP = "92103";

export default function AreaAvailability() {
  const nowRef = useRef<Date>(new Date());
  const now = nowRef.current;

  const dateOptions = Array.from({ length: 7 }, (_, i) => addDays(now, i));
  const todayExhausted = now.getHours() >= 18 || bookableCount(dateOptions[0], now) === 0;

  const [selectedDate, setSelectedDate] = useState<Date>(todayExhausted ? dateOptions[1] : dateOptions[0]);
  const [notification, setNotification] = useState<string | null>(
    todayExhausted
      ? now.getHours() >= 18
        ? "It's past 6:00 PM — bookings for today are closed. Showing tomorrow's availability."
        : "All windows today are fully booked. Showing the next available day."
      : null
  );
  const [zip, setZip] = useState(DEFAULT_ZIP);
  const [editing, setEditing] = useState(false);
  const [zipInput, setZipInput] = useState(DEFAULT_ZIP);
  const router = useRouter();

  const handleZipSave = () => {
    const cleaned = zipInput.replace(/\D/g, "").slice(0, 5);
    if (cleaned.length === 5) { setZip(cleaned); setZipInput(cleaned); }
    setEditing(false);
  };

  const windows = buildWindows(selectedDate, now);
  // Show only 4 non-past windows so the section stays compact
  const visible = windows.filter((w) => w.status !== "past");

  const handleSlotClick = (w: { label: string; status: WindowStatus }) => {
    if (w.status === "full") return;
    const dateLabel = datePillLabel(selectedDate, now);
    const windowParam = encodeURIComponent(`${dateLabel}, ${w.label}`);
    router.push(`/schedule?zip=${zip}&window=${windowParam}`);
  };

  return (
    <section className="py-10 bg-white border-b border-gray-100" id="area-availability">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2 text-brand-blue font-bold text-base uppercase tracking-wide">
              <Zap className="w-5 h-5" />
              Area Availability
            </div>
            <p className="text-sm text-gray-500 mt-1">Real-time availability for your area.</p>
          </div>
          {editing ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5">
                <MapPin className="w-4 h-4 text-brand-blue flex-shrink-0" />
                <input
                  type="text"
                  inputMode="numeric"
                  value={zipInput}
                  onChange={(e) => setZipInput(e.target.value.replace(/\D/g, "").slice(0, 5))}
                  onKeyDown={(e) => { if (e.key === "Enter") handleZipSave(); if (e.key === "Escape") setEditing(false); }}
                  className="w-16 bg-transparent text-sm text-brand-navy font-medium focus:outline-none"
                  autoFocus
                />
              </div>
              <button onClick={handleZipSave} className="w-7 h-7 bg-brand-blue rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                <Check className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setEditing(false)} className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm text-brand-navy font-medium">
              <MapPin className="w-4 h-4 text-brand-blue" />
              {zip} ({ZIP_NEIGHBORHOODS[zip] ?? "San Diego Area"})
              <button
                onClick={() => { setZipInput(zip); setEditing(true); }}
                className="ml-1 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-400 hover:text-brand-blue transition-colors"
                aria-label="Update ZIP"
              >
                <Pencil className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Date strip + notification */}
        <div className="flex gap-4 mb-4 items-start">
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 flex-shrink-0" style={{ scrollbarWidth: "none" }}>
            {dateOptions.map((date, i) => {
              const active = sameDayAs(date, selectedDate);
              const isToday = sameDayAs(date, now);
              const hasSlots = bookableCount(date, now) > 0;
              const dayLabel = isToday ? "TODAY" : date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();

              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(date)}
                  className={`flex-shrink-0 flex flex-col items-center px-3.5 py-2 rounded-xl border-2 transition-all min-w-[58px]
                    ${active
                      ? "border-brand-blue bg-brand-blue text-white shadow-blue"
                      : hasSlots
                      ? "border-gray-200 bg-white text-brand-navy hover:border-brand-blue"
                      : "border-gray-100 bg-gray-50 text-gray-400 cursor-default"
                    }`}
                >
                  <span className={`text-[10px] font-bold tracking-wide ${active ? "text-blue-200" : isToday ? "text-brand-blue" : "text-gray-400"}`}>
                    {dayLabel}
                  </span>
                  <span className="text-lg font-black leading-tight">{date.getDate()}</span>
                  <span className={`text-[10px] ${active ? "text-blue-200" : "text-gray-400"}`}>
                    {date.toLocaleDateString("en-US", { month: "short" })}
                  </span>
                  {!active && (
                    <span className={`mt-0.5 w-1.5 h-1.5 rounded-full ${hasSlots ? "bg-green-500" : "bg-gray-300"}`} />
                  )}
                </button>
              );
            })}
          </div>

          {notification && (
            <div className="flex-1 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
              <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="flex-1 text-xs text-amber-800 leading-snug">{notification}</p>
              <button onClick={() => setNotification(null)} className="text-amber-400 hover:text-amber-600 flex-shrink-0">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* CTA prompt */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-xs font-semibold text-brand-blue uppercase tracking-wide flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 fill-brand-blue" />
            Tap a window below to book a free estimate now
          </span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        {/* Availability scroll */}
        <div className="overflow-hidden">
          <div
            className="flex gap-3 overflow-x-scroll pb-3 -mb-3"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
          >
            {visible.map((w) => {
              const disabled = w.status === "full" || w.status === "past";
              const statusColor =
                w.status === "available" ? "text-green-600" :
                w.status === "limited"   ? "text-orange-500" :
                                           "text-red-500";
              const borderColor =
                w.status === "available" ? "border-gray-200 hover:border-brand-blue" :
                w.status === "limited"   ? "border-orange-200 hover:border-orange-400" :
                                           "border-gray-200 opacity-60";

              return (
                <button
                  key={w.startHour}
                  type="button"
                  disabled={disabled}
                  onClick={() => handleSlotClick(w)}
                  className={`flex-shrink-0 w-56 flex items-center gap-3 px-4 py-3 rounded-xl border-2 bg-white transition-all text-left
                    ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
                    ${borderColor}`}
                >
                  {/* Radio bubble */}
                  <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors
                    ${disabled ? "border-gray-200 bg-gray-100" : "border-gray-300"}`}
                  />
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-brand-navy whitespace-nowrap">{w.label}</span>
                    <span className={`text-xs font-semibold mt-0.5 ${statusColor}`}>{w.statusLabel}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Microcopy */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
          <RefreshCw className="w-3.5 h-3.5" />
          Availability updates in real-time. Windows fill up fast.
        </div>
      </div>
    </section>
  );
}
