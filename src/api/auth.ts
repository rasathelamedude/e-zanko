import {
  type ChangePasswordResponse,
  type ForgotPasswordResponse,
  type LoginPayload,
  type LoginResponse,
  type LogoutResponse,
  type User,
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

export async function getProfile(): Promise<User> {
  const response = await axios.get<GetProfileResponse>("/api/auth/me");

  const { data, success, message } = response.data;

  if (!success) {
    throw new Error(message || "Profile fetch failed");
  }

  return data;
}

export async function forgetPassword(email: string): Promise<void> {
  const response = await axios.post<ForgotPasswordResponse>(
    "/api/auth/forget-password",
    { email },
  );

  const { success, message } = response.data;

  if (!success) {
    throw new Error(message || "Password reset failed");
  }
}

export async function resetPassword({
  token,
  code,
  password,
}: {
  token: string;
  code: string;
  password: string;
}): Promise<void> {
  const response = await axios.post("/api/auth/reset-password", {
    token,
    code,
    password,
  });

  const { success, message } = response.data;

  if (!success) {
    throw new Error(message || "Password reset failed");
  }
}

export async function changePassword(payload: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}): Promise<void> {
  const response = await axios.post<ChangePasswordResponse>(
    "/api/auth/change-password",
    payload,
  );

  const { success, message } = response.data;

  if (!success) {
    throw new Error(message || "Password change failed");
  }
}
