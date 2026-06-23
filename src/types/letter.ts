export type LetterStatus = "pending" | "approved" | "rejected";

export interface Letter {
  id: string | number;
  status: LetterStatus;
  title: string;
  message: string;
  university: string;
  date: string;
  letterType: string;
  hasAttachment?: boolean;
}
