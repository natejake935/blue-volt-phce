import { Shield, Users, Star, Clock } from "lucide-react";
import Image from "next/image";

const badgesLeft = [
  { icon: Shield, label: "Licensed & Insured", sublabel: "CA Lic. #1051234" },
  { icon: Users, label: "Background Checked", sublabel: "Trusted Professionals" },
];

const badgesRight = [
  { icon: Star, label: "4.9 Star Rating", sublabel: "From 500+ Customers", stars: true },
  { icon: Clock, label: "On-Time Guarantee", sublabel: "We show up when we say" },
];

function Badge({ icon: Icon, label, sublabel, stars }: { icon: typeof Shield; label: string; sublabel: string; stars?: boolean }) {
  return (
    <div className="flex flex-col items-center text-center gap-2">
      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
        <Icon className="w-7 h-7 text-blue-300" />
      </div>
      <div className="text-white font-semibold text-sm">{label}</div>
      {stars && (
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
          ))}
        </div>
      )}
      <div className="text-blue-300 text-xs">{sublabel}</div>
    </div>
  );
}

export default function TrustBand() {
  return (
    <section className="py-14" id="why-us"
      style={{ background: "linear-gradient(135deg, #061A33 0%, #0B2045 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-8">
          {badgesLeft.map((badge) => <Badge key={badge.label} {...badge} />)}

          {/* BBB — full width centered on mobile, normal col on desktop */}
          <div className="col-span-2 sm:col-span-1 flex flex-col items-center text-center gap-2">
            <div className="w-36 h-16 flex items-center justify-center">
              <Image
                src="/bbb-badge.png"
                alt="BBB A+ Accredited Business"
                width={144}
                height={80}
                className="object-contain w-full"
                style={{ filter: "brightness(0) invert(1) sepia(1) saturate(2) hue-rotate(190deg) brightness(1.1)" }}
              />
            </div>
            <div className="text-white font-semibold text-sm">A+ BBB Rating</div>
            <div className="text-blue-300 text-xs">Accredited Since 2021</div>
          </div>

          {badgesRight.map((badge) => <Badge key={badge.label} {...badge} />)}
        </div>
      </div>
    </section>
  );
}
