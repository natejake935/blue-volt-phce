"use client";

import Link from "next/link";
import { Zap, Phone } from "lucide-react";

export default function MobileStickyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-gray-200 shadow-2xl">
      <div className="grid grid-cols-2 gap-0">
        <Link
          href="/schedule"
          className="flex flex-col items-center justify-center gap-1 py-3 bg-brand-blue text-white font-bold text-sm"
        >
          <Zap className="w-5 h-5 fill-white" />
          Schedule Now
        </Link>
        <a
          href="tel:6195550198"
          className="flex flex-col items-center justify-center gap-1 py-3 bg-brand-navy text-white font-bold text-sm"
        >
          <Phone className="w-5 h-5" />
          Call Now
        </a>
      </div>
    </div>
  );
}
