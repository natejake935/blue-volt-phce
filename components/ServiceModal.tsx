"use client";

import { useEffect } from "react";
import { X, Zap, LucideIcon, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface ServiceInfo {
  label: string;
  icon: LucideIcon;
  description: string;
  bullets: string[];
  photo: string;
}

interface ServiceModalProps {
  service: ServiceInfo;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function ServiceModal({ service, onClose, onPrev, onNext }: ServiceModalProps) {
  const Icon = service.icon;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Prev arrow — outside the panel (desktop only) */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="hidden sm:flex relative z-10 flex-shrink-0 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full items-center justify-center text-white transition-colors mr-3"
        aria-label="Previous service"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Photo */}
        <div className="relative h-52 w-full bg-slate-800">
          <Image
            src={service.photo}
            alt={service.label}
            fill
            className="object-cover"
            sizes="512px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Icon className="w-5 h-5 text-white" strokeWidth={1.75} />
            </div>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-black text-brand-navy">{service.label.replace("\n", " ")}</h3>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">{service.description}</p>

          <ul className="mt-4 space-y-2">
            {service.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="mt-0.5 w-4 h-4 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 12 12" className="w-2.5 h-2.5 text-brand-blue"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
                </span>
                {b}
              </li>
            ))}
          </ul>

          {/* Mobile prev/next row */}
          <div className="flex sm:hidden items-center justify-between mt-5 pt-4 border-t border-gray-100">
            <button
              onClick={onPrev}
              className="flex items-center gap-1.5 text-sm font-semibold text-brand-navy hover:text-brand-blue transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <button
              onClick={onNext}
              className="flex items-center gap-1.5 text-sm font-semibold text-brand-navy hover:text-brand-blue transition-colors"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <Link
            href="/schedule"
            className="mt-4 w-full bg-brand-blue text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <Zap className="w-4 h-4 fill-white" />
            BOOK THIS SERVICE
          </Link>
        </div>
      </div>

      {/* Next arrow — outside the panel (desktop only) */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="hidden sm:flex relative z-10 flex-shrink-0 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full items-center justify-center text-white transition-colors ml-3"
        aria-label="Next service"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
