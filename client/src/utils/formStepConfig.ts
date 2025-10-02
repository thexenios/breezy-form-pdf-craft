export const getStepIcon = (step: number): string => {
  switch (step) {
    case 1: return '🎯';
    case 2: return '🚀';
    case 3: return '💫';
    case 4: return '❤️';
    case 5: return '⚡';
    case 6: return '🚫';
    case 7: return '🗣️';
    case 8: return '💬';
    case 9: return '🙅';
    case 10: return '✓';
    default: return '';
  }
};

export const getStepTitle = (step: number) => {
  switch (step) {
    case 1: return "What's your vision?";
    case 2: return "What's your mission?";
    case 3: return "What's your why?";
    case 4: return "What are your core values?";
    case 5: return "How do your values look in action?";
    case 6: return "What are your anti-values?";
    case 7: return "How should your voice feel?";
    case 8: return "What's a phrase that sounds like you?";
    case 9: return "What tone doesn't fit you?";
    case 10: return "Your Personal Communication Guide";
    default: return "";
  }
};

export const getStepDescription = (step: number) => {
  switch (step) {
    case 1: return "What's the change you want to see in the world? Paint a picture of the future you're working toward";
    case 2: return "What actions do you take (or plan to take) every day to bring that vision closer?";
    case 3: return "Why does this matter to you on a deeper, personal level? What drives this work?";
    case 4: return "List 3-5 values that feel non-negotiable in how you live or work";
    case 5: return "Choose one value and describe how you live it. What does it look or sound like?";
    case 6: return "What do you not want to be known for, even if it's trendy or expected? (These oppose your listed values)";
    case 7: return "Pick 2-3 traits that describe how your words should come across (warm, clear, curious, grounded, playful, bold, direct, etc.)";
    case 8: return "Drop in a sentence or saying that feels natural and true to your voice";
    case 9: return "Any language, energy, or communication habits that don't reflect who you are?";
    case 10: return "Review your responses and download your personalized communication guide";
    default: return "";
  }
};

interface StepConfig {
  id: string;
  label: string;
  placeholder: string;
}

export const stepConfigs: Record<number, StepConfig> = {
  1: {
    id: 'vision',
    label: 'Your Vision',
    placeholder: "What's the change you want to see in the world? Paint a picture of the future you're working toward. This is your north star."
  },
  2: {
    id: 'mission',
    label: 'Your Mission',
    placeholder: "What actions do you take (or plan to take) every day to bring that vision closer? These are the concrete steps and behaviors that move you forward."
  },
  3: {
    id: 'why',
    label: 'Your Why',
    placeholder: "Why does this matter to you on a deeper, personal level? What experience, belief, or conviction drives this work? This is your reason for existing."
  },
  4: {
    id: 'values',
    label: 'Your Core Values',
    placeholder: "List 3-5 values that feel non-negotiable in how you live or work. What principles guide your decisions and actions?"
  },
  5: {
    id: 'valuesInAction',
    label: 'Your Values in Action',
    placeholder: "Choose one value and describe how you live it. What does it look or sound like in practice? Give specific examples of how this value shows up in your work or life."
  },
  6: {
    id: 'antiValues',
    label: 'Your Anti-Values',
    placeholder: "What do you not want to be known for, even if it's trendy or expected? These are not always bad, just things that oppose your listed values and don't align with who you are."
  },
  7: {
    id: 'voice',
    label: 'Your Voice',
    placeholder: "How should your voice feel? Pick 2-3 traits that describe how your words should come across (warm, clear, curious, grounded, playful, bold, direct, etc.)."
  },
  8: {
    id: 'phraseSound',
    label: 'A Phrase That Sounds Like You',
    placeholder: "Drop in a sentence or saying that feels natural and true to your voice. What do you find yourself saying often? What phrases come naturally to you?"
  },
  9: {
    id: 'antiVoice',
    label: 'Your Anti-Voice',
    placeholder: "Any language, energy, or communication habits that don't reflect who you are? What tone or style doesn't fit you? (These aren't necessarily bad traits, just not you)"
  }
};
