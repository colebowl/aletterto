import { useEffect } from "react";

import { Auth } from "@services/api/auth";

import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  isInitialized: boolean;
  initialize: () => void;
  setIsAuthenticated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isInitialized: false,
  initialize: () => {
    const nextAuth = {
      isAuthenticated: ![null, undefined, ""].includes(Auth.getToken()),
      isInitialized: true,
    };

    set(nextAuth);
  },
  setIsAuthenticated: (value: boolean) => ({ isAuthenticated: value }),
}));

export const useAuth = () => {
  const { isAuthenticated, isInitialized, initialize } = useAuthStore();

  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized, initialize]);

  return { isAuthenticated, isInitialized };
};
