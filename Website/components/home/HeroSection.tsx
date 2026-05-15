"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, Phone, CheckCircle, Star, Search, MapPin, Lock } from "lucide-react";
import Image from "next/image";

const trustBullets = [
  "Same-Day Service Across San Diego County",
  "Licensed, Insured & Background Checked",
  "On-Time Guarantee & Live ETA Updates",
];

const avatarColors = ["bg-blue-400", "bg-indigo-400", "bg-sky-400", "bg-violet-400"];

export default function HeroSection() {
  const [zip, setZip] = useState("");
  const [zipError, setZipError] = useState(false);
  const router = useRouter();

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zip.trim()) {
      setZipError(true);
      return;
    }
    setZipError(false);
    router.push(`/schedule?zip=${zip.trim()}`);
  };

  return (
    <section
      className="relative overflow-hidden bg-brand-navy hero-bg"
      style={{
        backgroundImage: "url('/hero-bg.png')",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "luminosity",
      }}
    >
      <div className="absolute inset-0 bg-brand-navy/40 z-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/80 via-brand-navy/50 to-brand-navy/20 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Hero copy */}
          <div>
            {/* Urgency badge */}
            <div className="inline-flex items-center gap-2 bg-brand-yellow text-brand-navy text-xs font-bold px-4 py-2 rounded-full mb-6 shadow-lg">
              <Zap className="w-3.5 h-3.5 fill-brand-navy" />
              SAME-DAY ELECTRICIAN AVAILABLE — Call Now & Save
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-white leading-tight">
              Book a Same-Day Electrician for a<br />
              Free Estimate <span className="text-brand-yellow">Today</span>
            </h1>

            <p className="mt-4 text-lg text-blue-200 font-medium">
              Schedule a 2-hour arrival window in under 60 seconds.
            </p>

            <ul className="mt-6 space-y-3">
              {trustBullets.map((bullet) => (
                <li key={bullet} className="flex items-center gap-3 text-blue-100">
                  <CheckCircle className="w-5 h-5 text-brand-yellow flex-shrink-0" />
                  <span className="text-sm font-medium">{bullet}</span>
                </li>
              ))}
            </ul>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/schedule"
                className="inline-flex items-center gap-2 bg-brand-blue text-white font-bold px-7 py-4 rounded-xl hover:bg-blue-700 transition-all shadow-blue text-base"
              >
                <Zap className="w-5 h-5 fill-white" />
                <div className="text-left">
                  <div>SCHEDULE NOW & SAVE</div>
                  <div className="text-xs font-normal text-blue-200">See real-time openings in your area</div>
                </div>
              </Link>

              <a
                href="tel:8582255957"
                className="inline-flex items-center gap-3 bg-white/10 border-2 border-white/30 text-white font-bold px-7 py-4 rounded-xl hover:bg-white/20 transition-all text-base"
              >
                <Phone className="w-5 h-5" />
                <div className="text-left">
                  <div>CALL NOW</div>
                  <div className="text-xs font-normal text-blue-200">(858) 225-5957</div>
                </div>
              </a>
            </div>

            {/* Social proof row */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                {avatarColors.map((color, i) => (
                  <div key={i} className={`w-9 h-9 rounded-full border-2 border-white ${color} flex items-center justify-center text-white text-xs font-bold`}>
                    {["JM", "AR", "TB", "KL"][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-brand-yellow fill-brand-yellow" />
                  ))}
                  <span className="text-white font-bold ml-1">4.9</span>
                </div>
                <div className="text-xs text-blue-200">From 500+ San Diego Customers</div>
              </div>
              <Image
                src="/bbb-badge.png"
                alt="BBB A+ Accredited Business"
                width={140}
                height={80}
                className="object-contain"
                style={{ filter: "brightness(0) invert(1) sepia(1) saturate(2) hue-rotate(190deg) brightness(1.1)" }}
              />
            </div>
          </div>

          {/* Right: Availability card */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-brand-blue/10 rounded-2xl mb-4">
                  <Zap className="w-7 h-7 text-brand-blue" />
                </div>
                <h3 className="font-bold text-brand-navy text-xl">Check Same-Day Availability</h3>
                <p className="text-sm text-gray-500 mt-2">We&apos;ll show real-time openings in your area.</p>
                <div className="inline-flex items-center gap-1 bg-blue-50 text-brand-blue text-xs font-semibold px-3 py-1.5 rounded-full mt-3">
                  Step 1 of 3
                </div>
              </div>

              <form onSubmit={handleCheck} className="space-y-4">
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={zip}
                    onChange={(e) => { setZip(e.target.value); setZipError(false); }}
                    placeholder="Enter ZIP Code"
                    maxLength={5}
                    className={`w-full pl-11 pr-4 py-4 border-2 rounded-xl text-base focus:outline-none transition-colors ${zipError ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-brand-blue"}`}
                  />
                  {zipError && (
                    <p className="mt-1.5 text-xs text-red-500 font-medium">Please enter your ZIP code to check availability.</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-brand-blue text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-base"
                >
                  <Search className="w-5 h-5" />
                  CHECK AVAILABILITY
                </button>
              </form>

              <div className="flex items-center justify-center gap-1.5 mt-4 text-sm text-gray-400">
                <Lock className="w-3.5 h-3.5" />
                No commitment. Just real availability.
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-center gap-3">
                <div className="flex -space-x-2">
                  {avatarColors.slice(0, 3).map((color, i) => (
                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-white ${color} flex items-center justify-center text-white text-xs font-bold`}>
                      {["JM", "AR", "TB"][i]}
                    </div>
                  ))}
                </div>
                <div className="text-xs text-gray-500">
                  <span className="font-semibold text-brand-navy">500+</span> San Diego customers served
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
