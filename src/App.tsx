
import { useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import LandingPage from '@/components/LandingPage';
import MultiStepForm from '@/components/MultiStepForm';
import Profile from '@/components/Profile';
import './App.css';

type AppState = 'landing' | 'form' | 'profile';

function App() {
  const [currentView, setCurrentView] = useState<AppState>('landing');
  const [editingFormId, setEditingFormId] = useState<string | undefined>();

  const handleStartForm = () => {
    setEditingFormId(undefined);
    setCurrentView('form');
  };

  const handleShowProfile = () => {
    setCurrentView('profile');
  };

  const handleEditForm = (formId: string) => {
    setEditingFormId(formId);
    setCurrentView('form');
  };

  const handleBackToLanding = () => {
    setEditingFormId(undefined);
    setCurrentView('landing');
  };

  const handleBackToProfile = () => {
    setEditingFormId(undefined);
    setCurrentView('profile');
  };

  return (
    <AuthProvider>
      <div className="min-h-screen">
        {currentView === 'landing' && (
          <LandingPage 
            onStartForm={handleStartForm}
            onShowProfile={handleShowProfile}
          />
        )}
        {currentView === 'form' && (
          <MultiStepForm 
            onBackToLanding={handleBackToLanding}
            onBackToProfile={handleBackToProfile}
            editingFormId={editingFormId}
          />
        )}
        {currentView === 'profile' && (
          <Profile 
            onEditForm={handleEditForm}
            onCreateForm={handleStartForm}
            onBackToLanding={handleBackToLanding}
          />
        )}
        <Toaster />
      </div>
    </AuthProvider>
  );
}

export default App;
