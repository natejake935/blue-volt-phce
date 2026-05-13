"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, Menu, X, Zap } from "lucide-react";
import Logo from "./Logo";

const navLinks = [
  { label: "Why Choose Us", href: "#why-us" },
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#reviews" },
  { label: "About Us", href: "#about" },
  { label: "Service Areas", href: "#service-areas" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-brand-blue transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop right side */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:8582255957"
              className="flex items-center gap-2 text-brand-navy font-semibold text-sm hover:text-brand-blue transition-colors"
            >
              <Phone className="w-4 h-4" />
              <div>
                <div>(858) 225-5957</div>
                <div className="text-xs font-normal text-gray-500">Call Now 24/7</div>
              </div>
            </a>
            <Link
              href="/schedule"
              className="bg-brand-blue text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm shadow-blue"
            >
              BOOK NOW
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 text-brand-navy"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block text-sm font-medium text-gray-700 hover:text-brand-blue py-2"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-gray-100 space-y-3">
            <a
              href="tel:8582255957"
              className="flex items-center gap-2 text-brand-navy font-semibold text-sm"
            >
              <Phone className="w-4 h-4" />
              (858) 225-5957
            </a>
            <Link
              href="/schedule"
              className="block w-full bg-brand-blue text-white font-semibold px-5 py-3 rounded-lg text-center text-sm"
              onClick={() => setMenuOpen(false)}
            >
              BOOK NOW
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
