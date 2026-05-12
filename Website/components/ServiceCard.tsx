import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
}

export default function ServiceCard({ icon: Icon, label, onClick }: ServiceCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-shadow p-5 flex flex-col items-center justify-between gap-3 text-center cursor-pointer group border border-gray-100 hover:border-brand-blue h-40 w-40"
    >
      <div className="flex items-center justify-center w-14 h-14 bg-blue-50 rounded-xl group-hover:bg-brand-blue transition-colors flex-shrink-0">
        <Icon className="w-7 h-7 text-brand-blue group-hover:text-white transition-colors" strokeWidth={1.75} />
      </div>
      <span className="font-semibold text-sm text-brand-navy leading-snug flex items-center justify-center text-center min-h-10 whitespace-pre-line">
        {label}
      </span>
    </div>
  );
}
