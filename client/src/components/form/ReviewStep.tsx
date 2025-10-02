import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FormData {
  vision: string;
  mission: string;
  why: string;
  values: string;
  valuesInAction: string;
  antiValues: string;
  voice: string;
  phraseSound: string;
  antiVoice: string;
}

interface ReviewStepProps {
  formData: FormData;
  onGeneratePDF: () => void;
}

export const ReviewStep = ({ formData, onGeneratePDF }: ReviewStepProps) => {
  const sections = [
    { label: 'Your Vision', value: formData.vision },
    { label: 'Your Mission', value: formData.mission },
    { label: 'Your Why', value: formData.why },
    { label: 'Your Values', value: formData.values },
    { label: 'Your Values in Action', value: formData.valuesInAction },
    { label: 'Your Anti-Values', value: formData.antiValues },
    { label: 'Your Voice', value: formData.voice },
    { label: 'A Phrase That Sounds Like You', value: formData.phraseSound },
    { label: 'Your Anti-Voice', value: formData.antiVoice },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gray-700 rounded-lg p-6 space-y-6 max-h-96 overflow-y-auto">
        <h3 className="font-semibold text-lg text-white">Your Communication Guide:</h3>
        
        {sections.map(({ label, value }) => (
          <div key={label}>
            <p className="font-medium text-gray-300">{label}:</p>
            <p className="text-gray-400 text-sm">{value.substring(0, 150)}...</p>
          </div>
        ))}
      </div>
      
      <Button
        onClick={onGeneratePDF}
        className="w-full bg-gradient-to-r from-[#c65d21] to-[#e67e22] hover:from-[#a04b18] hover:to-[#c65d21] text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <Download className="w-5 h-5 mr-2" />
        Download Your Communication Guide
      </Button>
    </div>
  );
};
