import { CheckCircle } from "lucide-react";
import TeamCard from "../TeamCard";

const teamRow1 = [
  { name: "Chris M.", role: "Master Electrician", experience: "10+ Years Experience", image: "/team/team_chris.png" },
  { name: "Mike R.", role: "Master Electrician", experience: "12+ Years Experience", image: "/team/team_mike.png" },
  { name: "David S.", role: "Journeyman Electrician", experience: "8+ Years Experience", image: "/team/team_david.png" },
  { name: "Tyler K.", role: "Apprentice Electrician", experience: "6+ Years Experience", image: "/team/team_tyler.png" },
];

const teamRow2 = [
  { name: "Carlos V.", role: "Journeyman Electrician", experience: "8+ Years Experience", image: "/team/team_carlos.png" },
  { name: "Brandon L.", role: "Master Electrician", experience: "15+ Years Experience", image: "/team/team_brandon.png" },
  { name: "Austin P.", role: "Journeyman Electrician", experience: "7+ Years Experience", image: "/team/team_austin.png" },
  { name: "Jacob T.", role: "Apprentice Electrician", experience: "6+ Years Experience", image: "/team/team_jacob.png" },
];

const trustPoints = [
  "Background Checked",
  "Drug Tested",
  "Highly Trained",
  "Safety Focused",
];

export default function TeamSection() {
  return (
    <section className="py-16 bg-brand-gray" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">MEET OUR TEAM</h2>
        <p className="section-subtitle">Local electricians you can trust.</p>

        <div className="mt-10 grid lg:grid-cols-5 gap-8 items-start">
          {/* Team grid */}
          <div className="lg:col-span-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {teamRow1.map((member) => (
                <TeamCard key={member.name} {...member} />
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {teamRow2.map((member) => (
                <TeamCard key={member.name} {...member} />
              ))}
            </div>
          </div>

          {/* Side trust card */}
          <div className="lg:col-span-1 bg-brand-navy text-white rounded-2xl p-6 shadow-xl">
            <div className="w-12 h-12 bg-brand-blue/20 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg text-white">Local. Reliable. Professional.</h3>
            <p className="text-blue-200 text-sm mt-2 leading-relaxed">
              We live and work in San Diego and take pride in every job we complete.
            </p>
            <ul className="mt-5 space-y-2.5">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-center gap-2 text-sm text-blue-100">
                  <CheckCircle className="w-4 h-4 text-brand-yellow flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
