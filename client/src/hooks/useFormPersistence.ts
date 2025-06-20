
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

interface FormResponse {
  id: string;
  title: string;
  form_data: FormData;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export const useFormPersistence = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const saveFormData = async (formData: FormData, completed: boolean = false, formId?: string, title?: string) => {
    if (!user) return null;

    try {
      if (formId) {
        // Update existing form
        const updateData: any = {
          form_data: formData,
          completed,
          updated_at: new Date().toISOString()
        };
        
        if (title) {
          updateData.title = title;
        }

        const { error } = await supabase
          .from('form_responses')
          .update(updateData)
          .eq('id', formId)
          .eq('user_id', user.id);

        if (error) throw error;
        return formId;
      } else {
        // Create new form
        const { data, error } = await supabase
          .from('form_responses')
          .insert({
            user_id: user.id,
            form_data: formData as any,
            completed,
            title: title || 'Untitled Form'
          })
          .select('id')
          .single();

        if (error) throw error;
        return data?.id || null;
      }
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

  const loadFormData = async (formId?: string): Promise<{ formData: FormData | null; formId: string | null }> => {
    if (!user) return { formData: null, formId: null };

    try {
      let query = supabase
        .from('form_responses')
        .select('*')
        .eq('user_id', user.id);

      if (formId) {
        query = query.eq('id', formId);
      } else {
        query = query.order('updated_at', { ascending: false }).limit(1);
      }

      const { data, error } = await query.maybeSingle();

      if (error) throw error;

      if (data) {
        return { formData: data.form_data as unknown as FormData, formId: data.id };
      }

      return { formData: null, formId: null };
    } catch (error) {
      console.error('Error loading form:', error);
      return { formData: null, formId: null };
    }
  };

  const getUserForms = async (): Promise<FormResponse[]> => {
    if (!user) return [];

    try {
      const { data, error } = await supabase
        .from('form_responses')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error loading user forms:', error);
      return [];
    }
  };

  const deleteForm = async (formId: string): Promise<boolean> => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('form_responses')
        .delete()
        .eq('id', formId)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Form deleted",
        description: "Your form has been deleted successfully.",
      });

      return true;
    } catch (error) {
      console.error('Error deleting form:', error);
      toast({
        title: "Delete failed",
        description: "Failed to delete the form. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    saveFormData,
    loadFormData,
    getUserForms,
    deleteForm
  };
};
