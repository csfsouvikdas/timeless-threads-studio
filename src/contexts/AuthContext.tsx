import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Mock users
const mockUsers: (User & { password: string })[] = [
  { id: "admin-1", name: "Admin", email: "admin@timelessthreads.com", role: "admin", password: "admin123" },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("tt_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [users, setUsers] = useState(mockUsers);

  const login = (email: string, password: string): boolean => {
    const found = users.find((u) => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...userData } = found;
      setUser(userData);
      localStorage.setItem("tt_user", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, password: string): boolean => {
    if (users.find((u) => u.email === email)) return false;
    const newUser: User & { password: string } = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: "customer",
      password,
    };
    setUsers((prev) => [...prev, newUser]);
    const { password: _, ...userData } = newUser;
    setUser(userData);
    localStorage.setItem("tt_user", JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("tt_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAdmin: user?.role === "admin" }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
