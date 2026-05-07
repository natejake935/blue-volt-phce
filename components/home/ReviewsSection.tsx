import { Star, Quote } from "lucide-react";
import Image from "next/image";

const BASE = "https://images.unsplash.com";

const reviews = [
  {
    name: "Marcus T.",
    location: "Chula Vista, CA",
    rating: 5,
    date: "2 weeks ago",
    photo: `${BASE}/photo-1522529599102-193c0d76b5b6?w=80&h=80&fit=crop&crop=face&auto=format`,
    text: "Had a breaker tripping constantly and Blue Bolt was at my door same day. The tech explained everything clearly and fixed the issue in under an hour. Pricing was fair and upfront — no surprises on the invoice.",
  },
  {
    name: "Sandra R.",
    location: "La Mesa, CA",
    rating: 5,
    date: "1 month ago",
    photo: `${BASE}/photo-1593937799405-f5da790f5b04?w=80&h=80&fit=crop&crop=face&auto=format`,
    text: "Got my EV charger installed in the garage. The electrician was on time, clean, and knew exactly what he was doing. Permit pulled same week. Highly recommend for anyone in San Diego.",
  },
  {
    name: "Derek & Amy W.",
    location: "Santee, CA",
    rating: 5,
    date: "3 weeks ago",
    photo: `${BASE}/photo-1663579167845-c73285e3805b?w=80&h=80&fit=crop&crop=faces&auto=format`,
    text: "We had a partial power outage on a Saturday night. Blue Bolt answered immediately and sent someone within 2 hours. Diagnosed a bad main breaker and had it replaced by midnight. Lifesavers.",
  },
  {
    name: "Priya K.",
    location: "El Cajon, CA",
    rating: 5,
    date: "1 month ago",
    photo: `${BASE}/photo-1617297873650-aef8f4e00b9b?w=80&h=80&fit=crop&crop=face&auto=format`,
    text: "Booked online in literally 60 seconds. The whole booking experience was smooth, got a confirmation text right away, and the electrician showed up in the promised window. Professional from start to finish.",
  },
  {
    name: "James O.",
    location: "Spring Valley, CA",
    rating: 5,
    date: "5 days ago",
    photo: `${BASE}/photo-1651684215020-f7a5b6610f23?w=80&h=80&fit=crop&crop=face&auto=format`,
    text: "Panel upgrade for a home addition. Blue Bolt handled the permit, inspection, and install seamlessly. No headaches, great communication throughout. Will use again for phase two of the project.",
  },
  {
    name: "Lisa M.",
    location: "Lemon Grove, CA",
    rating: 5,
    date: "2 months ago",
    photo: `${BASE}/photo-1534751516642-a1af1ef26a56?w=80&h=80&fit=crop&crop=face&auto=format`,
    text: "Called about flickering lights that had been driving me crazy for months. Turned out to be a loose neutral in the panel — something two other electricians missed. These guys found it in 20 minutes.",
  },
];

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(count)].map((_, i) => (
        <Star key={i} className="w-4 h-4 text-brand-yellow fill-brand-yellow" />
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section className="py-16 bg-gray-50" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="section-title">WHAT SAN DIEGO CUSTOMERS SAY</h2>
          <p className="section-subtitle">Real reviews from real homeowners across San Diego County.</p>

          <div className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-6 py-3 mt-6 shadow-sm">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-brand-yellow fill-brand-yellow" />
              ))}
            </div>
            <div className="text-left">
              <div className="font-black text-brand-navy text-lg leading-none">4.9 / 5.0</div>
              <div className="text-xs text-gray-500 mt-0.5">Based on 500+ reviews</div>
            </div>
          </div>
        </div>

        {/* Review grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 flex flex-col gap-4"
            >
              <Quote className="w-6 h-6 text-brand-blue/30 flex-shrink-0" />

              <p className="text-sm text-gray-700 leading-relaxed flex-1">"{review.text}"</p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
                    <Image
                      src={review.photo}
                      alt={review.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-brand-navy text-sm">{review.name}</div>
                    <div className="text-xs text-gray-400">{review.location}</div>
                  </div>
                </div>
                <div className="text-right">
                  <StarRow count={review.rating} />
                  <div className="text-xs text-gray-400 mt-1">{review.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
