import React from 'react';
import { CheckCircle } from 'lucide-react';

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  getStepIcon: (step: number) => string;
}

export const StepProgress = ({ currentStep, totalSteps, getStepIcon }: StepProgressProps) => {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4 overflow-x-auto">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div
            key={step}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 flex-shrink-0 ${
              step <= currentStep
                ? 'bg-[#c65d21] text-white shadow-lg'
                : 'bg-gray-700 text-gray-400'
            }`}
          >
            {step < currentStep ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <span className="text-sm">{getStepIcon(step) || step}</span>
            )}
          </div>
        ))}
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-[#c65d21] to-[#e67e22] h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
      <div className="text-center mt-2 text-sm text-gray-400">
        Step {currentStep} of {totalSteps}
      </div>
    </div>
  );
};
