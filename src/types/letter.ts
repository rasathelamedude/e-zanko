import type { ApiResponse } from "./auth";

export type LetterStatus = "pending" | "approved" | "rejected";

export type LetterActionType =
  | "hire_teacher"
  | "fire_teacher"
  | "create_department"
  | "close_department"
  | "open_faculty"
  | "close_faculty";

export interface LetterActionOption {
  value: LetterActionType;
  label: string;
}

export interface LetterPayloadValues {
  [key: string]: string | number | null | undefined;
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  department_id?: string | number | null;
  title?: string;
  speciality?: string;
  faculty_id?: string;
  head_name?: string;
  code?: string;
  reason?: string;
  dean_name?: string;
  university_id?: string;
}

export interface ComposeLetterPayload {
  type: string;
  original_sender_id: number;
  title: string;
  body: string;
  receiver_id: number;
  academic_year_id: number;
  payload?: LetterPayloadValues;
}

export interface LetterParticipant {
  id: number;
  name: string;
}

export interface LetterReceiver {
  user_id: number;
  name: string;
  role: string;
}

export interface Letter {
  id: string | number;
  letter_number: string;
  original_sender_id: number;
  sender_id: number;
  receiver_id: number;
  type: string;
  title: string;
  body: string;
  is_read: boolean;
  academic_year_id: number | null;
  is_archived: boolean;
  status: LetterStatus;
  verification_hash: string;
  qr_code_path: string;
  created_at: string;
  updated_at: string;
  sender: LetterParticipant;
  receiver: LetterParticipant;
  // legacy UI fields retained for compatibility with existing components
  message?: string;
  university?: string;
  date?: string;
  letterType?: string;
  hasAttachment?: boolean;
}

export type GetUserLettersResponse = ApiResponse<{ data: Letter[] }>;
export type ComposeLetterResponse = ApiResponse<Letter>;
export type GetReceiversResopnse = ApiResponse<LetterReceiver[]>;
