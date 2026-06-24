import type { LoginPayload, LoginResponse, User } from "../types/auth";

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  if (
    payload.email === "test@institution.edu.krd" &&
    payload.password === "12345"
  ) {
    return {
      success: true,
      message: "Login successful",
      data: {
        id: 1,
        name: "Test User",
        email: "test@institution.edu.krd",
        phone: "1234567890",
        role: "MINISTRY_ADMIN",
        scope: "MINISTRY",
        scopeId: 123,
        isActive: true,
      },
    };
  }

  throw Error("Invalid email or password");
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
