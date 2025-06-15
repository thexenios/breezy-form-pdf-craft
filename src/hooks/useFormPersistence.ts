
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

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

export const useFormPersistence = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [savedFormId, setSavedFormId] = useState<string | null>(null);

  const saveFormData = async (formData: FormData, completed: boolean = false) => {
    if (!user) return null;

    try {
      if (savedFormId) {
        // Update existing form
        const { error } = await supabase
          .from('form_responses')
          .update({
            form_data: formData,
            completed,
            updated_at: new Date().toISOString()
          })
          .eq('id', savedFormId)
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        // Create new form
        const { data, error } = await supabase
          .from('form_responses')
          .insert({
            user_id: user.id,
            form_data: formData,
            completed
          })
          .select('id')
          .single();

        if (error) throw error;
        if (data) setSavedFormId(data.id);
      }

      toast({
        title: "Form saved",
        description: "Your progress has been saved successfully.",
      });

      return savedFormId;
    } catch (error) {
      console.error('Error saving form:', error);
      toast({
        title: "Save failed",
        description: "Failed to save your progress. Please try again.",
        variant: "destructive",
      });
      return null;
    }
  };

  const loadFormData = async (): Promise<{ formData: FormData | null; formId: string | null }> => {
    if (!user) return { formData: null, formId: null };

    try {
      const { data, error } = await supabase
        .from('form_responses')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setSavedFormId(data.id);
        return { formData: data.form_data as FormData, formId: data.id };
      }

      return { formData: null, formId: null };
    } catch (error) {
      console.error('Error loading form:', error);
      return { formData: null, formId: null };
    }
  };

  return {
    saveFormData,
    loadFormData,
    savedFormId,
    setSavedFormId
  };
};
