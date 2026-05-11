import { MapPin, CalendarCheck, Truck } from "lucide-react";

const steps = [
  { number: "1", icon: MapPin,        title: "Check Availability", description: "Enter your ZIP to see real-time openings." },
  { number: "2", icon: CalendarCheck, title: "Choose Your Window",  description: "Pick a 2-hour arrival window." },
  { number: "3", icon: Truck,         title: "We Arrive On Time",   description: "Your electrician shows up ready to work." },
];

export default function HowItWorks() {
  return (
    <section className="bg-brand-gray border-b border-gray-200" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">

          {/* Label */}
          <span className="text-sm font-bold text-gray-400 uppercase tracking-widest flex-shrink-0">
            How it works
          </span>

          {/* Steps */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 w-full sm:w-auto">
            {steps.map((step, i) => (
              <div key={step.number} className="flex items-center gap-5">
                <div className="flex items-center gap-5 sm:gap-3 flex-1">
                  <div className="relative flex-shrink-0">
                    <div className="w-11 h-11 bg-white rounded-xl shadow-sm border border-blue-100 flex items-center justify-center">
                      <step.icon className="w-5 h-5 text-brand-blue" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-brand-blue text-white rounded-full flex items-center justify-center text-[10px] font-black">
                      {step.number}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-brand-navy">{step.title}</div>
                    <div className="text-xs text-gray-500 leading-snug mt-0.5">{step.description}</div>
                  </div>
                </div>

                {i < steps.length - 1 && (
                  <span className="hidden sm:block text-gray-300 text-xl">→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
