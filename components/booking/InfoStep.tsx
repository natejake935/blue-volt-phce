"use client";

import { useState } from "react";
import { ChevronLeft, Lock, User, Phone, Mail, MapPin, MessageSquare, Home } from "lucide-react";

export interface CustomerInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  aptSuite: string;
  issue: string;
  smsConsent: boolean;
}

interface InfoStepProps {
  onBack: () => void;
  onNext: (info: CustomerInfo) => void;
}

const inputClass = (hasError: boolean) =>
  `w-full pl-10 pr-4 py-3.5 border-2 rounded-xl text-sm focus:outline-none transition-colors
  ${hasError ? "border-brand-red bg-red-50" : "border-gray-200 focus:border-brand-blue"}`;

export default function InfoStep({ onBack, onNext }: InfoStepProps) {
  const [form, setForm] = useState<CustomerInfo>({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    aptSuite: "",
    issue: "",
    smsConsent: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerInfo, string>>>({});

  const set = (key: keyof CustomerInfo, value: string | boolean) =>
    setForm((f) => ({ ...f, [key]: value }));

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CustomerInfo, string>> = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.email.trim()) newErrors.email = "Email address is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Enter a valid email";
    if (!form.address.trim()) newErrors.address = "Service address is required";
    if (!form.smsConsent) newErrors.smsConsent = "Please agree to receive confirmation";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onNext(form);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-black text-brand-navy">Enter your details</h2>
        <p className="text-gray-500 text-sm mt-1">We'll use this to confirm your appointment.</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="grid sm:grid-cols-3 gap-4">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-semibold text-brand-navy mb-1.5">
              Full Name <span className="text-brand-red">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="fullName"
                type="text"
                autoComplete="name"
                value={form.fullName}
                onChange={(e) => set("fullName", e.target.value)}
                placeholder="John Smith"
                className={inputClass(!!errors.fullName)}
              />
            </div>
            {errors.fullName && <p className="mt-1 text-xs text-brand-red">{errors.fullName}</p>}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-brand-navy mb-1.5">
              Phone Number <span className="text-brand-red">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="(619) 555-1234"
                className={inputClass(!!errors.phone)}
              />
            </div>
            {errors.phone && <p className="mt-1 text-xs text-brand-red">{errors.phone}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-brand-navy mb-1.5">
              Email Address <span className="text-brand-red">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="john@email.com"
                className={inputClass(!!errors.email)}
              />
            </div>
            {errors.email && <p className="mt-1 text-xs text-brand-red">{errors.email}</p>}
          </div>
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-semibold text-brand-navy mb-1.5">
            Service Address <span className="text-brand-red">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              id="address"
              type="text"
              autoComplete="street-address"
              value={form.address}
              onChange={(e) => set("address", e.target.value)}
              placeholder="1234 University Ave, San Diego, CA 92103"
              className={inputClass(!!errors.address)}
            />
          </div>
          {errors.address && <p className="mt-1 text-xs text-brand-red">{errors.address}</p>}
        </div>

        {/* Apt/Suite */}
        <div>
          <label htmlFor="aptSuite" className="block text-sm font-semibold text-brand-navy mb-1.5">
            Apt / Unit / Suite
            <span className="text-gray-400 font-normal ml-1">(optional)</span>
          </label>
          <div className="relative">
            <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              id="aptSuite"
              type="text"
              value={form.aptSuite}
              onChange={(e) => set("aptSuite", e.target.value)}
              placeholder="Apt 2B"
              className="w-full pl-10 pr-4 py-3.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-blue transition-colors"
            />
          </div>
        </div>

        {/* Issue description */}
        <div>
          <label htmlFor="issue" className="block text-sm font-semibold text-brand-navy mb-1.5">
            Briefly describe the issue
            <span className="text-gray-400 font-normal ml-1">(optional)</span>
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            <textarea
              id="issue"
              value={form.issue}
              onChange={(e) => set("issue", e.target.value)}
              placeholder="e.g. Breaker keeps tripping in kitchen..."
              rows={3}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-blue transition-colors resize-none"
            />
          </div>
        </div>

        {/* SMS consent */}
        <div>
          <label className={`flex items-start gap-3 cursor-pointer ${errors.smsConsent ? "text-brand-red" : "text-gray-700"}`}>
            <div className="relative flex-shrink-0 mt-0.5">
              <input
                type="checkbox"
                checked={form.smsConsent}
                onChange={(e) => set("smsConsent", e.target.checked)}
                className="sr-only peer"
              />
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors
                ${form.smsConsent ? "bg-brand-blue border-brand-blue" : errors.smsConsent ? "border-brand-red" : "border-gray-300"}`}>
                {form.smsConsent && <span className="text-white text-xs font-black">✓</span>}
              </div>
            </div>
            <span className="text-sm">
              I agree to receive appointment confirmation by phone/text.
            </span>
          </label>
          {errors.smsConsent && <p className="mt-1 text-xs text-brand-red ml-8">{errors.smsConsent}</p>}
        </div>

        {/* Navigation */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 border-2 border-gray-200 text-brand-navy font-semibold px-5 py-3.5 rounded-xl hover:border-gray-300 transition-colors text-sm"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <button
            type="submit"
            className="flex-1 bg-brand-blue text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-colors text-sm shadow-blue"
          >
            REQUEST APPOINTMENT CONFIRMATION
          </button>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
          <Lock className="w-3.5 h-3.5" />
          No payment required. Just real availability.
        </div>
      </form>
    </div>
  );
}
