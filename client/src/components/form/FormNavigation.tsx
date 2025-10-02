import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrev: () => void;
  onNext: () => void;
  isFirstStep: boolean;
}

export const FormNavigation = ({ currentStep, totalSteps, onPrev, onNext, isFirstStep }: FormNavigationProps) => {
  if (currentStep === totalSteps) {
    return (
      <div className="flex justify-center mt-6">
        <Button
          onClick={onPrev}
          variant="outline"
          className="px-6 py-3 text-lg bg-gray-800 border-gray-800 text-[#c65d21] hover:bg-[#c65d21] hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Edit
        </Button>
      </div>
    );
  }

  return (
    <div className="flex justify-between mt-8">
      <Button
        onClick={onPrev}
        disabled={isFirstStep}
        variant="outline"
        className="px-6 py-3 text-lg disabled:opacity-50 bg-gray-800 border-gray-800 text-[#c65d21] hover:bg-[#c65d21] hover:text-white transition-colors"
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Back
      </Button>
      <Button
        onClick={onNext}
        className="px-6 py-3 text-lg bg-gradient-to-r from-[#c65d21] to-[#e67e22] hover:from-[#a04b18] hover:to-[#c65d21]"
      >
        Continue
        <ChevronRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};
