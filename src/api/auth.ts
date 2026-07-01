import type {
  ChangePasswordResponse,
  ForgotPasswordResponse,
  GetProfileResponse,
  LoginPayload,
  LoginResponse,
  LogoutResponse,
  ResetPasswordResponse,
  User,
  VerificationResponse,
  VerificationData,
} from "../types/auth";
import axios from "../lib/axios";

export type LoginResult =
  | { requires2FA: false; user: User; token: string | null }
  | { requires2FA: true; challenge_token: string };

export interface OTPVerificationResult {
  user: User;
  token: string | null;
}

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
  return { requires2FA: false, user: data.user, token: data.token ?? null };
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

  if (!success) throw new Error(message || "Profile fetch failed");

  const user: User = data.user!;

  return user;
}

// Ask the backend to email a reset link to the user. Returns the success
// message so the caller can confirm to the user that the email was sent.
export async function forgetPassword(email: string): Promise<string> {
  const response = await axios.post<ForgotPasswordResponse>(
    "/api/auth/forget-password",
    { email },
  );

  const { success, message } = response.data;

  if (!success) {
    throw new Error(message || "Failed to send reset link");
  }

  return message;
}

// Set a new password using the token + email from the reset link.
// token and email travel as query params; the passwords go in the body.
export async function resetPassword({
  token,
  email,
  password,
  confirmPassword,
}: {
  token: string;
  email: string;
  password: string;
  confirmPassword: string;
}): Promise<string> {
  const response = await axios.post<ResetPasswordResponse>(
    "/api/auth/reset-password",
    { password, confirm_password: confirmPassword },
    { params: { token, email } },
  );

  const { success, message } = response.data;

  if (!success) {
    throw new Error(message || "Password reset failed");
  }

  return message;
}

export async function changePassword(payload: {
  currentPassword: string;
  newPassword: string;
}): Promise<void> {
  const response = await axios.post<ChangePasswordResponse>(
    "/api/auth/change-password",
    {
      current_password: payload.currentPassword,
      password: payload.newPassword,
    },
  );

  const { success, message } = response.data;

  if (!success) {
    throw new Error(message || "Password change failed");
  }
}

// Tell backend to send the OTP code to the user's email
export async function prepare2FA(): Promise<void> {
  const response = await axios.post("/api/auth/two-factor/prepare");

  const { success, message } = response.data;

  if (!success) {
    throw new Error(message || "Failed to send code");
  }
}

// Enable 2FA — backend only returns { success, message }; returns the message.
export async function enable2FA(otp: string): Promise<string> {
  const response = await axios.post("/api/auth/two-factor/enable", { otp });

  const { success, message } = response.data;

  if (!success) {
    throw new Error(message || "Failed to enable two-factor authentication");
  }

  return message;
}

// Disable 2FA — backend only returns { success, message }; returns the message.
export async function disable2FA(otp: string): Promise<string> {
  const response = await axios.post("/api/auth/two-factor/disable", { otp });

  const { success, message } = response.data;

  if (!success) {
    throw new Error(message || "Failed to disable two-factor authentication");
  }

  return message;
}

// Complete 2FA login — returns user and optional auth token
export async function login2FA(
  code: string,
  challenge_token: string,
): Promise<OTPVerificationResult> {
  const response = await axios.post("/api/auth/verify", {
    code,
    challenge_token,
  });

  const { data, success, message } = response.data;

  if (!success) {
    throw new Error(message || "Verification failed");
  }

  return {
    user: data.user,
    token: data.token ?? null,
  };
}

export async function fetchVerificationData(
  documentUUID: string,
): Promise<VerificationData> {
  const response = await axios.get<VerificationResponse>(
    `/api/verify/${documentUUID}`,
  );

  const { data, success, message } = response.data;

  if (!success) {
    throw new Error(message || "Failed to fetch verification data");
  }

  return data;
}
