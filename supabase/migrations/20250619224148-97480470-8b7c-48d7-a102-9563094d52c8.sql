
-- Add a title field to form_responses to distinguish between different forms
ALTER TABLE public.form_responses 
ADD COLUMN title TEXT NOT NULL DEFAULT 'Untitled Form';

-- Add an index for better performance when querying user forms
CREATE INDEX idx_form_responses_user_id_created_at ON public.form_responses(user_id, created_at DESC);
