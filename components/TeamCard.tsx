import { User } from "lucide-react";
import Image from "next/image";

interface TeamCardProps {
  name: string;
  role: string;
  experience: string;
  image?: string;
}

export default function TeamCard({ name, role, experience, image }: TeamCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-card border border-gray-100 overflow-hidden text-center hover:shadow-card-hover transition-shadow">
      {/* Photo placeholder */}
      <div className="aspect-[4/3] bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center relative overflow-hidden">
        {image ? (
          <Image src={image} alt={name} fill className="object-cover" />
        ) : (
          <div className="w-20 h-20 bg-slate-400/40 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-slate-500" />
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="font-bold text-brand-navy">{name}</div>
        <div className="text-brand-blue text-sm font-medium">{role}</div>
        <div className="text-gray-500 text-xs mt-1">{experience}</div>
      </div>
    </div>
  );
}
