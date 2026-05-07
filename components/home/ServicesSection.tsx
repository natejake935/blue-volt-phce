"use client";

import { useRef, useEffect, useState } from "react";
import { Zap, LayoutGrid, Car, Lightbulb, ToggleLeft, Home, AlertTriangle, ChevronLeft, ChevronRight, GitBranch, RefreshCw, Lamp, Server } from "lucide-react";
import ServiceCard from "../ServiceCard";
import ServiceModal, { ServiceInfo } from "../ServiceModal";

const BASE = "https://images.unsplash.com";

const services: ServiceInfo[] = [
  {
    icon: Zap,
    label: "Power Issues",
    photo: `${BASE}/photo-1576446468729-7674e99608f5?w=600&h=300&fit=crop&auto=format&q=80`,
    description: "Flickering lights, dead outlets, tripping breakers — we diagnose and fix electrical power problems fast. Our techs carry parts on the truck so most repairs are completed same day.",
    bullets: ["Circuit tracing & fault isolation", "Breaker replacement & panel inspection", "GFCI & AFCI upgrades", "Same-day diagnosis guaranteed"],
  },
  {
    icon: LayoutGrid,
    label: "Panel Upgrades",
    photo: `${BASE}/photo-1566417110090-6b15a06ec800?w=600&h=300&fit=crop&auto=format&q=80`,
    description: "Older panels can't keep up with modern electrical loads. We upgrade your main breaker panel safely, pull all required permits, and coordinate inspections from start to finish.",
    bullets: ["100A → 200A & 400A upgrades", "Permit-pulled & inspected", "Whole-home load calculation", "Federal Pacific & Zinsco replacements"],
  },
  {
    icon: Car,
    label: "EV Charger Installation",
    photo: `${BASE}/photo-1704474618942-ae933a8edd86?w=600&h=300&fit=crop&auto=format&q=80`,
    description: "Charge your electric vehicle overnight without hassle. We install Level 2 EVSE chargers in garages and driveways, handle the permit, and make sure your panel can handle the load.",
    bullets: ["Level 2 (240V) charger installation", "All major brands supported", "Indoor & outdoor conduit installation", "Load check & circuit run"],
  },
  {
    icon: Lightbulb,
    label: "Lighting Installation",
    photo: `${BASE}/photo-1605419589330-0b6dede4c265?w=600&h=300&fit=crop&auto=format&q=80`,
    description: "From pendant lights to outdoor security fixtures, we handle all types of lighting installs. Clean wiring, no mess left behind, and everything on a switch or dimmer if you want.",
    bullets: ["Indoor & outdoor fixtures", "Dimmer & smart switch wiring", "Under-cabinet & accent lighting", "Ceiling fan installation"],
  },
  {
    icon: ToggleLeft,
    label: "Outlet & Switch Repairs",
    photo: `${BASE}/photo-1751486289945-989724789188?w=600&h=300&fit=crop&auto=format&q=80`,
    description: "Dead outlets and broken switches are more than an inconvenience — they can be a safety hazard. We replace, repair, and upgrade outlets and switches quickly and cleanly.",
    bullets: ["GFCI & AFCI outlet installation", "USB & smart outlet upgrades", "Switch replacement & 3-way wiring", "Tamper-resistant outlets for families"],
  },
  {
    icon: Home,
    label: "Whole Home Electrical",
    photo: `${BASE}/photo-1672508013582-035e75fb76ec?w=600&h=300&fit=crop&auto=format&q=80`,
    description: "New construction, major remodel, or full home rewire — we handle the entire electrical scope. One crew, one point of contact, from rough-in to final inspection.",
    bullets: ["New construction wiring", "Addition & remodel rough-in", "Full home rewires", "Dedicated circuit additions"],
  },
  {
    icon: AlertTriangle,
    label: "Emergency Service",
    photo: `${BASE}/photo-1621905251189-08b45d6a269e?w=600&h=300&fit=crop&auto=format&q=80`,
    description: "Electrical emergencies don't wait for business hours. Blue Bolt is available 24/7 for urgent issues including burning smells, sparking outlets, and total power loss.",
    bullets: ["24/7 emergency response", "Burning smell & spark diagnosis", "Emergency panel shutoff", "Typical 2-hour response time"],
  },
  {
    icon: GitBranch,
    label: "Circuit Extensions",
    photo: `${BASE}/photo-1576446468729-7674e99608f5?w=600&h=300&fit=crop&auto=format&q=80`,
    description: "Need power somewhere new? We extend existing circuits or run dedicated new ones — for home offices, workshop equipment, hot tubs, or wherever you need it.",
    bullets: ["Dedicated 20A & 30A circuits", "Workshop & garage power runs", "Hot tub & spa wiring", "Home office circuit additions"],
  },
  {
    icon: RefreshCw,
    label: "Old Home\nRewire",
    photo: `${BASE}/photo-1444419988131-046ed4e5ffd6?w=600&h=300&fit=crop&auto=format&q=80`,
    description: "Knob-and-tube and aluminum wiring are fire hazards. We rewire older San Diego homes to modern code, preserving your finishes as much as possible while keeping your family safe.",
    bullets: ["Knob-and-tube removal", "Aluminum wiring remediation", "Code-compliant throughout", "Insurance-ready documentation"],
  },
  {
    icon: Lamp,
    label: "Recessed Lighting",
    photo: `${BASE}/photo-1605419589330-0b6dede4c265?w=600&h=300&fit=crop&auto=format&q=80`,
    description: "Clean, modern recessed lighting transforms a room. We plan the layout, cut the holes, run the wire, and leave you with a polished result — no patching required with our low-voltage cans.",
    bullets: ["LED recessed can installation", "Dimmer-compatible wiring", "New & existing construction", "Layout planning included"],
  },
  {
    icon: Server,
    label: "Sub-Panel Replacement",
    photo: `${BASE}/photo-1757146578941-37e7acc595a1?w=600&h=300&fit=crop&auto=format&q=80`,
    description: "Garages, workshops, and ADUs often need their own sub-panel. We size, install, and inspect sub-panels so you have reliable power exactly where you need it.",
    bullets: ["60A–200A sub-panel installation", "Garage & ADU specialty", "Feeder wire upgrade if needed", "Zinsco & Federal Pacific replacements"],
  },
];

const ITEM_W = 160;
const GAP = 16;
const ITEM_STRIDE = ITEM_W + GAP;

const track = [...services, ...services, ...services];

export default function ServicesSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const segmentWidth = ITEM_STRIDE * services.length;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex !== null ? services[activeIndex] : null;

  const scrollCarousel = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -ITEM_STRIDE : ITEM_STRIDE, behavior: "smooth" });
  };

  const openModal = (index: number) => setActiveIndex(index);
  const closeModal = () => setActiveIndex(null);
  const prevModal = () => {
    scrollCarousel("left");
    setActiveIndex((i) => i !== null ? (i - 1 + services.length) % services.length : 0);
  };
  const nextModal = () => {
    scrollCarousel("right");
    setActiveIndex((i) => i !== null ? (i + 1) % services.length : 0);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollLeft = segmentWidth;
  }, [segmentWidth]);

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    if (el.scrollLeft < segmentWidth * 0.5) {
      el.scrollLeft += segmentWidth;
    } else if (el.scrollLeft > segmentWidth * 1.5) {
      el.scrollLeft -= segmentWidth;
    }
  };

  const scroll = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -ITEM_STRIDE : ITEM_STRIDE, behavior: "smooth" });
  };

  return (
    <>
      <section className="pt-16 pb-10 bg-white" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">ELECTRICAL SERVICES WE HANDLE</h2>
          <p className="section-subtitle">From small repairs to whole-home wiring — we do it all.</p>
        </div>

        <div
          className="mt-6 relative pt-1 pb-3"
          style={{
            background:
              "linear-gradient(to bottom, #ffffff 0%, #f9fafb 4px, #f9fafb calc(100% - 12px), #ffffff 100%)",
          }}
        >
          <button
            onClick={() => scroll("left")}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-brand-blue hover:border-brand-blue transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-brand-blue hover:border-brand-blue transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="overflow-hidden">
            <div
              ref={trackRef}
              onScroll={handleScroll}
              className="flex gap-4 overflow-x-scroll px-16"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
            >
              {track.map((service, i) => (
                <div key={i} className="w-40 flex-shrink-0">
                  <ServiceCard
                    icon={service.icon}
                    label={service.label}
                    onClick={() => openModal(i % services.length)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          Tap any service to see details & book
        </p>
      </section>

      {active && <ServiceModal service={active} onClose={closeModal} onPrev={prevModal} onNext={nextModal} />}
    </>
  );
}
