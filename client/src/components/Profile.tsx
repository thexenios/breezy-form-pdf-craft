
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useFormPersistence } from '@/hooks/useFormPersistence';
import { Plus, Edit, Trash2, FileText, Calendar, CheckCircle, Circle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface FormResponse {
  id: string;
  title: string;
  formData: any;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

interface ProfileProps {
  onEditForm: (formId: string) => void;
  onCreateForm: () => void;
  onBackToLanding: () => void;
}

const Profile = ({ onEditForm, onCreateForm, onBackToLanding }: ProfileProps) => {
  const { deleteFormData, saveFormData } = useFormPersistence();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingTitle, setEditingTitle] = useState<{ id: string; title: string } | null>(null);

  const getCurrentUserId = () => "demo-user-id";

  // Query for user forms
  const { data: forms = [], isLoading: loading } = useQuery({
    queryKey: ['/api/form-responses', getCurrentUserId()],
    queryFn: () => apiRequest(`/api/form-responses/${getCurrentUserId()}`),
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (formId: string) => deleteFormData(formId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/form-responses', getCurrentUserId()] });
    },
  });

  const handleDeleteForm = async (formId: string) => {
    deleteMutation.mutate(formId);
  };

  const handleSaveTitle = async (formId: string, newTitle: string) => {
    const form = forms.find((f: FormResponse) => f.id === formId);
    if (!form) return;

    const success = await saveFormData(form.formData, form.completed, formId, newTitle);
    if (success) {
      queryClient.invalidateQueries({ queryKey: ['/api/form-responses', getCurrentUserId()] });
      setEditingTitle(null);
      toast({
        title: "Title updated",
        description: "Form title has been updated successfully.",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="text-white text-lg">Loading your forms...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Communication Guides</h1>
            <p className="text-gray-400">Welcome back, demo user</p>
          </div>
          <div className="flex gap-4">
            <Button
              onClick={onBackToLanding}
              variant="outline"
              className="bg-[#1a1a1a] border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Back to Home
            </Button>
          </div>
        </div>

        {/* Create New Form Button */}
        <div className="mb-8">
          <Button
            onClick={onCreateForm}
            className="bg-gradient-to-r from-[#c65d21] to-[#e67e22] hover:from-[#a04b18] hover:to-[#c65d21] text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Communication Guide
          </Button>
        </div>

        {/* Forms Grid */}
        {forms.length === 0 ? (
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No forms yet</h3>
              <p className="text-gray-400 text-center mb-6">
                Create your first communication guide to get started.
              </p>
              <Button
                onClick={onCreateForm}
                className="bg-gradient-to-r from-[#c65d21] to-[#e67e22] hover:from-[#a04b18] hover:to-[#c65d21] text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Guide
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forms.map((form: FormResponse) => (
              <Card key={form.id} className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {editingTitle?.id === form.id ? (
                        <div className="space-y-2">
                          <Input
                            value={editingTitle?.title || ''}
                            onChange={(e) => editingTitle && setEditingTitle({ ...editingTitle, title: e.target.value })}
                            className="bg-gray-700 border-gray-600 text-white"
                            onBlur={() => editingTitle && handleSaveTitle(form.id, editingTitle.title)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && editingTitle) {
                                handleSaveTitle(form.id, editingTitle.title);
                              } else if (e.key === 'Escape') {
                                setEditingTitle(null);
                              }
                            }}
                            autoFocus
                          />
                        </div>
                      ) : (
                        <CardTitle className="text-white text-lg mb-2 cursor-pointer hover:text-[#c65d21] transition-colors"
                          onClick={() => setEditingTitle({ id: form.id, title: form.title })}
                        >
                          {form.title}
                        </CardTitle>
                      )}
                      <div className="flex items-center gap-2 mb-2">
                        {form.completed ? (
                          <Badge variant="secondary" className="bg-green-900 text-green-300">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Completed
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-yellow-900 text-yellow-300">
                            <Circle className="w-3 h-3 mr-1" />
                            In Progress
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-gray-400 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    Updated {formatDate(form.updatedAt)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => onEditForm(form.id)}
                      size="sm"
                      className="flex-1 bg-[#c65d21] hover:bg-[#a04b18] text-white"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-transparent border-red-600 text-red-400 hover:bg-red-900 hover:text-red-300"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gray-800 border-gray-700">
                        <DialogHeader>
                          <DialogTitle className="text-white">Delete Form</DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                          <p className="text-gray-300">
                            Are you sure you want to delete "{form.title}"? This action cannot be undone.
                          </p>
                        </div>
                        <div className="flex justify-end gap-2">
                          <DialogTrigger asChild>
                            <Button variant="outline" className="bg-transparent border-gray-600 text-gray-300">
                              Cancel
                            </Button>
                          </DialogTrigger>
                          <Button
                            onClick={() => handleDeleteForm(form.id)}
                            className="bg-red-600 hover:bg-red-700 text-white"
                          >
                            Delete
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
