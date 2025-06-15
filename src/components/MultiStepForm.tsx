
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, FileText, Heart, MessageSquare, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import jsPDF from 'jspdf';

interface FormData {
  name: string;
  email: string;
  story: string;
  vision: string;
  mission: string;
  why: string;
  values: string;
  voice: string;
}

interface MultiStepFormProps {
  onBackToLanding: () => void;
}

const MultiStepForm = ({ onBackToLanding }: MultiStepFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    story: '',
    vision: '',
    mission: '',
    why: '',
    values: '',
    voice: ''
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const totalSteps = 9;

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {};
    
    switch (step) {
      case 1:
        if (!formData.name.trim()) {
          newErrors.name = 'Name is required';
        }
        break;
      case 2:
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email';
        }
        break;
      case 3:
        if (!formData.story.trim()) {
          newErrors.story = 'Please share your story';
        }
        break;
      case 4:
        if (!formData.vision.trim()) {
          newErrors.vision = 'Please define your vision';
        }
        break;
      case 5:
        if (!formData.mission.trim()) {
          newErrors.mission = 'Please define your mission';
        }
        break;
      case 6:
        if (!formData.why.trim()) {
          newErrors.why = 'Please share your why';
        }
        break;
      case 7:
        if (!formData.values.trim()) {
          newErrors.values = 'Please list your core values';
        }
        break;
      case 8:
        if (!formData.voice.trim()) {
          newErrors.voice = 'Please describe your voice';
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
    
    // Name
    doc.setFont(undefined, 'bold');
    doc.text('Name:', 20, yPosition);
    doc.setFont(undefined, 'normal');
    doc.text(formData.name, 20, yPosition + 10);
    yPosition += 30;
    
    // Email
    doc.setFont(undefined, 'bold');
    doc.text('Email:', 20, yPosition);
    doc.setFont(undefined, 'normal');
    doc.text(formData.email, 20, yPosition + 10);
    yPosition += 30;
    
    // Story
    doc.setFont(undefined, 'bold');
    doc.text('Your Story:', 20, yPosition);
    doc.setFont(undefined, 'normal');
    let splitText = doc.splitTextToSize(formData.story, 170);
    doc.text(splitText, 20, yPosition + 10);
    yPosition += splitText.length * 5 + 20;
    
    // Check if we need a new page
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 30;
    }
    
    // Vision
    doc.setFont(undefined, 'bold');
    doc.text('Your Vision:', 20, yPosition);
    doc.setFont(undefined, 'normal');
    splitText = doc.splitTextToSize(formData.vision, 170);
    doc.text(splitText, 20, yPosition + 10);
    yPosition += splitText.length * 5 + 20;
    
    // Mission
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 30;
    }
    doc.setFont(undefined, 'bold');
    doc.text('Your Mission:', 20, yPosition);
    doc.setFont(undefined, 'normal');
    splitText = doc.splitTextToSize(formData.mission, 170);
    doc.text(splitText, 20, yPosition + 10);
    yPosition += splitText.length * 5 + 20;
    
    // Why
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 30;
    }
    doc.setFont(undefined, 'bold');
    doc.text('Your Why:', 20, yPosition);
    doc.setFont(undefined, 'normal');
    splitText = doc.splitTextToSize(formData.why, 170);
    doc.text(splitText, 20, yPosition + 10);
    yPosition += splitText.length * 5 + 20;
    
    // Values
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 30;
    }
    doc.setFont(undefined, 'bold');
    doc.text('Your Core Values:', 20, yPosition);
    doc.setFont(undefined, 'normal');
    splitText = doc.splitTextToSize(formData.values, 170);
    doc.text(splitText, 20, yPosition + 10);
    yPosition += splitText.length * 5 + 20;
    
    // Voice
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 30;
    }
    doc.setFont(undefined, 'bold');
    doc.text('Your Voice:', 20, yPosition);
    doc.setFont(undefined, 'normal');
    splitText = doc.splitTextToSize(formData.voice, 170);
    doc.text(splitText, 20, yPosition + 10);
    
    // Save the PDF
    doc.save(`${formData.name.replace(/\s+/g, '_')}_communication_guide.pdf`);
  };

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1: return '👋';
      case 2: return '📧';
      case 3: return '📖';
      case 4: return '🎯';
      case 5: return '🚀';
      case 6: return '💫';
      case 7: return '❤️';
      case 8: return '🗣️';
      case 9: return <CheckCircle className="w-5 h-5" />;
      default: return null;
    }
  };

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1: return "What's your name?";
      case 2: return "Where should we send your guide?";
      case 3: return "Tell your story";
      case 4: return "What's your vision?";
      case 5: return "What's your mission?";
      case 6: return "What's your why?";
      case 7: return "What are your core values?";
      case 8: return "How would you describe your voice?";
      case 9: return "Your Personal Communication Guide";
      default: return "";
    }
  };

  const getStepDescription = (step: number) => {
    switch (step) {
      case 1: return "Let's start with the basics";
      case 2: return "We'll send your personalized guide here";
      case 3: return "Share your background, experiences, and what has shaped you";
      case 4: return "What's the change you want to see in the world? Paint a picture of the future you're working toward";
      case 5: return "What actions do you take (or plan to take) every day to bring that vision closer?";
      case 6: return "Why does this matter to you on a deeper, personal level? What drives this work?";
      case 7: return "List 3-5 values that feel non-negotiable in how you live or work";
      case 8: return "How should your voice feel? What traits describe how your words should come across?";
      case 9: return "Review your responses and download your personalized communication guide";
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
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4 overflow-x-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((step) => (
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
            {/* Steps 1-2: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-fade-in">
                <Label htmlFor="name" className="text-lg font-medium text-white">Your full name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  className={`text-lg py-6 bg-gray-700 border-gray-600 text-white placeholder-gray-400 ${errors.name ? 'border-red-500' : ''}`}
                  autoFocus
                />
                {errors.name && (
                  <p className="text-red-500 text-sm animate-fade-in">{errors.name}</p>
                )}
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4 animate-fade-in">
                <Label htmlFor="email" className="text-lg font-medium text-white">Your email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className={`text-lg py-6 bg-gray-700 border-gray-600 text-white placeholder-gray-400 ${errors.email ? 'border-red-500' : ''}`}
                  autoFocus
                />
                {errors.email && (
                  <p className="text-red-500 text-sm animate-fade-in">{errors.email}</p>
                )}
              </div>
            )}

            {/* Step 3: Story */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-fade-in">
                <Label htmlFor="story" className="text-lg font-medium text-white">Your Story</Label>
                <Textarea
                  id="story"
                  placeholder="Share your background, key experiences, and what has shaped who you are today. What moments or experiences have been most influential in your journey?"
                  value={formData.story}
                  onChange={(e) => updateFormData('story', e.target.value)}
                  className={`text-lg min-h-32 bg-gray-700 border-gray-600 text-white placeholder-gray-400 ${errors.story ? 'border-red-500' : ''}`}
                  autoFocus
                />
                {errors.story && (
                  <p className="text-red-500 text-sm animate-fade-in">{errors.story}</p>
                )}
              </div>
            )}

            {/* Step 4: Vision */}
            {currentStep === 4 && (
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

            {/* Step 5: Mission */}
            {currentStep === 5 && (
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

            {/* Step 6: Why */}
            {currentStep === 6 && (
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

            {/* Step 7: Values */}
            {currentStep === 7 && (
              <div className="space-y-4 animate-fade-in">
                <Label htmlFor="values" className="text-lg font-medium text-white">Your Core Values</Label>
                <Textarea
                  id="values"
                  placeholder="List 3-5 values that feel non-negotiable in how you live or work. Include how you live these values in action. What do they look like in practice?"
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

            {/* Step 8: Voice */}
            {currentStep === 8 && (
              <div className="space-y-4 animate-fade-in">
                <Label htmlFor="voice" className="text-lg font-medium text-white">Your Voice</Label>
                <Textarea
                  id="voice"
                  placeholder="How should your voice feel? Pick 2-3 traits that describe how your words should come across (warm, clear, curious, grounded, playful, bold, direct, etc.). Include any phrases that sound like you and any styles that don't fit."
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

            {/* Step 9: Review */}
            {currentStep === 9 && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-gray-700 rounded-lg p-6 space-y-6 max-h-96 overflow-y-auto">
                  <h3 className="font-semibold text-lg text-white">Your Communication Guide:</h3>
                  
                  <div>
                    <p className="font-medium text-gray-300">Name:</p>
                    <p className="text-gray-400 text-sm">{formData.name}</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-300">Email:</p>
                    <p className="text-gray-400 text-sm">{formData.email}</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-300">Your Story:</p>
                    <p className="text-gray-400 text-sm">{formData.story.substring(0, 150)}...</p>
                  </div>
                  
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
                    <p className="font-medium text-gray-300">Your Voice:</p>
                    <p className="text-gray-400 text-sm">{formData.voice.substring(0, 150)}...</p>
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
          {currentStep < 9 && (
            <div className="flex justify-between mt-8">
              <Button
                onClick={prevStep}
                disabled={currentStep === 1}
                variant="outline"
                className="px-6 py-3 text-lg disabled:opacity-50 border-gray-600 text-gray-300 hover:bg-gray-700"
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

          {currentStep === 9 && (
            <div className="flex justify-center mt-6">
              <Button
                onClick={prevStep}
                variant="outline"
                className="px-6 py-3 text-lg border-gray-600 text-gray-300 hover:bg-gray-700"
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
