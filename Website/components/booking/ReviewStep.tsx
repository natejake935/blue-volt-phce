"use client";

import { ChevronLeft, Lock, MapPin, Clock, User, Phone, Mail, Home } from "lucide-react";
import { CustomerInfo } from "./InfoStep";

interface ReviewStepProps {
  zip: string;
  window: string;
  info: CustomerInfo;
  onBack: () => void;
  onSubmit: () => void;
  submitting?: boolean;
}

interface ReviewRowProps {
  icon: React.ElementType;
  label: string;
  value: string;
  onEdit: () => void;
}

function ReviewRow({ icon: Icon, label, value, onEdit }: ReviewRowProps) {
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 text-brand-blue" />
        </div>
        <div>
          <div className="text-xs text-gray-400 font-medium">{label}</div>
          <div className="text-sm text-brand-navy font-semibold">{value}</div>
        </div>
      </div>
      <button
        onClick={onEdit}
        className="text-brand-blue text-sm font-semibold hover:underline flex-shrink-0 ml-4"
      >
        Edit
      </button>
    </div>
  );
}

export default function ReviewStep({ zip, window, info, onBack, onSubmit, submitting }: ReviewStepProps) {
  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-brand-navy">Review your request</h2>
        <p className="text-gray-500 text-sm mt-1">Please confirm your details are correct.</p>
      </div>

      <div className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden shadow-card">
        <div className="px-5 py-4 bg-blue-50 border-b border-gray-100">
          <div className="text-xs font-bold text-brand-blue uppercase tracking-wide">Appointment Summary</div>
        </div>
        <div className="px-5">
          <ReviewRow icon={MapPin} label="ZIP Code" value={`${zip}`} onEdit={() => onBack()} />
          <ReviewRow icon={Clock} label="Arrival Window" value={window} onEdit={() => onBack()} />
          <ReviewRow icon={User} label="Full Name" value={info.fullName} onEdit={() => onBack()} />
          <ReviewRow icon={Phone} label="Phone Number" value={info.phone} onEdit={() => onBack()} />
          <ReviewRow icon={Mail} label="Email Address" value={info.email} onEdit={() => onBack()} />
          <ReviewRow
            icon={Home}
            label="Service Address"
            value={info.aptSuite ? `${info.address}, ${info.aptSuite}` : info.address}
            onEdit={() => onBack()}
          />
        </div>
      </div>

      {info.issue && (
        <div className="mt-4 bg-gray-50 rounded-xl p-4 border border-gray-100">
          <div className="text-xs text-gray-400 font-medium mb-1">Issue description</div>
          <p className="text-sm text-gray-700">{info.issue}</p>
        </div>
      )}

      <div className="mt-6 flex gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-2 border-2 border-gray-200 text-brand-navy font-semibold px-5 py-3.5 rounded-xl hover:border-gray-300 transition-colors text-sm"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={onSubmit}
          disabled={submitting}
          className="flex-1 bg-brand-blue text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-colors text-sm shadow-blue disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
              </svg>
              SENDING…
            </>
          ) : (
            "SUBMIT REQUEST"
          )}
        </button>
      </div>

      <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-gray-400">
        <Lock className="w-3.5 h-3.5" />
        No payment required. Just real availability.
      </div>
    </div>
  );
}
