
import React, { useState } from 'react';
import { ArrowRight, FileText, MessageSquare, Target, Heart, User, Lightbulb, LogIn, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import AuthDialog from '@/components/AuthDialog';

interface LandingPageProps {
  onStartForm: () => void;
}

const LandingPage = ({ onStartForm }: LandingPageProps) => {
  const { user, signOut } = useAuth();
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const handleStartForm = () => {
    if (user) {
      onStartForm();
    } else {
      setShowAuthDialog(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Header with Auth */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-end">
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Welcome, {user.email}</span>
              <Button
                onClick={signOut}
                variant="outline"
                className="bg-[#1a1a1a] border-[#c65d21] text-[#c65d21] hover:bg-[#c65d21] hover:text-white"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => setShowAuthDialog(true)}
              variant="outline"
              className="bg-[#1a1a1a] border-[#c65d21] text-[#c65d21] hover:bg-[#c65d21] hover:text-white"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Find Your Voice
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            A Communication Guide to Help You Get Clarity on Your Vision, Mission, and Why
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
            This isn't a personality test or a marketing checklist; it's a conversation starter with yourself. 
            Whether you're building a personal brand, freelancing, launching something new, or want to 
            better express your values, this guide is designed to help you discover your authentic voice.
            {user && (
              <span className="block mt-4 text-[#c65d21] font-medium">
                Sign in to save your progress and come back to edit your guide anytime!
              </span>
            )}
          </p>
          
          <Button 
            onClick={handleStartForm}
            className="bg-gradient-to-r from-[#c65d21] to-[#e67e22] hover:from-[#a04b18] hover:to-[#c65d21] text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            {user ? 'Continue Your Guide' : 'Start Your Guide'}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>

      {/* What You'll Discover Section */}
      <div className="bg-gray-800/50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What You'll Discover</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="bg-[#c65d21] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Get Clarity</h3>
                <p className="text-gray-300">Define your vision, mission, and why with guided reflection</p>
              </div>
              <div className="text-center p-6">
                <div className="bg-[#c65d21] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Define Your Values</h3>
                <p className="text-gray-300">Identify the values that matter most and how you live them</p>
              </div>
              <div className="text-center p-6">
                <div className="bg-[#c65d21] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Find Your Voice</h3>
                <p className="text-gray-300">Discover how you naturally communicate and show up</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-[#c65d21] w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Reflect on Your Story</h3>
                  <p className="text-gray-300">Share your background, experiences, and what drives you</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-[#c65d21] w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Define Your Vision & Values</h3>
                  <p className="text-gray-300">Articulate your vision for the future and core values</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-[#c65d21] w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Discover Your Voice</h3>
                  <p className="text-gray-300">Identify your communication style and authentic expression</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-[#c65d21] w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Get Your Personal Guide</h3>
                  <p className="text-gray-300">Receive a personalized PDF with all your insights</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="bg-gray-800/50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Perfect For</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-700/50 p-6 rounded-lg">
                <User className="w-8 h-8 text-[#c65d21] mb-3" />
                <h3 className="text-lg font-semibold mb-2">Personal Branding</h3>
                <p className="text-gray-300">Create a communication guide to help others understand you better</p>
              </div>
              <div className="bg-gray-700/50 p-6 rounded-lg">
                <Lightbulb className="w-8 h-8 text-[#c65d21] mb-3" />
                <h3 className="text-lg font-semibold mb-2">AI Collaboration</h3>
                <p className="text-gray-300">Use your guide as context for AI tools like ChatGPT to match your voice</p>
              </div>
              <div className="bg-gray-700/50 p-6 rounded-lg">
                <Target className="w-8 h-8 text-[#c65d21] mb-3" />
                <h3 className="text-lg font-semibold mb-2">Decision Making</h3>
                <p className="text-gray-300">Reference your values and voice to check alignment with your choices</p>
              </div>
              <div className="bg-gray-700/50 p-6 rounded-lg">
                <FileText className="w-8 h-8 text-[#c65d21] mb-3" />
                <h3 className="text-lg font-semibold mb-2">Living Document</h3>
                <p className="text-gray-300">Update and evolve your guide as your clarity deepens over time</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Voice?</h2>
            <p className="text-lg text-gray-300 mb-8">
              The goal isn't to write something impressive, it's to write something honest. 
              Start where it feels natural and let your authentic voice emerge.
            </p>
            
            <Button 
              onClick={handleStartForm}
              className="bg-gradient-to-r from-[#c65d21] to-[#e67e22] hover:from-[#a04b18] hover:to-[#c65d21] text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {user ? 'Continue Your Journey' : 'Begin Your Journey'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      <AuthDialog 
        isOpen={showAuthDialog} 
        onClose={() => setShowAuthDialog(false)} 
      />
    </div>
  );
};

export default LandingPage;
