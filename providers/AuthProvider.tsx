"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { authAPI } from "@/utils/api";
import { IUser } from "@/types";
import { toast } from "sonner";

interface AuthContextType {
  user: IUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchUser = async () => {
    try {
      const { data } = await authAPI.getMe();
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const initializeAuth = async () => {
      if (isMounted) {
        await fetchUser();
      }
    };
    initializeAuth();
    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await authAPI.login({ email, password });
    setUser(data.user);
    router.push(data.user.role === "admin" ? "/admin" : "/");
    router.refresh();
    toast.success("Logged in successfully");
  };

  const register = async (name: string, email: string, password: string) => {
    const { data } = await authAPI.register({ name, email, password });
    setUser(data.user);
    router.push("/");
    router.refresh();
    toast.success("Account created successfully");
  };

  const logout = async () => {
    await authAPI.logout();
    setUser(null);
    router.push("/login");
    router.refresh();
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
