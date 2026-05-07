import { LucideIcon } from "lucide-react";

interface TrustBadgeProps {
  icon: LucideIcon;
  label: string;
  sublabel?: string;
  light?: boolean;
}

export default function TrustBadge({ icon: Icon, label, sublabel, light = false }: TrustBadgeProps) {
  return (
    <div className={`flex flex-col items-center gap-2 text-center ${light ? "text-white" : "text-brand-navy"}`}>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${light ? "bg-white/10" : "bg-blue-50"}`}>
        <Icon className={`w-6 h-6 ${light ? "text-blue-300" : "text-brand-blue"}`} />
      </div>
      <div>
        <div className={`font-semibold text-sm ${light ? "text-white" : "text-brand-navy"}`}>{label}</div>
        {sublabel && (
          <div className={`text-xs ${light ? "text-blue-200" : "text-gray-500"}`}>{sublabel}</div>
        )}
      </div>
    </div>
  );
}
