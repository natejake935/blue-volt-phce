import { Suspense } from "react";
import ScheduleClient from "./ScheduleClient";

export const metadata = {
  title: "Schedule Now | Blue Volt Electrical",
  description:
    "Book a same-day electrician in San Diego. Check availability, select a 2-hour window, and get a dispatcher confirmation call.",
};

export default function SchedulePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-brand-gray flex items-center justify-center">
          <div className="text-brand-blue font-semibold animate-pulse">Loading availability...</div>
        </div>
      }
    >
      <ScheduleClient />
    </Suspense>
  );
}
