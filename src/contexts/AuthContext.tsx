import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';

interface StoredUser extends User {
  password: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const USERS_KEY = 'inventopro_users';
const SESSION_KEY = 'inventopro_session';

function getStoredUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch {
    return [];
  }
}

// Lecture synchrone de la session au démarrage — évite tout flash/blanc
function getInitialUser(): User | null {
  try {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // Initialisation synchrone : pas de isLoading=true inutile
  const [user, setUser] = useState<User | null>(getInitialUser);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Vérification de cohérence au montage (session corrompue, etc.)
    try {
      const session = localStorage.getItem(SESSION_KEY);
      const parsed = session ? JSON.parse(session) : null;
      if (JSON.stringify(parsed) !== JSON.stringify(user)) {
        setUser(parsed);
      }
    } catch {
      localStorage.removeItem(SESSION_KEY);
      setUser(null);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const users = getStoredUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) {
      return { success: false, error: 'Email ou mot de passe incorrect.' };
    }
    const { password: _pwd, ...safeUser } = found;
    setUser(safeUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser));
    return { success: true };
  };

  const register = async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> => {
    const users = getStoredUsers();
    if (users.find((u) => u.email === email)) {
      return { success: false, error: 'Cet email est déjà utilisé.' };
    }
    const newUser: StoredUser = {
      id: crypto.randomUUID(),
      email,
      password,
      name,
      createdAt: new Date().toISOString(),
      plan: 'starter',
    };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    const { password: _pwd, ...safeUser } = newUser;
    setUser(safeUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  const forgotPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    const users = getStoredUsers();
    if (!users.find((u) => u.email === email)) {
      return { success: false, error: 'Aucun compte associé à cet email.' };
    }
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, forgotPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
