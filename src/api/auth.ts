import type {
  LoginPayload,
  LoginResponse,
  LogoutResponse,
  User,
} from "../types/auth";
import axios from "../lib/axios";

export async function login(payload: LoginPayload): Promise<User> {
  const response = await axios.post<LoginResponse>("/api/auth/login", payload);

  const { data, success, message } = response.data;

  if (!success) {
    throw new Error(message || "Login failed");
  }

  return data;
}

export async function logout(): Promise<string> {
  const response = await axios.post<LogoutResponse>("/api/auth/logout");

  const { success, message } = response.data;

  if (!success) {
    throw new Error(message || "Logout failed");
  }

  return message;
}

export async function getProfile(token: string): Promise<User> {
  // TODO: call GET /api/profile endpoint once it's implemented
  // `token` is stored inside cookies and sent to the backend automatically

  if (token !== "mock-jwt-token-abc123") {
    throw Error("Invalid token loggin out user");
  }

  return {
    id: 1,
    email: "test@institution.edu.krd",
    name: "Test User",
    phone: "1234567890",
    role: "MINISTRY_ADMIN",
    scope: "MINISTRY",
    scopeId: 1,
    isActive: true,
  };
}
