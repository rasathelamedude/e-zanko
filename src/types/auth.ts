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
