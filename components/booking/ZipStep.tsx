"use client";

import { useState } from "react";
import { MapPin, Navigation, Lock, CheckCircle, Search } from "lucide-react";

interface ZipStepProps {
  initialZip?: string;
  onNext: (zip: string) => void;
}

const trustItems = [
  "Same-Day Service",
  "Licensed & Insured",
  "Background Checked",
  "Upfront Pricing",
  "On-Time Guarantee",
];

export default function ZipStep({ initialZip = "", onNext }: ZipStepProps) {
  const [zip, setZip] = useState(initialZip);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zip.trim() || zip.length < 5) {
      setError("Please enter a valid 5-digit ZIP code.");
      return;
    }
    setError("");
    onNext(zip.trim());
  };

  const handleLocation = () => {
    // Backend hook: use navigator.geolocation to detect ZIP from coordinates
    setZip("92103");
    setError("");
  };

  return (
    <div className="grid md:grid-cols-5 gap-8 items-start">
      {/* Main form */}
      <div className="md:col-span-3">
        <div className="text-center md:text-left mb-6">
          <h2 className="text-2xl font-black text-brand-navy">Let&apos;s get started!</h2>
          <p className="text-gray-500 text-sm mt-2">
            Enter your ZIP code so we can check availability in your area.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="zip" className="block text-sm font-semibold text-brand-navy mb-1.5">
              ZIP Code
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="zip"
                type="text"
                inputMode="numeric"
                value={zip}
                onChange={(e) => {
                  setZip(e.target.value.replace(/\D/g, "").slice(0, 5));
                  if (error) setError("");
                }}
                placeholder="e.g. 92103"
                maxLength={5}
                className={`w-full pl-11 pr-4 py-4 border-2 rounded-xl text-base focus:outline-none transition-colors
                  ${error ? "border-brand-red bg-red-50" : "border-gray-200 focus:border-brand-blue"}`}
                aria-describedby={error ? "zip-error" : undefined}
              />
            </div>
            {error && (
              <p id="zip-error" className="mt-1.5 text-sm text-brand-red flex items-center gap-1">
                <span>⚠</span> {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-brand-blue text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors text-base flex items-center justify-center gap-2 shadow-blue"
          >
            <Search className="w-5 h-5" />
            CHECK AVAILABILITY
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <button
            type="button"
            onClick={handleLocation}
            className="w-full border-2 border-gray-200 text-brand-navy font-semibold py-3.5 rounded-xl hover:border-brand-blue hover:text-brand-blue transition-colors text-sm flex items-center justify-center gap-2"
          >
            <Navigation className="w-4 h-4" />
            Use My Current Location
          </button>
        </form>

        <div className="flex items-center justify-center gap-1.5 mt-5 text-xs text-gray-400">
          <Lock className="w-3.5 h-3.5" />
          No payment required. Just real availability.
        </div>
      </div>

      {/* Trust sidebar */}
      <div className="md:col-span-2 bg-brand-gray rounded-2xl p-5 border border-gray-100">
        <h3 className="font-bold text-brand-navy text-sm mb-4">Why book with Blue Bolt?</h3>
        <ul className="space-y-3">
          {trustItems.map((item) => (
            <li key={item} className="flex items-center gap-3 text-sm text-gray-700">
              <CheckCircle className="w-5 h-5 text-brand-green flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-5 pt-4 border-t border-gray-200">
          <div className="flex gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-xs text-gray-500">4.9 rating from 500+ San Diego customers</p>
        </div>
      </div>
    </div>
  );
}
