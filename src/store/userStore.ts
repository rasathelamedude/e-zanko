import { create } from "zustand";
import type { User } from "../types/auth";

interface UserStore {
  user: User | null;
  token: string | null;
  isAuthLoading: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setIsAuthLoading: (isAuthLoading: boolean) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  token: null,
  isAuthLoading: false,

  setUser: (user: User | null) => set({ user }),
  setToken: (token: string | null) => set({ token }),
  setIsAuthLoading: (isAuthLoading: boolean) => set({ isAuthLoading }),
}));
