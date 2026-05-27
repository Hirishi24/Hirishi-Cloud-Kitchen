import React, { createContext, useContext, useState } from 'react';

export interface User {
  fullName: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (emailOrUsername: string, password: string) => Promise<boolean>;
  register: (fullName: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('hck_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (emailOrUsername: string, _password: string): Promise<boolean> => {
    // Mock login logic
    const mockUser: User = {
      fullName: emailOrUsername.split('@')[0] || "Guest Foodie",
      email: emailOrUsername.includes('@') ? emailOrUsername : `${emailOrUsername}@example.com`,
    };
    setUser(mockUser);
    localStorage.setItem('hck_user', JSON.stringify(mockUser));
    return true;
  };

  const register = async (fullName: string, email: string, _password: string): Promise<boolean> => {
    // Mock registration logic
    const mockUser: User = { fullName, email };
    setUser(mockUser);
    localStorage.setItem('hck_user', JSON.stringify(mockUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hck_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
