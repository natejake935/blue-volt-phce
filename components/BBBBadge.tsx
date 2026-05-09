interface BBBBadgeProps {
  dark?: boolean;
}

export default function BBBBadge({ dark = false }: BBBBadgeProps) {
  return (
    <div className={`inline-flex items-center gap-2 ${dark ? "" : "px-3 py-2 rounded-xl border border-blue-100 bg-white shadow-sm"}`}>
      {/* BBB seal */}
      <div className="flex-shrink-0 w-9 h-9 rounded-md bg-[#003f87] flex flex-col items-center justify-center leading-none">
        <span className="text-white font-black text-[9px] tracking-widest">BBB</span>
        <div className="w-5 h-px bg-white/60 my-0.5" />
        <span className="text-yellow-300 font-black text-[10px]">A+</span>
      </div>
      <div>
        <div className={`text-[11px] font-bold leading-tight ${dark ? "text-white" : "text-gray-800"}`}>Accredited</div>
        <div className={`text-[10px] leading-tight ${dark ? "text-blue-300" : "text-gray-500"}`}>Better Business Bureau</div>
      </div>
    </div>
  );
}
