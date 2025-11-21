"use client";

import { AUTH_KEYS } from "@/constants";
import { AuthContext } from "@/contexts/AuthContext";
import { loginAction, logoutAction } from "@/lib/authActions";
import axiosInstance from "@/lib/axios";
import { TUser } from "@/types";
import axios from "axios";
import { useEffect, useState, type ReactNode } from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  // Load tokens and user on first render
  useEffect(() => {
    const storedAccessToken = localStorage.getItem(AUTH_KEYS.ACCESS_TOKEN);
    const storedRefreshToken = localStorage.getItem(AUTH_KEYS.REFRESH_TOKEN);
    const userInfo = localStorage.getItem(AUTH_KEYS.USER);

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

    localStorage.setItem(AUTH_KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(AUTH_KEYS.REFRESH_TOKEN, refreshToken);

    // await axios.post("/api/auth/set-cookie", { accessToken: accessToken });

    await loginAction(accessToken);

    fetchProfile();
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
  const logout = async () => {
    try {
      // await axios.post("/api/auth/remove-cookie");
      await logoutAction();

      setAccessToken(null);
      setRefreshToken(null);
      setUser(null);

      localStorage.removeItem(AUTH_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(AUTH_KEYS.REFRESH_TOKEN);
      localStorage.removeItem(AUTH_KEYS.USER);
    } catch (error) {
      console.log(error);
    }
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
