
import { useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import LandingPage from '@/components/LandingPage';
import MultiStepForm from '@/components/MultiStepForm';
import Profile from '@/components/Profile';
import About from '@/pages/About';
import './App.css';

type AppState = 'landing' | 'form' | 'profile' | 'about';

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

  const handleShowAbout = () => {
    setCurrentView('about');
  };

  return (
    <AuthProvider>
      <div className="min-h-screen">
        {currentView === 'landing' && (
          <LandingPage 
            onStartForm={handleStartForm}
            onShowProfile={handleShowProfile}
            onShowAbout={handleShowAbout}
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
        {currentView === 'about' && (
          <About 
            onBack={handleBackToLanding}
          />
        )}
        <Toaster />
      </div>
    </AuthProvider>
  );
}

export default App;
