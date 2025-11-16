"use client";

import { AuthContext } from "@/contexts/AuthContext";
import axiosInstance from "@/lib/axios";
import { TUser } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const router = useRouter();

  // Load tokens and user on first render
  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");
    const userInfo = localStorage.getItem("user");

    if (userInfo && storedAccessToken && storedRefreshToken) {
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
      setUser(JSON.parse(userInfo));
      setIsLoading(false);
    }
    if (!userInfo && storedAccessToken) {
      fetchProfile();
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.get("/users/me");
      // console.log(data);
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // store data to localStorage
  const storeData = async (accessToken: string, refreshToken: string) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);

    localStorage.setItem("accessToken", refreshToken);
    localStorage.setItem("refreshToken", refreshToken);

    fetchProfile()
  };

  const refetchUserInfo = (userInfo?: TUser) => {
    if (userInfo) {
      setUser(userInfo);
      localStorage.setItem("user", JSON.stringify(userInfo));
    } else {
      fetchProfile();
    }
  };

  // Logout
  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        isAuthenticated: !!accessToken,
        user,
        isLoading,
        storeData,
        refetchUserInfo,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
