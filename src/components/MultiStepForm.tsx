
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, User, Mail, MessageSquare, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import jsPDF from 'jspdf';

interface FormData {
  name: string;
  email: string;
  needs: string;
}

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    needs: ''
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const totalSteps = 4;

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
        if (!formData.needs.trim()) {
          newErrors.needs = 'Please tell us about your needs';
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
    doc.setFontSize(20);
    doc.setTextColor(147, 51, 234); // Purple color
    doc.text('Form Responses', 20, 30);
    
    // Add current date
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 45);
    
    // Add responses
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    
    let yPosition = 70;
    
    // Name
    doc.setFont(undefined, 'bold');
    doc.text('Name:', 20, yPosition);
    doc.setFont(undefined, 'normal');
    doc.text(formData.name, 20, yPosition + 10);
    
    yPosition += 35;
    
    // Email
    doc.setFont(undefined, 'bold');
    doc.text('Email:', 20, yPosition);
    doc.setFont(undefined, 'normal');
    doc.text(formData.email, 20, yPosition + 10);
    
    yPosition += 35;
    
    // Needs
    doc.setFont(undefined, 'bold');
    doc.text('Tell us about your needs:', 20, yPosition);
    doc.setFont(undefined, 'normal');
    
    // Split long text into multiple lines
    const splitText = doc.splitTextToSize(formData.needs, 170);
    doc.text(splitText, 20, yPosition + 10);
    
    // Save the PDF
    doc.save(`${formData.name.replace(/\s+/g, '_')}_responses.pdf`);
  };

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1: return <User className="w-5 h-5" />;
      case 2: return <Mail className="w-5 h-5" />;
      case 3: return <MessageSquare className="w-5 h-5" />;
      case 4: return <CheckCircle className="w-5 h-5" />;
      default: return null;
    }
  };

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1: return "What's your name?";
      case 2: return "Where should we reach you?";
      case 3: return "Tell us about your needs";
      case 4: return "Ready to generate your PDF?";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                  step <= currentStep
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {step < currentStep ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  getStepIcon(step)
                )}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
          <div className="text-center mt-2 text-sm text-gray-600">
            Step {currentStep} of {totalSteps}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {getStepTitle(currentStep)}
            </h1>
            <p className="text-gray-600">
              {currentStep === 4 
                ? "Review your information and download your personalized PDF"
                : "Please fill in the information below"
              }
            </p>
          </div>

          {/* Step Content */}
          <div className="min-h-[200px] flex flex-col justify-center">
            {currentStep === 1 && (
              <div className="space-y-4 animate-fade-in">
                <Label htmlFor="name" className="text-lg font-medium">Your full name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  className={`text-lg py-6 ${errors.name ? 'border-red-500' : ''}`}
                  autoFocus
                />
                {errors.name && (
                  <p className="text-red-500 text-sm animate-fade-in">{errors.name}</p>
                )}
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4 animate-fade-in">
                <Label htmlFor="email" className="text-lg font-medium">Your email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className={`text-lg py-6 ${errors.email ? 'border-red-500' : ''}`}
                  autoFocus
                />
                {errors.email && (
                  <p className="text-red-500 text-sm animate-fade-in">{errors.email}</p>
                )}
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4 animate-fade-in">
                <Label htmlFor="needs" className="text-lg font-medium">Tell us about your needs</Label>
                <Textarea
                  id="needs"
                  placeholder="Describe your requirements, goals, or what you're looking for..."
                  value={formData.needs}
                  onChange={(e) => updateFormData('needs', e.target.value)}
                  className={`text-lg min-h-32 ${errors.needs ? 'border-red-500' : ''}`}
                  autoFocus
                />
                {errors.needs && (
                  <p className="text-red-500 text-sm animate-fade-in">{errors.needs}</p>
                )}
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <h3 className="font-semibold text-lg text-gray-900">Your Information:</h3>
                  <div>
                    <p className="font-medium text-gray-700">Name:</p>
                    <p className="text-gray-600">{formData.name}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Email:</p>
                    <p className="text-gray-600">{formData.email}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Needs:</p>
                    <p className="text-gray-600">{formData.needs}</p>
                  </div>
                </div>
                <Button
                  onClick={generatePDF}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Your PDF
                </Button>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <div className="flex justify-between mt-8">
              <Button
                onClick={prevStep}
                disabled={currentStep === 1}
                variant="outline"
                className="px-6 py-3 text-lg disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={nextStep}
                className="px-6 py-3 text-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                Continue
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {currentStep === 4 && (
            <div className="flex justify-center mt-6">
              <Button
                onClick={prevStep}
                variant="outline"
                className="px-6 py-3 text-lg"
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
