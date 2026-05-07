import { ReactNode } from "react";

interface BookingCardProps {
  children: ReactNode;
}

export default function BookingCard({ children }: BookingCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 md:p-8">
      {children}
    </div>
  );
}
