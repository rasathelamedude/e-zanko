import { type ApiResponse } from "./response";

export type UserRole =
  | "MINISTRY_ADMIN"
  | "MINISTRY_STAFF"
  | "UNIVERSITY_ADMIN"
  | "UNIVERSITY_STAFF"
  | "DEAN"
  | "DEPARTMENT_HEAD"
  | "LECTURER"
  | "STUDENT";

export type EZankoRoles = Omit<UserRole, "STUDENT" | "LECTURER">; 

// The heierarchy
export type UserScope = "MINISTRY" | "UNIVERSITY" | "FACULTY" | "DEPARTMENT";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  scope: UserScope;
  scopeId: number;
  isActive: boolean;
}

export type LoginResponse = ApiResponse<User>;
export type LogoutResponse = ApiResponse<null>;
export type ForgotPasswordResponse = ApiResponse<null>;
export type GetProfileResponse = ApiResponse<User>;

export interface LoginPayload {
  email: string;
  password: string;
}
