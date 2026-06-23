export type UserRole =
  | "MINISTRY_ADMIN"
  | "MINISTRY_STAFF"
  | "UNIVERSITY_ADMIN"
  | "UNIVERSITY_STAFF"
  | "DEAN"
  | "DEPARTMENT_HEAD";

// The heierarchy
export type UserScope = "MINISTRY" | "UNIVERSITY" | "FACULTY" | "DEPARTMENT";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  scope: UserScope;
  role: UserRole;
  scope_id: string;
  is_active: boolean;
}

// token is sent via cookies
export interface LoginResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}
