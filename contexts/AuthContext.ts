import { TUser } from "@/types";
import { createContext } from "react";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  user: TUser | null,
  isAuthenticated: boolean;
  isLoading: boolean;
  storeData: (accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => Promise<void>;
  refetchUserInfo: (userInfo?: TUser) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);


