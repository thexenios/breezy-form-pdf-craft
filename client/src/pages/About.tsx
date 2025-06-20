import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import aboutImage from '@assets/Get To Know Me_1750386730271.png';

interface AboutProps {
  onBack: () => void;
}

const About = ({ onBack }: AboutProps) => {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Header */}
      <header className="px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <Button
            onClick={onBack}
            variant="outline"
            className="bg-transparent border-[#c65d21] text-[#c65d21] hover:bg-[#c65d21] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              About the Creator
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Get to know the person behind the Communication Guide Builder
            </p>
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