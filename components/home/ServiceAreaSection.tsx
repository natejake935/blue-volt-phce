import { CheckCircle, MapPin, Truck } from "lucide-react";

const cities = [
  "La Jolla", "Chula Vista", "El Cajon", "Carlsbad",
  "Oceanside", "Poway", "National City",
];

export default function ServiceAreaSection() {
  return (
    <section className="py-16 bg-white" id="service-areas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-10 items-start">
          {/* Left text */}
          <div>
            <div className="inline-flex items-center gap-2 text-brand-blue font-bold text-sm uppercase tracking-wide mb-3">
              <MapPin className="w-4 h-4" />
              Service Area
            </div>
            <h2 className="text-3xl font-black text-brand-navy">
              Serving San Diego County
            </h2>
            <p className="text-gray-500 mt-3 text-sm leading-relaxed">
              We're local and ready to help. Check availability in your ZIP code to see our real-time openings.
            </p>

            <ul className="mt-6 grid grid-cols-2 gap-2">
              {cities.map((city) => (
                <li key={city} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-brand-blue flex-shrink-0" />
                  {city}
                </li>
              ))}
              <li className="flex items-center gap-2 text-sm text-gray-400 italic">
                <span className="w-4" />
                ...and more
              </li>
            </ul>
          </div>

          {/* Map — centered to show Mexico border → Fallbrook */}
          <div className="lg:col-span-1 rounded-2xl overflow-hidden shadow-lg border border-gray-200" style={{ height: 320 }}>
            <iframe
              src="https://maps.google.com/maps?ll=32.96,-117.14&t=&z=9&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="San Diego County service area map"
            />
          </div>

          {/* Floating card */}
          <div className="bg-brand-navy text-white rounded-2xl p-6 shadow-xl">
            <div className="w-12 h-12 bg-brand-blue/20 rounded-xl flex items-center justify-center mb-4">
              <Truck className="w-6 h-6 text-brand-blue" />
            </div>
            <h3 className="font-bold text-xl text-white">
              Local Electricians.<br />Fast Response.<br />Real People.
            </h3>
            <p className="text-blue-200 text-sm mt-3 leading-relaxed">
              We live and work in your community.
            </p>
            <div className="mt-5 pt-5 border-t border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="text-sm text-blue-200">
                Covering all of <span className="text-white font-semibold">San Diego County</span> with same-day availability.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
