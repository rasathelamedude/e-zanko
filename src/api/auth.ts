import type { LoginPayload, LoginResponse } from "../types/auth";

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  if (
    payload.email === "test@institution.edu.krd" &&
    payload.password === "12345"
  ) {
    return {
      user: {
        id: "1",
        email: payload.email,
        username: "Test User",
        role: "MinistryAdmin",
      },
      token: "mock-jwt-token-abc123",
    };
  }

  throw Error("Invalid email or password");
}

export async function getProfile(token: string) {
  // TODO: call GET /api/profile endpoint once it's implemented
  // `token` is stored inside cookies and sent to the backend automatically

  if (token !== "mock-jwt-token-abc123") {
    throw Error("Invalid token loggin out user");
  }

  return {
    id: "1",
    email: "test@institution.edu.krd",
    username: "Test User",
  };
}
