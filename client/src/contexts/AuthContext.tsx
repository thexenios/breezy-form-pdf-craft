import React, { createContext, useContext, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // For demo purposes, we'll simulate a logged-in user
  const [user] = useState<User | null>({ id: 'demo-user-id', email: 'demo@example.com' });
  const [loading] = useState(false);
  const { toast } = useToast();

  const signUp = async (email: string, password: string) => {
    toast({
      title: "Feature not implemented",
      description: "Authentication will be implemented in a future update.",
    });
    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    toast({
      title: "Feature not implemented", 
      description: "Authentication will be implemented in a future update.",
    });
    return { error: null };
  };

  const signOut = async () => {
    toast({
      title: "Feature not implemented",
      description: "Authentication will be implemented in a future update.",
    });
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};