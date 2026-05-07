import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube, Zap } from "lucide-react";
import Logo from "./Logo";

const serviceLinks = [
  "Panel Upgrades",
  "EV Charger Installation",
  "Lighting Installation",
  "Electrical Repairs",
  "View All Services",
];

const companyLinks = [
  "About Us",
  "Why Choose Us",
  "Reviews",
  "Service Areas",
  "Contact Us",
];

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo light />
            <p className="mt-4 text-sm text-blue-200 leading-relaxed">
              Fast. Reliable. Local.<br />
              Get an electrician at your door today.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-blue transition-colors"
                  aria-label="Social media"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-blue-300 mb-4">Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link}>
                  <a href="#services" className="text-sm text-blue-100 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-blue-300 mb-4">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-blue-100 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-blue-300 mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href="tel:6195550198" className="flex items-start gap-2 text-sm text-blue-100 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  (619) 555-0198
                </a>
              </li>
              <li>
                <a href="mailto:hello@blueboltelectrical.com" className="flex items-start gap-2 text-sm text-blue-100 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  hello@blueboltelectrical.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-blue-100">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                San Diego, CA
              </li>
              <li className="flex items-start gap-2 text-sm text-blue-100">
                <Zap className="w-4 h-4 mt-0.5 flex-shrink-0 text-brand-yellow" />
                24/7 Emergency Service
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-blue-300">
            © 2024 Blue Bolt Electrical. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-blue-300 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-blue-300 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
