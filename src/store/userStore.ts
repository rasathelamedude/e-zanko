import { create } from "zustand";
import type { User } from "../types/auth";

const SESSION_STORAGE_KEYS = {
  user: "auth_user",
  token: "auth_token",
};

const getStoredUser = (): User | null => {
  if (typeof window === "undefined") return null;

  const storedUser = window.sessionStorage.getItem(SESSION_STORAGE_KEYS.user);
  return storedUser ? (JSON.parse(storedUser) as User) : null;
};

const getStoredToken = (): string | null => {
  if (typeof window === "undefined") return null;

  return window.sessionStorage.getItem(SESSION_STORAGE_KEYS.token);
};

interface UserStore {
  user: User | null;
  token: string | null;
  isAuthLoading: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setIsAuthLoading: (isAuthLoading: boolean) => void;
  clearAuth: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: getStoredUser(),
  token: getStoredToken(),
  isAuthLoading: false,

  setUser: (user: User | null) => {
    if (typeof window !== "undefined") {
      if (user) {
        window.sessionStorage.setItem(
          SESSION_STORAGE_KEYS.user,
          JSON.stringify(user),
        );
      } else {
        window.sessionStorage.removeItem(SESSION_STORAGE_KEYS.user);
      }
    }

    set({ user });
  },

  setToken: (token: string | null) => {
    if (typeof window !== "undefined") {
      if (token) {
        window.sessionStorage.setItem(SESSION_STORAGE_KEYS.token, token);
      } else {
        window.sessionStorage.removeItem(SESSION_STORAGE_KEYS.token);
      }
    }

    set({ token });
  },

  setIsAuthLoading: (isAuthLoading: boolean) => set({ isAuthLoading }),

  clearAuth: () => {
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(SESSION_STORAGE_KEYS.user);
      window.sessionStorage.removeItem(SESSION_STORAGE_KEYS.token);
    }

    set({ user: null, token: null, isAuthLoading: false });
  },
}));
