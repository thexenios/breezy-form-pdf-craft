import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, UserCircle, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import aboutImage from '@assets/Get To Know Me_1750386730271.png';

interface AboutProps {
  onBack: () => void;
}

const About = ({ onBack }: AboutProps) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Header - Same as Landing Page */}
      <header className="px-4 py-6 bg-[#1a1a1a] border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <FileText className="w-8 h-8 text-[#c65d21]" />
            <span className="text-xl font-bold">Communication Guide</span>
          </button>
          <div className="flex items-center space-x-2 md:space-x-4">
            <Button
              onClick={onBack}
              variant="ghost"
              className="text-white hover:text-[#c65d21] transition-colors text-sm md:text-base px-3 md:px-4"
            >
              Home
            </Button>
            {user ? (
              <>
                <Button
                  onClick={onBack}
                  variant="outline"
                  className="bg-transparent border-[#c65d21] text-[#c65d21] hover:bg-[#c65d21] hover:text-white transition-colors text-sm md:text-base px-3 md:px-4"
                >
                  <UserCircle className="w-4 h-4 mr-1 md:mr-2" />
                  <span className="hidden sm:inline">My Profile</span>
                  <span className="sm:hidden">Profile</span>
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                className="bg-transparent border-[#c65d21] text-[#c65d21] hover:bg-[#c65d21] hover:text-white transition-colors text-sm md:text-base px-3 md:px-4"
              >
                <span className="hidden sm:inline">Sign Up / Sign In</span>
                <span className="sm:hidden">Sign In</span>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              About Chris
            </h1>
          </div>

          {/* Context Above Image */}
          <div className="text-center mb-8">
            <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">
              This Communication Guide Builder was created to help others discover and articulate their unique voice, 
              just as I've done with my own framework shown below. The tool is designed around the same principles 
              of curiosity, collaboration, and authenticity that guide my own communication approach.
            </p>
          </div>

          {/* Image Container */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/5 rounded-2xl p-4 border border-gray-700 hover:border-[#c65d21]/30 transition-colors">
              <img 
                src={aboutImage} 
                alt="Get to Know Me - Personal communication guide showing North Star, Mission, Why, and Tone with core values like Curiosity, Collaboration, Empathy, Growth, Adaptability, Intentionality, and Authenticity"
                className="w-full max-w-3xl h-auto rounded-xl"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;