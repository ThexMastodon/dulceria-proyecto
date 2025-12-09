"use client";

import { createContext, useState, ReactNode, useContext } from 'react';
import { User } from '@/types';
import { useRouter } from 'next/navigation';
import { IAuthService } from '@/interfaces/IAuthService';
import { authService } from '@/services/AuthService';

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  authenticate: (email: string, password: string) => Promise<User>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
  authService?: IAuthService;
}

export function AuthProvider({ children, authService: injectedAuthService = authService } : AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const authenticate = async (email: string, password: string): Promise<User> => {
    const userData = await injectedAuthService.authenticate(email, password);
    return userData;
  };

  const login = (userData: User) => {
    setUser(userData);
    const redirectPath = injectedAuthService.getRedirectPath(userData.role);
    router.push(redirectPath);
  };

  const logout = () => {
    const currentRole = user?.role || '';
    setUser(null);
    const redirectPath = injectedAuthService.getLogoutRedirectPath(currentRole);
    router.push(redirectPath);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, authenticate }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if(context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};