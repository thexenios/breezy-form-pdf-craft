import React, { useState, useEffect } from 'react';
import { ChevronLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useFormPersistence } from '@/hooks/useFormPersistence';
import { FormStep } from '@/components/form/FormStep';
import { StepProgress } from '@/components/form/StepProgress';
import { FormNavigation } from '@/components/form/FormNavigation';
import { ReviewStep } from '@/components/form/ReviewStep';
import { generateCommunicationGuidePDF } from '@/utils/pdfGenerator';
import { getStepIcon, getStepTitle, getStepDescription, stepConfigs } from '@/utils/formStepConfig';

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

  const totalSteps = 10;

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
    const config = stepConfigs[step];
    
    if (config && !formData[config.id as keyof FormData].trim()) {
      newErrors[config.id as keyof FormData] = `Please complete this field`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
      handleSaveProgress();
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

  const handleSaveProgress = async () => {
    const result = await saveFormData(formData, false, currentFormId || undefined);
    if (result && result.id && !currentFormId) {
      setCurrentFormId(result.id);
    }
  };

  const handleGeneratePDF = async () => {
    if (user) {
      await saveFormData(formData, true, currentFormId || undefined);
    }
    generateCommunicationGuidePDF(formData);
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
        {/* Header */}
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
        <StepProgress
          currentStep={currentStep}
          totalSteps={totalSteps}
          getStepIcon={getStepIcon}
        />

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
            {currentStep < 10 && stepConfigs[currentStep] && (
              <FormStep
                id={stepConfigs[currentStep].id}
                label={stepConfigs[currentStep].label}
                placeholder={stepConfigs[currentStep].placeholder}
                value={formData[stepConfigs[currentStep].id as keyof FormData]}
                onChange={(value) => updateFormData(stepConfigs[currentStep].id as keyof FormData, value)}
                error={errors[stepConfigs[currentStep].id as keyof FormData]}
              />
            )}

            {currentStep === 10 && (
              <ReviewStep
                formData={formData}
                onGeneratePDF={handleGeneratePDF}
              />
            )}
          </div>

          {/* Navigation */}
          <FormNavigation
            currentStep={currentStep}
            totalSteps={totalSteps}
            onPrev={prevStep}
            onNext={nextStep}
            isFirstStep={currentStep === 1}
          />
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
