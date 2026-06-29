import type {
  ForgotPasswordResponse,
  LoginPayload,
  LoginResponse,
  LogoutResponse,
  User,
} from "../types/auth";
import axios from "../lib/axios";

export type LoginResult =
  | { requires2FA: false; user: User }
  | { requires2FA: true; challenge_token: string };

export async function login(payload: LoginPayload): Promise<LoginResult> {
  const response = await axios.post<LoginResponse>("/api/auth/login", payload);

  const { data, success, message } = response.data;

  if (!success) {
    throw new Error(message || "Login failed");
  }

  // 202 → 2FA required, backend sends challenge_token instead of user
  if (response.status === 202) {
    return { requires2FA: true, challenge_token: data.challenge_token! };
  }

  // 200 → logged in normally
  return { requires2FA: false, user: data.user };
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
  // const response = await axios.get<GetProfileResponse>("/api/auth/me");
  // const { data, success, message } = response.data;
  // if (!success) throw new Error(message || "Profile fetch failed");
  // return data;

  return {
    id: 1,
    email: "test@institution.edu.krd",
    name: "Test User",
    role: "DEPARTMENT_HEAD",
    scope: "DEPARTMENT",
    scopeId: 1,
    isActive: true,
    phone: "1234567890",
    is2FAEnabled: false,
  };
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

// Tell backend to send the OTP code to the user's email
export async function prepare2FA(): Promise<void> {
  const response = await axios.post("/api/auth/prepare");

  const { success, message } = response.data;

  if (!success) {
    throw new Error(message || "Failed to send code");
  }
}

// Enable 2FA — returns updated user after successful verification
export async function enable2FA(code: string): Promise<User> {
  const response = await axios.post("/api/auth/two-factor/enable", { code });

  const { data, success, message } = response.data;

  if (!success) {
    throw new Error(message || "Failed to enable two-factor authentication");
  }

  return data;
}

// Disable 2FA — returns updated user after successful verification
export async function disable2FA(code: string): Promise<User> {
  const response = await axios.post("/api/auth/two-factor/disable", { code });

  const { data, success, message } = response.data;

  if (!success) {
    throw new Error(message || "Failed to disable two-factor authentication");
  }

  return data;
}

// Complete 2FA login — returns user + sets session
export async function login2FA(
  code: string,
  challenge_token: string,
): Promise<User> {
  const response = await axios.post("/api/auth/verify", {
    code,
    challenge_token,
  });

  const { data, success, message } = response.data;

  if (!success) {
    throw new Error(message || "Verification failed");
  }

  return data;
}
