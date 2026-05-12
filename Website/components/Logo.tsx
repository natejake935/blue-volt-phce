"use client";

import Link from "next/link";
import { Zap } from "lucide-react";

interface LogoProps {
  light?: boolean;
}

export default function Logo({ light = false }: LogoProps) {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="w-9 h-9 bg-brand-blue rounded-lg flex items-center justify-center shadow-blue group-hover:scale-105 transition-transform">
        <Zap className="w-5 h-5 text-white fill-white" />
      </div>
      <div className="leading-tight">
        <div className={`font-black text-base tracking-tight ${light ? "text-white" : "text-brand-navy"}`}>
          BLUE VOLT
        </div>
        <div className={`font-semibold text-xs tracking-widest uppercase ${light ? "text-blue-300" : "text-brand-blue"}`}>
          Plumbing, Heating, Cooling & Electrical
        </div>
      </div>
    </Link>
  );
}
