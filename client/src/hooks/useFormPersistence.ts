import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

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

interface FormResponse {
  id: string;
  title: string;
  formData: FormData;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export const useFormPersistence = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // For now, we'll use a static user ID until authentication is properly implemented
  const getCurrentUserId = () => "demo-user-id";

  const saveFormData = async (formData: FormData, completed: boolean = false, formId?: string, title?: string) => {
    const userId = getCurrentUserId();
    if (!userId) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save your form.",
        variant: "destructive",
      });
      return null;
    }

    setIsLoading(true);
    try {
      let result;
      if (formId) {
        // Update existing form
        result = await apiRequest(`/api/form-responses/${formId}`, {
          method: 'PUT',
          body: JSON.stringify({
            formData,
            completed,
            title: title || 'My Communication Guide',
          }),
        });
      } else {
        // Create new form
        result = await apiRequest('/api/form-responses', {
          method: 'POST',
          body: JSON.stringify({
            userId,
            formData,
            completed,
            title: title || 'My Communication Guide',
          }),
        });
      }

      toast({
        title: completed ? "Form completed!" : "Progress saved",
        description: completed ? "Your communication guide has been completed and saved." : "Your progress has been saved successfully.",
      });

      return result;
    } catch (error) {
      console.error('Error saving form:', error);
      toast({
        title: "Save failed",
        description: "There was an error saving your form. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const loadFormData = async (formId: string): Promise<FormResponse | null> => {
    setIsLoading(true);
    try {
      const data = await apiRequest(`/api/form-responses/single/${formId}`);
      return data;
    } catch (error) {
      console.error('Error loading form:', error);
      toast({
        title: "Load failed",
        description: "There was an error loading your form. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteFormData = async (formId: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      await apiRequest(`/api/form-responses/${formId}`, {
        method: 'DELETE',
      });

      toast({
        title: "Form deleted",
        description: "Your form has been deleted successfully.",
      });

      return true;
    } catch (error) {
      console.error('Error deleting form:', error);
      toast({
        title: "Delete failed",
        description: "There was an error deleting your form. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    saveFormData,
    loadFormData,
    deleteFormData,
    isLoading
  };
};