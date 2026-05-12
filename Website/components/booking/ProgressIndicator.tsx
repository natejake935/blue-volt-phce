interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const stepLabels = ["Availability", "Time Window", "Your Info", "Review"];

export default function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        {stepLabels.slice(0, totalSteps).map((label, i) => {
          const stepNum = i + 1;
          const isCompleted = stepNum < currentStep;
          const isActive = stepNum === currentStep;

          return (
            <div key={label} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                  ${isCompleted ? "bg-brand-green text-white" : isActive ? "bg-brand-blue text-white shadow-blue" : "bg-gray-100 text-gray-400"}`}>
                  {isCompleted ? "✓" : stepNum}
                </div>
                <span className={`text-xs mt-1 font-medium hidden sm:block
                  ${isActive ? "text-brand-blue" : isCompleted ? "text-brand-green" : "text-gray-400"}`}>
                  {label}
                </span>
              </div>

              {/* Connector */}
              {i < totalSteps - 1 && (
                <div className={`h-0.5 flex-1 mx-1 transition-all ${stepNum < currentStep ? "bg-brand-green" : "bg-gray-200"}`} />
              )}
            </div>
          );
        })}
      </div>
      <div className="text-xs text-center text-gray-400 mt-1">
        Step {currentStep} of {totalSteps}
      </div>
    </div>
  );
}
