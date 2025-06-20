
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, CheckCircle, User, UserCircle, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AuthDialog from '@/components/AuthDialog';

interface LandingPageProps {
  onStartForm: () => void;
  onShowProfile: () => void;
  onShowAbout: () => void;
}

const LandingPage = ({ onStartForm, onShowProfile, onShowAbout }: LandingPageProps) => {
  const { user } = useAuth();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Header */}
      <header className="px-4 py-6 relative">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FileText className="w-8 h-8 text-[#385f8e]" />
            <span className="text-xl font-bold">Communication Guide</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              onClick={onShowAbout}
              variant="ghost"
              className="text-white hover:text-[#c65d21] transition-colors"
            >
              About
            </Button>
            {user ? (
              <Button
                onClick={onShowProfile}
                variant="outline"
                className="bg-transparent border-[#c65d21] text-[#c65d21] hover:bg-[#c65d21] hover:text-white transition-colors"
              >
                <UserCircle className="w-4 h-4 mr-2" />
                My Profile
              </Button>
            ) : (
              <Button
                onClick={() => setShowAuthDialog(true)}
                variant="outline"
                className="bg-transparent border-[#c65d21] text-[#c65d21] hover:bg-[#c65d21] hover:text-white transition-colors"
              >
                Sign Up / Sign In
              </Button>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              variant="ghost"
              size="sm"
              className="text-white hover:text-[#c65d21] transition-colors"
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {showMobileMenu && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#1a1a1a] border-t border-gray-800 shadow-lg z-50">
            <div className="px-4 py-4 space-y-2">
              <Button
                onClick={() => {
                  onShowAbout();
                  setShowMobileMenu(false);
                }}
                variant="ghost"
                className="w-full text-left justify-start text-white hover:text-[#c65d21] transition-colors"
              >
                About
              </Button>
              {user ? (
                <Button
                  onClick={() => {
                    onShowProfile();
                    setShowMobileMenu(false);
                  }}
                  variant="ghost"
                  className="w-full text-left justify-start text-white hover:text-[#c65d21] transition-colors"
                >
                  <UserCircle className="w-4 h-4 mr-2" />
                  My Profile
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setShowAuthDialog(true);
                    setShowMobileMenu(false);
                  }}
                  variant="ghost"
                  className="w-full text-left justify-start text-white hover:text-[#c65d21] transition-colors"
                >
                  Sign Up / Sign In
                </Button>
              )}
            </div>
          </div>
        )}
      </header>
      {/* Hero Section */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Define Your Voice.<br />
            <span className="bg-gradient-to-r from-[#c65d21] to-[#e67e22] bg-clip-text text-[#385f8e]">
              Own Your Message.
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Create a personalized communication guide that captures your authentic voice, 
            values, and message. Perfect for professionals, creators, and leaders who want 
            to communicate with clarity and impact.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={onStartForm}
              size="lg"
              className="bg-gradient-to-r from-[#c65d21] to-[#e67e22] hover:from-[#a04b18] hover:to-[#c65d21] text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <FileText className="w-5 h-5 mr-2" />
              Create Your Guide - Free
            </Button>
            
            {user && (
              <Button
                onClick={onShowProfile}
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-[#1a1a1a] text-white hover:bg-[#c65d21] hover:text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
              >
                <User className="w-5 h-5 mr-2" />
                View My Guides
              </Button>
            )}
          </div>
          
          <p className="text-sm text-gray-400 mt-4">
            No signup required • Takes 10-15 minutes • Download as PDF
          </p>
        </div>
      </section>
      {/* Features Section */}
      <section className="px-4 py-20 bg-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#385f8e]">
              Everything You Need to Define Your Voice
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Our guided process helps you discover and articulate what makes your communication unique and effective.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 hover:border-[#c65d21]/30 transition-colors">
              <div className="w-12 h-12 bg-[#c65d21]/20 rounded-lg flex items-center justify-center mb-6">
                <FileText className="w-6 h-6 text-[#c65d21]" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Comprehensive Framework</h3>
              <p className="text-gray-300 leading-relaxed">
                Explore your vision, mission, values, and voice through our proven 9-step framework 
                designed by communication experts.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 hover:border-[#c65d21]/30 transition-colors">
              <div className="w-12 h-12 bg-[#c65d21]/20 rounded-lg flex items-center justify-center mb-6">
                <CheckCircle className="w-6 h-6 text-[#c65d21]" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Instant PDF Export</h3>
              <p className="text-gray-300 leading-relaxed">
                Get your personalized communication guide as a beautifully formatted PDF 
                that you can reference anytime, anywhere.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 hover:border-[#c65d21]/30 transition-colors">
              <div className="w-12 h-12 bg-[#c65d21]/20 rounded-lg flex items-center justify-center mb-6">
                <User className="w-6 h-6 text-[#c65d21]" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Save & Continue</h3>
              <p className="text-gray-300 leading-relaxed">
                Create an account to save your progress, edit your guide anytime, 
                and create multiple communication frameworks.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#385f8e]">
              How It Works
            </h2>
            <p className="text-lg text-gray-300">
              Simple steps to create your personalized communication guide
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="w-10 h-10 bg-[#c65d21] rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                1
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold mb-2 text-white text-left">Define Your Foundation</h3>
                <p className="text-gray-300 text-left">Start by exploring your vision, mission, and core purpose. What drives you and what change do you want to see?</p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="w-10 h-10 bg-[#c65d21] rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                2
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold mb-2 text-white text-left">Discover Your Values</h3>
                <p className="text-gray-300 text-left">Identify your core values and anti-values. Learn what you stand for and what you actively avoid.</p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="w-10 h-10 bg-[#c65d21] rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                3
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold mb-2 text-white text-left">Craft Your Voice</h3>
                <p className="text-gray-300 text-left">Define how you want to sound, what phrases feel natural to you, and what communication styles don't fit.</p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="w-10 h-10 bg-[#c65d21] rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                4
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold mb-2 text-white text-left">Get Your Guide</h3>
                <p className="text-gray-300 text-left">Receive your personalized communication guide as a PDF, ready to reference in all your future communications.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="px-4 py-20 bg-[#1a1a1a]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#385f8e]">
            Ready to Define Your Voice?
          </h2>
          <p className="text-lg text-gray-300 mb-10">
            Join thousands of professionals who have clarified their communication and amplified their impact.
          </p>
          
          <Button
            onClick={onStartForm}
            size="lg"
            className="bg-gradient-to-r from-[#c65d21] to-[#e67e22] hover:from-[#a04b18] hover:to-[#c65d21] text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <FileText className="w-5 h-5 mr-2" />
            Start Building Your Guide
          </Button>
        </div>
      </section>
      {/* Footer */}
      <footer className="px-4 py-8 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <FileText className="w-6 h-6 text-[#385f8e]" />
            <span className="text-lg font-bold text-white">Communication Guide</span>
          </div>
          <p className="text-gray-400">
            © 2024 Communication Guide. Built with care to help you find your voice.
          </p>
        </div>
      </footer>
      <AuthDialog 
        isOpen={showAuthDialog} 
        onClose={() => setShowAuthDialog(false)}
      />
    </div>
  );
};

export default LandingPage;
