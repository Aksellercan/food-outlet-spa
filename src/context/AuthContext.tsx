import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  user: { username: string; role: string } | null;
  login: (username: string, password: string) => boolean;
  register: (username: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);

  const login = (username: string, password: string) => {
    if (localStorage.getItem(username) === password) {
      setUser({ username, role: "User" });
      return true;
    }
    return false;
  };

  const register = (username: string, password: string) => {
    localStorage.setItem(username, password);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
