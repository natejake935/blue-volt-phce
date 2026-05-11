"use client";

import { useEffect, useRef } from "react";

const pins = [
  { lat: 32.7157, lng: -117.1611, label: "Downtown SD" },
  { lat: 32.7512, lng: -117.1353, label: "North Park" },
  { lat: 32.8328, lng: -117.2713, label: "La Jolla" },
  { lat: 32.9157, lng: -117.1500, label: "Mira Mesa" },
  { lat: 32.9624, lng: -117.0382, label: "Poway" },
  { lat: 32.9592, lng: -117.2653, label: "Carmel Valley" },
  { lat: 32.9954, lng: -117.1927, label: "Scripps Ranch" },
  { lat: 32.7826, lng: -117.1351, label: "Mission Valley" },
  { lat: 32.7958, lng: -116.9625, label: "El Cajon" },
  { lat: 32.6784, lng: -117.0842, label: "Chula Vista" },
  { lat: 32.5530, lng: -117.0630, label: "San Ysidro" },
  { lat: 32.6780, lng: -117.1000, label: "National City" },
  { lat: 32.8404, lng: -116.9739, label: "Santee" },
  { lat: 32.7490, lng: -117.2294, label: "Ocean Beach" },
  { lat: 32.8562, lng: -117.2158, label: "UTC" },
  { lat: 33.1581, lng: -117.3506, label: "Carlsbad" },
  { lat: 33.0369, lng: -117.2920, label: "Encinitas" },
  { lat: 33.1959, lng: -117.3795, label: "Oceanside" },
  { lat: 33.3728, lng: -117.2514, label: "Fallbrook" },
  { lat: 32.7272, lng: -117.1547, label: "Barrio Logan" },
  { lat: 32.8157, lng: -116.9314, label: "Lakeside" },
  { lat: 32.7449, lng: -116.9927, label: "Spring Valley" },
  { lat: 32.7726, lng: -117.0727, label: "Lemon Grove" },
  { lat: 32.9360, lng: -117.2290, label: "Rancho Bernardo" },
];

export default function ServiceAreaMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current || !mapRef.current) return;
    initializedRef.current = true;

    // Load Leaflet CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    // Load Leaflet JS then init map
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = () => {
      const L = (window as any).L;
      const map = L.map(mapRef.current, {
        center: [32.96, -117.14],
        zoom: 9,
        zoomControl: false,
        scrollWheelZoom: false,
        dragging: false,
        doubleClickZoom: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
      }).addTo(map);

      const redIcon = L.divIcon({
        className: "",
        html: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="28" viewBox="0 0 20 28">
          <path d="M10 0C4.477 0 0 4.477 0 10c0 7 10 18 10 18S20 17 20 10C20 4.477 15.523 0 10 0z" fill="#ef4444"/>
          <circle cx="10" cy="10" r="4" fill="white"/>
        </svg>`,
        iconSize: [20, 28],
        iconAnchor: [10, 28],
      });

      pins.forEach((pin) => {
        L.marker([pin.lat, pin.lng], { icon: redIcon })
          .addTo(map)
          .bindTooltip(pin.label, { permanent: false, direction: "top" });
      });
    };
    document.head.appendChild(script);
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
}
