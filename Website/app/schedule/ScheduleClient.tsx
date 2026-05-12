"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Phone, Zap } from "lucide-react";
import BookingCard from "@/components/BookingCard";
import ProgressIndicator from "@/components/booking/ProgressIndicator";
import ZipStep from "@/components/booking/ZipStep";
import WindowStep from "@/components/booking/WindowStep";
import InfoStep, { CustomerInfo } from "@/components/booking/InfoStep";
import ReviewStep from "@/components/booking/ReviewStep";
import ConfirmationStep from "@/components/booking/ConfirmationStep";
import Logo from "@/components/Logo";

// Backend hook: map ZIP to neighborhood name
const zipToNeighborhood = (zip: string): string => {
  const map: Record<string, string> = {
    "92103": "Hillcrest / North Park",
    "92130": "Carmel Valley",
    "92037": "La Jolla",
    "92131": "Scripps Ranch",
    "92009": "Carlsbad",
    "92064": "Poway",
    "92139": "Skyline / Encanto",
    "91910": "Chula Vista",
    "92113": "Barrio Logan",
    "92110": "Mission Hills / Linda Vista",
  };
  return map[zip] || "San Diego Area";
};

type Step = "zip" | "window" | "info" | "review" | "confirmation";

const stepNumbers: Record<Step, number> = {
  zip: 1,
  window: 2,
  info: 3,
  review: 4,
  confirmation: 5,
};

export default function ScheduleClient() {
  const searchParams = useSearchParams();
  const initialZip = searchParams.get("zip") || "";
  const initialWindow = searchParams.get("window") || "";

  const startStep: Step = initialWindow ? "info" : initialZip ? "window" : "zip";

  const [step, setStep] = useState<Step>(startStep);
  const [zip, setZip] = useState(initialZip);
  const [selectedWindow, setSelectedWindow] = useState(initialWindow);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialWindow) {
      setZip(initialZip);
      setSelectedWindow(initialWindow);
      setStep("info");
    } else if (initialZip) {
      setZip(initialZip);
      setStep("window");
    }
  }, [initialZip, initialWindow]);

  const isConfirmation = step === "confirmation";
  const currentStepNum = stepNumbers[step];

  const handleZipNext = (z: string) => {
    setZip(z);
    setStep("window");
  };

  const handleWindowNext = (w: string) => {
    setSelectedWindow(w);
    setStep("info");
  };

  const handleInfoNext = (info: CustomerInfo) => {
    setCustomerInfo(info);
    setStep("review");
  };

  const handleSubmit = async () => {
    if (!customerInfo) return;
    setIsSubmitting(true);
    try {
      await fetch("https://blue-volt-backend-api.vercel.app/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: customerInfo.fullName,
          phone: customerInfo.phone,
          email: customerInfo.email,
          address: `${customerInfo.address}${customerInfo.aptSuite ? ` ${customerInfo.aptSuite}` : ""}, ${zip}`,
          service: customerInfo.issue,
          date: selectedWindow,
          time: selectedWindow,
          message: `Neighborhood: ${zipToNeighborhood(zip)}`,
        }),
      });
    } catch {
      // Non-blocking — advance to confirmation even if notification fails
    } finally {
      setIsSubmitting(false);
      setStep("confirmation");
    }
  };

  return (
    <div className="min-h-screen bg-brand-gray flex flex-col">
      {/* Minimal booking header */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Logo />
          <a
            href="tel:6195550198"
            className="flex items-center gap-2 text-brand-navy text-sm font-semibold hover:text-brand-blue transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">Need help? Call </span>
            <span className="text-brand-blue">(619) 555-0198</span>
          </a>
        </div>
      </header>

      {/* Page title bar */}
      {!isConfirmation && (
        <div className="bg-brand-navy py-6 text-center">
          <div className="flex items-center justify-center gap-2 text-white font-black text-xl mb-1">
            <Zap className="w-5 h-5 text-brand-yellow fill-brand-yellow" />
            Schedule Now – Booking Flow
          </div>
          <p className="text-blue-300 text-sm">Fast. Easy. Same-Day Electrician Service.</p>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 py-8 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {!isConfirmation && (
            <ProgressIndicator currentStep={currentStepNum} totalSteps={4} />
          )}

          <BookingCard>
            {step === "zip" && (
              <ZipStep initialZip={zip} onNext={handleZipNext} />
            )}
            {step === "window" && (
              <WindowStep
                zip={zip}
                onBack={() => setStep("zip")}
                onNext={handleWindowNext}
              />
            )}
            {step === "info" && (
              <InfoStep
                onBack={() => setStep("window")}
                onNext={handleInfoNext}
              />
            )}
            {step === "review" && customerInfo && (
              <ReviewStep
                zip={zip}
                window={selectedWindow}
                info={customerInfo}
                onBack={() => setStep("info")}
                onSubmit={handleSubmit}
                submitting={isSubmitting}
              />
            )}
            {step === "confirmation" && customerInfo && (
              <ConfirmationStep
                name={customerInfo.fullName}
                window={selectedWindow}
                zip={zip}
                neighborhood={zipToNeighborhood(zip)}
              />
            )}
          </BookingCard>
        </div>
      </main>

      {/* Trust footer bar */}
      {!isConfirmation && (
        <div className="bg-brand-navy py-5 mt-8">
          <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Licensed & Insured", sub: "CA Lic. #1051234" },
              { label: "Background Checked", sub: "Trusted Professionals" },
              { label: "500+ 5-Star Reviews", sub: "From San Diego Customers", stars: true },
              { label: "24/7 Emergency Service", sub: "Call (619) 555-0198" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center text-center gap-1">
                {item.stars && (
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                )}
                <div className="text-white text-xs font-bold">{item.label}</div>
                <div className="text-blue-300 text-xs">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
