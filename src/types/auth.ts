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

export type LoginResponse = ApiResponse<User>;
export type LogoutResponse = ApiResponse<null>;
export type ForgotPasswordResponse = ApiResponse<null>;
export type ChangePasswordResponse = ApiResponse<null>;
export type GetProfileResponse = ApiResponse<User>;


export interface LoginPayload {
  email: string;
  password: string;
}
