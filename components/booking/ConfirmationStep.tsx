import Link from "next/link";
import { CheckCircle, Phone, Calendar, User, Bell, PhoneCall } from "lucide-react";

interface ConfirmationStepProps {
  name: string;
  window: string;
  zip: string;
  neighborhood: string;
}

const nextSteps = [
  { icon: PhoneCall, label: "Dispatcher confirms your details" },
  { icon: User, label: "Electrician is assigned" },
  { icon: Bell, label: "You receive arrival updates by phone/text" },
];

export default function ConfirmationStep({ name, window, zip, neighborhood }: ConfirmationStepProps) {
  const firstName = name.split(" ")[0];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Success card */}
      <div className="text-center bg-white rounded-2xl shadow-card p-8 border border-gray-100">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-9 h-9 text-brand-green" />
        </div>
        <h2 className="text-3xl font-black text-brand-navy">Request Received!</h2>
        <p className="text-gray-500 mt-1">
          Thanks, <span className="font-bold text-brand-navy">{firstName}</span>. We&apos;re on it.
        </p>

        {/* Selected window */}
        <div className="mt-5 bg-blue-50 rounded-xl px-5 py-4 inline-block text-left">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-brand-blue flex-shrink-0" />
            <div>
              <div className="font-bold text-brand-navy">{window}</div>
              <div className="text-sm text-gray-500">{neighborhood} ({zip})</div>
            </div>
          </div>
        </div>

        {/* Dispatcher note */}
        <div className="mt-5 bg-amber-50 border border-amber-200 rounded-xl p-4 text-left">
          <p className="text-sm text-amber-800 font-medium">
            A Blue Bolt dispatcher will call you shortly to confirm your appointment and assign the closest available electrician.
          </p>
        </div>

        {/* What happens next */}
        <div className="mt-6 text-left">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">What happens next?</div>
          <div className="flex items-start gap-2">
            {nextSteps.map((step, i) => (
              <div key={i} className="flex-1 flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mb-2">
                  <step.icon className="w-5 h-5 text-brand-blue" />
                </div>
                <span className="text-xs text-gray-600 font-medium">{step.label}</span>
                {i < nextSteps.length - 1 && (
                  <div className="hidden sm:block absolute" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dispatcher confirmation panel */}
      <div className="bg-brand-navy text-white rounded-2xl overflow-hidden shadow-xl">
        <div className="grid md:grid-cols-2">
          {/* Left: dispatcher image placeholder */}
          <div className="relative bg-gradient-to-br from-blue-900 to-brand-navy min-h-[180px] flex items-center justify-center p-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <User className="w-10 h-10 text-blue-300" />
              </div>
              <div className="text-white font-semibold text-sm">Blue Bolt Dispatcher</div>
              <div className="text-blue-300 text-xs">Available 24/7</div>
            </div>
          </div>

          {/* Right: info */}
          <div className="p-6">
            <h3 className="font-bold text-xl text-white mb-2">
              We&apos;ll call to confirm your appointment.
            </h3>
            <p className="text-blue-200 text-sm leading-relaxed">
              Our dispatcher will call you shortly at{" "}
              <span className="text-white font-semibold">(619) 555-0198</span> to confirm your appointment and answer any questions you may have.
            </p>

            {/* Emergency card */}
            <div className="mt-4 bg-white/10 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 text-brand-yellow text-xs font-bold mb-1">
                ⚡ Need immediate help?
              </div>
              <p className="text-blue-200 text-xs mb-3">
                Call us now and we&apos;ll get someone to you faster.
              </p>
              <a
                href="tel:6195550198"
                className="flex items-center justify-center gap-2 border-2 border-white/30 text-white font-bold py-2.5 rounded-lg hover:bg-white/10 transition-colors text-sm w-full"
              >
                <Phone className="w-4 h-4" />
                CALL (619) 555-0198
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer link */}
      <div className="text-center">
        <Link href="/" className="text-brand-blue text-sm font-semibold hover:underline">
          ← Back to homepage
        </Link>
      </div>
    </div>
  );
}
