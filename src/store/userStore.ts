import { create } from "zustand";
import type { User } from "../types/auth";

interface UserStore {
  user: User | null;
  isAuthLoading: boolean;
  setUser: (user: User | null) => void;
  setIsAuthLoading: (isAuthLoading: boolean) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isAuthLoading: false,

  setUser: (user: User | null) => set({ user }),
  setIsAuthLoading: (isAuthLoading: boolean) => set({ isAuthLoading }),
}));
