import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, FileText, MessageSquare, Target, Heart, User, Lightbulb, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import jsPDF from 'jspdf';

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

interface MultiStepFormProps {
  onBackToLanding: () => void;
}

const MultiStepForm = ({ onBackToLanding }: MultiStepFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    vision: '',
    mission: '',
    why: '',
    values: '',
    valuesInAction: '',
    antiValues: '',
    voice: '',
    phraseSound: '',
    antiVoice: ''
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const totalSteps = 10;

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {};
    
    switch (step) {
      case 1:
        if (!formData.vision.trim()) {
          newErrors.vision = 'Please define your vision';
        }
        break;
      case 2:
        if (!formData.mission.trim()) {
          newErrors.mission = 'Please define your mission';
        }
        break;
      case 3:
        if (!formData.why.trim()) {
          newErrors.why = 'Please share your why';
        }
        break;
      case 4:
        if (!formData.values.trim()) {
          newErrors.values = 'Please list your core values';
        }
        break;
      case 5:
        if (!formData.valuesInAction.trim()) {
          newErrors.valuesInAction = 'Please describe your values in action';
        }
        break;
      case 6:
        if (!formData.antiValues.trim()) {
          newErrors.antiValues = 'Please list your anti-values';
        }
        break;
      case 7:
        if (!formData.voice.trim()) {
          newErrors.voice = 'Please describe your voice';
        }
        break;
      case 8:
        if (!formData.phraseSound.trim()) {
          newErrors.phraseSound = 'Please share a phrase that sounds like you';
        }
        break;
      case 9:
        if (!formData.antiVoice.trim()) {
          newErrors.antiVoice = 'Please describe your anti-voice';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(24);
    doc.setTextColor(198, 93, 33);
    doc.text('Your Personal Communication Guide', 20, 30);
    
    // Add current date
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Created on: ${new Date().toLocaleDateString()}`, 20, 45);
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    
    let yPosition = 70;
    
    const addSection = (title: string, content: string) => {
      // Check if we need a new page
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 30;
      }
      
      doc.setFont(undefined, 'bold');
      doc.text(title, 20, yPosition);
      doc.setFont(undefined, 'normal');
      const splitText = doc.splitTextToSize(content, 170);
      doc.text(splitText, 20, yPosition + 10);
      yPosition += splitText.length * 5 + 20;
    };
    
    addSection('Your Vision:', formData.vision);
    addSection('Your Mission:', formData.mission);
    addSection('Your Why:', formData.why);
    addSection('Your Core Values:', formData.values);
    addSection('Your Values in Action:', formData.valuesInAction);
    addSection('Your Anti-Values:', formData.antiValues);
    addSection('Your Voice:', formData.voice);
    addSection('A Phrase That Sounds Like You:', formData.phraseSound);
    addSection('Your Anti-Voice:', formData.antiVoice);
    
    // Save the PDF
    doc.save('personal_communication_guide.pdf');
  };

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1: return '🎯';
      case 2: return '🚀';
      case 3: return '💫';
      case 4: return '❤️';
      case 5: return '⚡';
      case 6: return '🚫';
      case 7: return '🗣️';
      case 8: return '💬';
      case 9: return '🙅';
      case 10: return <CheckCircle className="w-5 h-5" />;
      default: return null;
    }
  };

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1: return "What's your vision?";
      case 2: return "What's your mission?";
      case 3: return "What's your why?";
      case 4: return "What are your core values?";
      case 5: return "How do your values look in action?";
      case 6: return "What are your anti-values?";
      case 7: return "How should your voice feel?";
      case 8: return "What's a phrase that sounds like you?";
      case 9: return "What tone doesn't fit you?";
      case 10: return "Your Personal Communication Guide";
      default: return "";
    }
  };

  const getStepDescription = (step: number) => {
    switch (step) {
      case 1: return "What's the change you want to see in the world? Paint a picture of the future you're working toward";
      case 2: return "What actions do you take (or plan to take) every day to bring that vision closer?";
      case 3: return "Why does this matter to you on a deeper, personal level? What drives this work?";
      case 4: return "List 3-5 values that feel non-negotiable in how you live or work";
      case 5: return "Choose one value and describe how you live it. What does it look or sound like?";
      case 6: return "What do you not want to be known for, even if it's trendy or expected? (These oppose your listed values)";
      case 7: return "Pick 2-3 traits that describe how your words should come across (warm, clear, curious, grounded, playful, bold, direct, etc.)";
      case 8: return "Drop in a sentence or saying that feels natural and true to your voice";
      case 9: return "Any language, energy, or communication habits that don't reflect who you are?";
      case 10: return "Review your responses and download your personalized communication guide";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back to landing button */}
        <div className="mb-8">
          <Button
            onClick={onBackToLanding}
            variant="outline"
            className="bg-[#1a1a1a] border-gray-800 text-[#c65d21] hover:bg-[#c65d21] hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4 overflow-x-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((step) => (
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
                  <span className="text-sm">{typeof getStepIcon(step) === 'string' ? getStepIcon(step) : step}</span>
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

        {/* Form Card */}
        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {getStepTitle(currentStep)}
            </h1>
            <p className="text-gray-300">
              {getStepDescription(currentStep)}
            </p>
          </div>

          {/* Step Content */}
          <div className="min-h-[200px] flex flex-col justify-center">
            {/* Step 1: Vision */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-fade-in">
                <Label htmlFor="vision" className="text-lg font-medium text-white">Your Vision</Label>
                <Textarea
                  id="vision"
                  placeholder="What's the change you want to see in the world? Paint a picture of the future you're working toward. This is your north star."
                  value={formData.vision}
                  onChange={(e) => updateFormData('vision', e.target.value)}
                  className={`text-lg min-h-32 bg-gray-700 border-gray-600 text-white placeholder-gray-400 ${errors.vision ? 'border-red-500' : ''}`}
                  autoFocus
                />
                {errors.vision && (
                  <p className="text-red-500 text-sm animate-fade-in">{errors.vision}</p>
                )}
              </div>
            )}

            {/* Step 2: Mission */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-fade-in">
                <Label htmlFor="mission" className="text-lg font-medium text-white">Your Mission</Label>
                <Textarea
                  id="mission"
                  placeholder="What actions do you take (or plan to take) every day to bring that vision closer? These are the concrete steps and behaviors that move you forward."
                  value={formData.mission}
                  onChange={(e) => updateFormData('mission', e.target.value)}
                  className={`text-lg min-h-32 bg-gray-700 border-gray-600 text-white placeholder-gray-400 ${errors.mission ? 'border-red-500' : ''}`}
                  autoFocus
                />
                {errors.mission && (
                  <p className="text-red-500 text-sm animate-fade-in">{errors.mission}</p>
                )}
              </div>
            )}

            {/* Step 3: Why */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-fade-in">
                <Label htmlFor="why" className="text-lg font-medium text-white">Your Why</Label>
                <Textarea
                  id="why"
                  placeholder="Why does this matter to you on a deeper, personal level? What experience, belief, or conviction drives this work? This is your reason for existing."
                  value={formData.why}
                  onChange={(e) => updateFormData('why', e.target.value)}
                  className={`text-lg min-h-32 bg-gray-700 border-gray-600 text-white placeholder-gray-400 ${errors.why ? 'border-red-500' : ''}`}
                  autoFocus
                />
                {errors.why && (
                  <p className="text-red-500 text-sm animate-fade-in">{errors.why}</p>
                )}
              </div>
            )}

            {/* Step 4: Values */}
            {currentStep === 4 && (
              <div className="space-y-4 animate-fade-in">
                <Label htmlFor="values" className="text-lg font-medium text-white">Your Core Values</Label>
                <Textarea
                  id="values"
                  placeholder="List 3-5 values that feel non-negotiable in how you live or work. What principles guide your decisions and actions?"
                  value={formData.values}
                  onChange={(e) => updateFormData('values', e.target.value)}
                  className={`text-lg min-h-32 bg-gray-700 border-gray-600 text-white placeholder-gray-400 ${errors.values ? 'border-red-500' : ''}`}
                  autoFocus
                />
                {errors.values && (
                  <p className="text-red-500 text-sm animate-fade-in">{errors.values}</p>
                )}
              </div>
            )}

            {/* Step 5: Values in Action */}
            {currentStep === 5 && (
              <div className="space-y-4 animate-fade-in">
                <Label htmlFor="valuesInAction" className="text-lg font-medium text-white">Your Values in Action</Label>
                <Textarea
                  id="valuesInAction"
                  placeholder="Choose one value and describe how you live it. What does it look or sound like in practice? Give specific examples of how this value shows up in your work or life."
                  value={formData.valuesInAction}
                  onChange={(e) => updateFormData('valuesInAction', e.target.value)}
                  className={`text-lg min-h-32 bg-gray-700 border-gray-600 text-white placeholder-gray-400 ${errors.valuesInAction ? 'border-red-500' : ''}`}
                  autoFocus
                />
                {errors.valuesInAction && (
                  <p className="text-red-500 text-sm animate-fade-in">{errors.valuesInAction}</p>
                )}
              </div>
            )}

            {/* Step 6: Anti-Values */}
            {currentStep === 6 && (
              <div className="space-y-4 animate-fade-in">
                <Label htmlFor="antiValues" className="text-lg font-medium text-white">Your Anti-Values</Label>
                <Textarea
                  id="antiValues"
                  placeholder="What do you not want to be known for, even if it's trendy or expected? These are not always bad, just things that oppose your listed values and don't align with who you are."
                  value={formData.antiValues}
                  onChange={(e) => updateFormData('antiValues', e.target.value)}
                  className={`text-lg min-h-32 bg-gray-700 border-gray-600 text-white placeholder-gray-400 ${errors.antiValues ? 'border-red-500' : ''}`}
                  autoFocus
                />
                {errors.antiValues && (
                  <p className="text-red-500 text-sm animate-fade-in">{errors.antiValues}</p>
                )}
              </div>
            )}

            {/* Step 7: Voice */}
            {currentStep === 7 && (
              <div className="space-y-4 animate-fade-in">
                <Label htmlFor="voice" className="text-lg font-medium text-white">Your Voice</Label>
                <Textarea
                  id="voice"
                  placeholder="How should your voice feel? Pick 2-3 traits that describe how your words should come across (warm, clear, curious, grounded, playful, bold, direct, etc.)."
                  value={formData.voice}
                  onChange={(e) => updateFormData('voice', e.target.value)}
                  className={`text-lg min-h-32 bg-gray-700 border-gray-600 text-white placeholder-gray-400 ${errors.voice ? 'border-red-500' : ''}`}
                  autoFocus
                />
                {errors.voice && (
                  <p className="text-red-500 text-sm animate-fade-in">{errors.voice}</p>
                )}
              </div>
            )}

            {/* Step 8: Phrase That Sounds Like You */}
            {currentStep === 8 && (
              <div className="space-y-4 animate-fade-in">
                <Label htmlFor="phraseSound" className="text-lg font-medium text-white">A Phrase That Sounds Like You</Label>
                <Textarea
                  id="phraseSound"
                  placeholder="Drop in a sentence or saying that feels natural and true to your voice. What do you find yourself saying often? What phrases come naturally to you?"
                  value={formData.phraseSound}
                  onChange={(e) => updateFormData('phraseSound', e.target.value)}
                  className={`text-lg min-h-32 bg-gray-700 border-gray-600 text-white placeholder-gray-400 ${errors.phraseSound ? 'border-red-500' : ''}`}
                  autoFocus
                />
                {errors.phraseSound && (
                  <p className="text-red-500 text-sm animate-fade-in">{errors.phraseSound}</p>
                )}
              </div>
            )}

            {/* Step 9: Anti-Voice */}
            {currentStep === 9 && (
              <div className="space-y-4 animate-fade-in">
                <Label htmlFor="antiVoice" className="text-lg font-medium text-white">Your Anti-Voice</Label>
                <Textarea
                  id="antiVoice"
                  placeholder="Any language, energy, or communication habits that don't reflect who you are? What tone or style doesn't fit you? (These aren't necessarily bad traits, just not you)"
                  value={formData.antiVoice}
                  onChange={(e) => updateFormData('antiVoice', e.target.value)}
                  className={`text-lg min-h-32 bg-gray-700 border-gray-600 text-white placeholder-gray-400 ${errors.antiVoice ? 'border-red-500' : ''}`}
                  autoFocus
                />
                {errors.antiVoice && (
                  <p className="text-red-500 text-sm animate-fade-in">{errors.antiVoice}</p>
                )}
              </div>
            )}

            {/* Step 10: Review */}
            {currentStep === 10 && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-gray-700 rounded-lg p-6 space-y-6 max-h-96 overflow-y-auto">
                  <h3 className="font-semibold text-lg text-white">Your Communication Guide:</h3>
                  
                  <div>
                    <p className="font-medium text-gray-300">Your Vision:</p>
                    <p className="text-gray-400 text-sm">{formData.vision.substring(0, 150)}...</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-300">Your Mission:</p>
                    <p className="text-gray-400 text-sm">{formData.mission.substring(0, 150)}...</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-300">Your Why:</p>
                    <p className="text-gray-400 text-sm">{formData.why.substring(0, 150)}...</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-300">Your Values:</p>
                    <p className="text-gray-400 text-sm">{formData.values.substring(0, 150)}...</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-300">Your Values in Action:</p>
                    <p className="text-gray-400 text-sm">{formData.valuesInAction.substring(0, 150)}...</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-300">Your Anti-Values:</p>
                    <p className="text-gray-400 text-sm">{formData.antiValues.substring(0, 150)}...</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-300">Your Voice:</p>
                    <p className="text-gray-400 text-sm">{formData.voice.substring(0, 150)}...</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-300">A Phrase That Sounds Like You:</p>
                    <p className="text-gray-400 text-sm">{formData.phraseSound.substring(0, 150)}...</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-300">Your Anti-Voice:</p>
                    <p className="text-gray-400 text-sm">{formData.antiVoice.substring(0, 150)}...</p>
                  </div>
                </div>
                
                <Button
                  onClick={generatePDF}
                  className="w-full bg-gradient-to-r from-[#c65d21] to-[#e67e22] hover:from-[#a04b18] hover:to-[#c65d21] text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Your Communication Guide
                </Button>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          {currentStep < 10 && (
            <div className="flex justify-between mt-8">
              <Button
                onClick={prevStep}
                disabled={currentStep === 1}
                variant="outline"
                className="px-6 py-3 text-lg disabled:opacity-50 bg-gray-800 border-gray-800 text-[#c65d21] hover:bg-[#c65d21] hover:text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={nextStep}
                className="px-6 py-3 text-lg bg-gradient-to-r from-[#c65d21] to-[#e67e22] hover:from-[#a04b18] hover:to-[#c65d21]"
              >
                Continue
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {currentStep === 10 && (
            <div className="flex justify-center mt-6">
              <Button
                onClick={prevStep}
                variant="outline"
                className="px-6 py-3 text-lg bg-gray-800 border-gray-800 text-[#c65d21] hover:bg-[#c65d21] hover:text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to Edit
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
