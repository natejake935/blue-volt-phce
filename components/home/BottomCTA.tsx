"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Zap } from "lucide-react";

export default function BottomCTA() {
  const [zip, setZip] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/schedule${zip ? `?zip=${zip}` : ""}`);
  };

  return (
    <section className="bg-brand-navy py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-1">
              <Zap className="w-5 h-5 text-brand-yellow" />
              <h2 className="text-white font-black text-xl">
                Don&apos;t Wait. Book a Free Estimate Today!
              </h2>
            </div>
            <p className="text-blue-300 text-sm">Enter your ZIP code to see real-time availability in your area.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex w-full md:w-auto gap-3">
            <div className="relative flex-1 md:w-56">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder="Enter ZIP Code"
                maxLength={5}
                className="w-full pl-9 pr-4 py-3.5 rounded-xl text-sm border-0 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
              />
            </div>
            <button
              type="submit"
              className="bg-brand-yellow text-brand-navy font-black px-6 py-3.5 rounded-xl hover:bg-yellow-400 transition-colors whitespace-nowrap flex items-center gap-2 text-sm"
            >
              <Zap className="w-4 h-4" />
              SCHEDULE NOW
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
