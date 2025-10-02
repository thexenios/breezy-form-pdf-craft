import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface FormStepProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const FormStep = ({ id, label, placeholder, value, onChange, error }: FormStepProps) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <Label htmlFor={id} className="text-lg font-medium text-white">{label}</Label>
      <Textarea
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`text-lg min-h-32 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-[#c65d21] focus:ring-[#c65d21] ${error ? 'border-red-500' : ''}`}
        autoFocus
      />
      {error && (
        <p className="text-red-500 text-sm animate-fade-in">{error}</p>
      )}
    </div>
  );
};
