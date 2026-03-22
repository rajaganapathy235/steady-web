import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type Role = 'admin' | 'client';

interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  client_id?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const MOCK_USERS: Record<string, User & { password: string }> = {
  'admin@waasflow.in': { id: 'u1', email: 'admin@waasflow.in', name: 'Admin', role: 'admin', password: 'admin123' },
  'sharma@client.com': { id: 'u2', email: 'sharma@client.com', name: 'Sharma Electronics', role: 'client', client_id: '1', password: 'client123' },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('waas_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback(async (email: string, password: string) => {
    // TODO: Replace with PocketBase auth
    const mockUser = MOCK_USERS[email];
    if (!mockUser || mockUser.password !== password) {
      throw new Error('Invalid credentials');
    }
    const { password: _, ...userData } = mockUser;
    setUser(userData);
    localStorage.setItem('waas_user', JSON.stringify(userData));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('waas_user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
