import type { LoginPayload, LoginResponse } from "../types/auth";

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  if (
    payload.email === "test@institution.edu.krd" &&
    payload.password === "12345"
  ) {
    return {
      user: { id: "1", email: payload.email, username: "Test User" },
      token: "mock-jwt-token-abc123",
    };
  }

  throw Error("Invalid email or password");
}
