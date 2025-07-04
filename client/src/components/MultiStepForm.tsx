import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Download, FileText, MessageSquare, Target, Heart, User, Lightbulb, CheckCircle, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useFormPersistence } from '@/hooks/useFormPersistence';
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
  onBackToProfile: () => void;
  editingFormId?: string;
}

const MultiStepForm = ({ onBackToLanding, onBackToProfile, editingFormId }: MultiStepFormProps) => {
  const { user } = useAuth();
  const { saveFormData, loadFormData } = useFormPersistence();
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
  const [isLoading, setIsLoading] = useState(true);
  const [currentFormId, setCurrentFormId] = useState<string | null>(editingFormId || null);
  const [savedFormId, setSavedFormId] = useState<string | null>(null);

  const totalSteps = 10;

  // Load form data when component mounts
  useEffect(() => {
    const loadSavedData = async () => {
      if (editingFormId) {
        try {
          const savedFormResponse = await loadFormData(editingFormId);
          if (savedFormResponse) {
            setFormData(savedFormResponse.formData);
            setCurrentFormId(savedFormResponse.id);
          }
        } catch (error) {
          console.error('Error loading form data:', error);
        }
      }
      setIsLoading(false);
    };

    loadSavedData();
  }, [editingFormId]);

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
      // Auto-save progress
      handleSaveProgress();
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const updateFormData = (field: keyof FormData, value: string) => {
    console.log(`Updating ${field} with value:`, value);
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      console.log('Updated form data:', updated);
      return updated;
    });
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSaveProgress = async () => {
    const result = await saveFormData(formData, false, currentFormId || undefined);
    if (result && result.id && !currentFormId) {
      setCurrentFormId(result.id);
      setSavedFormId(result.id);
    }
  };

  const generatePDF = async () => {
    const doc = new jsPDF();
    
    // Set up colors
    const orangeColor: [number, number, number] = [198, 93, 33]; // Orange color from your design
    const whiteColor: [number, number, number] = [255, 255, 255];
    const grayColor: [number, number, number] = [180, 180, 180];
    const darkBlueColor: [number, number, number] = [52, 73, 94]; // Dark blue similar to your background
    
    // Create gradient-like background effect
    doc.setFillColor(65, 105, 145); // Blue background color
    doc.rect(0, 0, 210, 297, 'F'); // Fill entire page
    
    // Add main title "Get to KNOW ME" style
    doc.setFontSize(36);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text('Get to', 20, 40);
    
    doc.setFontSize(48);
    doc.setTextColor(198, 93, 33);
    doc.text('KNOW ME', 20, 65);
    
    // Add date in corner
    doc.setFontSize(10);
    doc.setTextColor(180, 180, 180);
    doc.text(`Created: ${new Date().toLocaleDateString()}`, 150, 20);
    
    let yPosition = 90;
    
    // Main sections in left column style
    const addMainSection = (title: string, content: string, yPos: number) => {
      // Orange title
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(198, 93, 33);
      doc.text(`${title}:`, 20, yPos);
      
      // White content
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(255, 255, 255);
      const splitText = doc.splitTextToSize(content, 85); // Narrower column like your design
      doc.text(splitText, 20, yPos + 8);
      
      return yPos + splitText.length * 4 + 20;
    };
    
    // Add North Star section
    yPosition = addMainSection('My North Star', formData.vision, yPosition);
    
    // Add Mission section  
    yPosition = addMainSection('My Mission', formData.mission, yPosition);
    
    // Add Why section
    yPosition = addMainSection('My Why', formData.why, yPosition);
    
    // Add Tone section (combining voice elements)
    const toneContent = `${formData.voice}\n\nPhrase that sounds like me: ${formData.phraseSound}`;
    yPosition = addMainSection('My Tone', toneContent, yPosition);
    
    // Values section at bottom with pillars style
    if (yPosition > 220) {
      doc.addPage();
      doc.setFillColor(65, 105, 145);
      doc.rect(0, 0, 210, 297, 'F');
      yPosition = 30;
    }
    
    // Core Values title
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(198, 93, 33);
    doc.text('Core Values', 20, yPosition);
    yPosition += 20;
    
    // Parse values and create pillar-like display
    const values = formData.values.split(',').map(v => v.trim()).filter(v => v);
    const pillarsPerRow = 3;
    const pillarWidth = 50;
    const pillarSpacing = 60;
    
    values.forEach((value, index) => {
      const row = Math.floor(index / pillarsPerRow);
      const col = index % pillarsPerRow;
      const x = 20 + (col * pillarSpacing);
      const y = yPosition + (row * 40);
      
      // Draw simple pillar representation
      doc.setFillColor(198, 93, 33);
      doc.rect(x + 15, y + 15, 20, 8, 'F'); // Top of pillar
      
      doc.setFillColor(180, 180, 180);
      doc.rect(x + 17, y + 23, 16, 2, 'F'); // Pillar lines
      doc.rect(x + 17, y + 25, 16, 2, 'F');
      doc.rect(x + 17, y + 27, 16, 2, 'F');
      
      // Value name below pillar
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(198, 93, 33);
      const textWidth = doc.getTextWidth(value);
      doc.text(value, x + 25 - (textWidth / 2), y + 35);
    });
    
    // Add additional sections on second page if needed
    if (formData.valuesInAction || formData.antiValues || formData.antiVoice) {
      doc.addPage();
      doc.setFillColor(65, 105, 145);
      doc.rect(0, 0, 210, 297, 'F');
      
      let page2Y = 30;
      
      if (formData.valuesInAction) {
        page2Y = addMainSection('Values in Action', formData.valuesInAction, page2Y);
      }
      
      if (formData.antiValues) {
        page2Y = addMainSection('Anti-Values', formData.antiValues, page2Y);
      }
      
      if (formData.antiVoice) {
        page2Y = addMainSection('Anti-Voice', formData.antiVoice, page2Y);
      }
    }
    
    // Save as completed if user is logged in
    if (user) {
      await saveFormData(formData, true, currentFormId || undefined);
    }
    
    // Save the PDF
    doc.save('personal_communication_guide.pdf');
  };

  // ... keep existing code (getStepIcon, getStepTitle, getStepDescription functions)
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="text-white text-lg">Loading your guide...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back button */}
        <div className="mb-8 flex justify-between items-center">
          <Button
            onClick={user ? onBackToProfile : onBackToLanding}
            variant="outline"
            className="bg-[#1a1a1a] border-[#1a1a1a] text-[#c65d21] hover:bg-[#c65d21] hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            {user ? 'Back to Profile' : 'Back to Home'}
          </Button>
          
          {user && currentStep < 10 && (
            <Button
              onClick={handleSaveProgress}
              variant="outline"
              className="bg-[#1a1a1a] border-[#c65d21] text-[#c65d21] hover:bg-[#c65d21] hover:text-white transition-colors"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Progress
            </Button>
          )}
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
                  name="vision"
                  placeholder="What's the change you want to see in the world? Paint a picture of the future you're working toward. This is your north star."
                  value={formData.vision}
                  onChange={(e) => updateFormData('vision', e.target.value)}
                  className={`text-lg min-h-32 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-[#c65d21] focus:ring-[#c65d21] ${errors.vision ? 'border-red-500' : ''}`}
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
                  name="mission"
                  placeholder="What actions do you take (or plan to take) every day to bring that vision closer? These are the concrete steps and behaviors that move you forward."
                  value={formData.mission}
                  onChange={(e) => updateFormData('mission', e.target.value)}
                  className={`text-lg min-h-32 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-[#c65d21] focus:ring-[#c65d21]  ${errors.mission ? 'border-red-500' : ''}`}
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
                  name="why"
                  placeholder="Why does this matter to you on a deeper, personal level? What experience, belief, or conviction drives this work? This is your reason for existing."
                  value={formData.why}
                  onChange={(e) => updateFormData('why', e.target.value)}
                  className={`text-lg min-h-32 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-[#c65d21] focus:ring-[#c65d21] ${errors.why ? 'border-red-500' : ''}`}
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
                  name="values"
                  placeholder="List 3-5 values that feel non-negotiable in how you live or work. What principles guide your decisions and actions?"
                  value={formData.values}
                  onChange={(e) => updateFormData('values', e.target.value)}
                  className={`text-lg min-h-32 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-[#c65d21] focus:ring-[#c65d21] ${errors.values ? 'border-red-500' : ''}`}
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
                  name="valuesInAction"
                  placeholder="Choose one value and describe how you live it. What does it look or sound like in practice? Give specific examples of how this value shows up in your work or life."
                  value={formData.valuesInAction}
                  onChange={(e) => updateFormData('valuesInAction', e.target.value)}
                  className={`text-lg min-h-32 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-[#c65d21] focus:ring-[#c65d21] ${errors.valuesInAction ? 'border-red-500' : ''}`}
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
                  name="antiValues"
                  placeholder="What do you not want to be known for, even if it's trendy or expected? These are not always bad, just things that oppose your listed values and don't align with who you are."
                  value={formData.antiValues}
                  onChange={(e) => updateFormData('antiValues', e.target.value)}
                  className={`text-lg min-h-32 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-[#c65d21] focus:ring-[#c65d21] ${errors.antiValues ? 'border-red-500' : ''}`}
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
                  name="voice"
                  placeholder="How should your voice feel? Pick 2-3 traits that describe how your words should come across (warm, clear, curious, grounded, playful, bold, direct, etc.)."
                  value={formData.voice}
                  onChange={(e) => updateFormData('voice', e.target.value)}
                  className={`text-lg min-h-32 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-[#c65d21] focus:ring-[#c65d21] ${errors.voice ? 'border-red-500' : ''}`}
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
                  name="phraseSound"
                  placeholder="Drop in a sentence or saying that feels natural and true to your voice. What do you find yourself saying often? What phrases come naturally to you?"
                  value={formData.phraseSound}
                  onChange={(e) => updateFormData('phraseSound', e.target.value)}
                  className={`text-lg min-h-32 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-[#c65d21] focus:ring-[#c65d21] ${errors.phraseSound ? 'border-red-500' : ''}`}
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
                  name="antiVoice"
                  placeholder="Any language, energy, or communication habits that don't reflect who you are? What tone or style doesn't fit you? (These aren't necessarily bad traits, just not you)"
                  value={formData.antiVoice}
                  onChange={(e) => updateFormData('antiVoice', e.target.value)}
                  className={`text-lg min-h-32 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-[#c65d21] focus:ring-[#c65d21] ${errors.antiVoice ? 'border-red-500' : ''}`}
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
