export type UserRole =
  | "MINISTRY_ADMIN"
  | "MINISTRY_STAFF"
  | "UNIVERSITY_ADMIN"
  | "UNIVERSITY_STAFF"
  | "DEAN"
  | "HEAD_OF_DEPARTMENT"
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
export type GetProfileResponse = ApiResponse<{ user: User }>;
export type LogoutResponse = ApiResponse<null>;
export type ForgotPasswordResponse = ApiResponse<null>;
export type ResetPasswordResponse = ApiResponse<null>;
export type ChangePasswordResponse = ApiResponse<null>;
export type VerificationResponse = ApiResponse<VerificationData>;

export interface LoginPayload {
  email: string;
  password: string;
}

export interface VerificationParticipant {
  id: number;
  name: string;
}

export interface VerificationFlow {
  id: number;
  letter_id: number;
  action: string;
  actor_id: number;
  from_recipient_id: number;
  to_recipient_id: number | null;
  note?: string | null;
  created_at: string;
}

export interface VerificationSignature {
  id: number;
  letter_id: number;
  user_id: number;
  role_at_time: string;
  created_at: string;
  user: VerificationParticipant;
}

export interface VerificationStamp {
  id: number;
  letter_id: number;
  user_id: number;
  created_at: string;
  user: VerificationParticipant;
}

export interface VerificationData {
  letter_number: string;
  title: string;
  status: string;
  content_verified: boolean;
  created_at: string;
  flows: VerificationFlow[];
  receiver: VerificationParticipant;
  sender: VerificationParticipant;
  signatures: VerificationSignature[];
  stamps: VerificationStamp[];
  letter_uuid: string;
}
