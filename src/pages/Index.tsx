
import React, { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import MultiStepForm from '@/components/MultiStepForm';

const Index = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      {showForm ? (
        <MultiStepForm onBackToLanding={() => setShowForm(false)} />
      ) : (
        <LandingPage onStartForm={() => setShowForm(true)} />
      )}
    </>
  );
};

export default Index;
