import { create } from "zustand";
import type { User } from "../types/auth";

interface UserStore {
  user: User | null;
  isAuthLoading: boolean;
  setUser: (user: User | null) => void;
  setIsAuthLoading: (isAuthLoading: boolean) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: {
    id: 1,
    email: "test@institution.edu.krd",
    username: "Test User",
    role: "UNIVERSITY_ADMIN",
    name: "Test User",
    scope: "UNIVERSITY",
    scopeId: 1,
    isActive: true,
    phone: "1234567890",
  },
  isAuthLoading: false,

  setUser: (user: User | null) => set({ user }),
  setIsAuthLoading: (isAuthLoading: boolean) => set({ isAuthLoading }),
}));
