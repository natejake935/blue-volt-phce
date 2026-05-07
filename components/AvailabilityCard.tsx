interface AvailabilityCardProps {
  timeRange: string;
  status: "full" | "limited" | "available";
  statusLabel: string;
  onClick?: () => void;
  selected?: boolean;
  compact?: boolean;
}

const statusStyles = {
  full: {
    badge: "text-brand-red",
    border: "border-gray-200",
    bg: "bg-gray-50",
    cursor: "cursor-not-allowed opacity-60",
  },
  limited: {
    badge: "text-brand-orange",
    border: "border-orange-200",
    bg: "bg-orange-50/50",
    cursor: "cursor-pointer hover:border-orange-400",
  },
  available: {
    badge: "text-brand-green",
    border: "border-gray-200",
    bg: "bg-white",
    cursor: "cursor-pointer hover:border-brand-blue",
  },
};

export default function AvailabilityCard({
  timeRange,
  status,
  statusLabel,
  onClick,
  selected = false,
  compact = false,
}: AvailabilityCardProps) {
  const styles = statusStyles[status];

  return (
    <div
      onClick={status !== "full" ? onClick : undefined}
      className={`
        rounded-xl border-2 transition-all duration-150
        ${compact ? "px-4 py-3" : "px-5 py-4"}
        ${styles.bg}
        ${selected ? "border-brand-blue bg-blue-50 shadow-blue/20 shadow-md" : styles.border}
        ${styles.cursor}
        flex items-center justify-between
      `}
    >
      <div className="flex items-center gap-3">
        {onClick && (
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors
            ${selected ? "border-brand-blue bg-brand-blue" : "border-gray-300"}`}>
            {selected && <div className="w-2 h-2 rounded-full bg-white" />}
          </div>
        )}
        <span className={`font-semibold ${compact ? "text-sm" : "text-base"} text-brand-navy`}>
          {timeRange}
        </span>
      </div>
      <span className={`font-bold ${compact ? "text-xs" : "text-sm"} ${styles.badge}`}>
        {statusLabel}
      </span>
    </div>
  );
}
