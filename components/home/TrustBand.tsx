import { Shield, Users, Star, Clock } from "lucide-react";

const badges = [
  { icon: Shield, label: "Licensed & Insured", sublabel: "CA Lic. #1051234" },
  { icon: Users, label: "Background Checked", sublabel: "Trusted Professionals" },
  { icon: Star, label: "4.9 Star Rating", sublabel: "From 500+ Customers", stars: true },
  { icon: Clock, label: "On-Time Guarantee", sublabel: "We show up when we say" },
];

export default function TrustBand() {
  return (
    <section className="py-14" id="why-us"
      style={{ background: "linear-gradient(135deg, #061A33 0%, #0B2045 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {badges.map((badge) => (
            <div key={badge.label} className="flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <badge.icon className="w-6 h-6 text-blue-300" />
              </div>
              <div className="text-white font-semibold text-sm">{badge.label}</div>
              {badge.stars && (
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              )}
              <div className="text-blue-300 text-xs">{badge.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
