import type { ApiResponse } from "./auth";

export type LetterStatus = "pending" | "approved" | "rejected";

export interface LetterParticipant {
  id: number;
  name: string;
}

export interface BroadcastLetterPayload{
  title: string;
  body: string;
  files?: File[];
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
  academic_year: string | null;
  is_archived: boolean;
  status: LetterStatus;
  verification_hash: string;
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
