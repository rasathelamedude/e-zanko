export type UserRole =
  | "MINISTRY_ADMIN"
  | "MINISTRY_STAFF"
  | "UNIVERSITY_ADMIN"
  | "UNIVERSITY_STAFF"
  | "DEAN"
  | "DEPARTMENT_HEAD"
  | "LECTURER"
  | "STUDENT";

// The heierarchy
export type UserScope = "MINISTRY" | "UNIVERSITY" | "FACULTY" | "DEPARTMENT";

// Roles
export interface UserRoleEntry {
  id: number;
  name: UserRole;
}

// The heierarchy (scope of a user)
export interface UserScopeEntry {
  user_scope_id: number;
  role_id: number;
  role_name: UserRole;
  scope_type: UserScope;
  scope_id: number | null;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  roles: UserRoleEntry[];
  scopes: UserScopeEntry[];
  role?: UserRole;
  scope?: UserScope;
  isActive?: boolean;
  is2FAEnabled?: boolean;
  created_at: string;
  updated_at: string;
}

/**
 *
 * All API responses share the same structure.
 *
 * They all have a success, message and a data field.
 * Only data field's type changes from one endpoint to another.
 *
 * Therefore we can create a generic type for the data field.
 */
export interface ApiResponse<T = null> {
  success: boolean;
  message: string;
  data: T;
}

export type LoginResponse = ApiResponse<{
  user: User;
  token?: string;
  challenge_token?: string;
}>;
export type LogoutResponse = ApiResponse<null>;
export type ForgotPasswordResponse = ApiResponse<null>;
export type ChangePasswordResponse = ApiResponse<null>;
export type GetProfileResponse = ApiResponse<User>;

export interface LoginPayload {
  email: string;
  password: string;
}
