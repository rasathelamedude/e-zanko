import type { Letter } from "../types/letter";
import axios from "../lib/axios";
import type { GetUserLettersResponse } from "../types/letter";

export const mockLetters: Letter[] = [
  {
    id: 1,
    letter_number: "a1b2c3d4-e5f6-7890-1234-56789abcdef0",
    original_sender_id: 101,
    sender_id: 101,
    receiver_id: 201,
    type: "fire_teacher",
    title: "Open College of Data Science",
    body: "We request approval to establish a new College of Data Science for the 2026–2027 intake, with three founding departments and an initial cohort of 240 students.",
    is_read: false,
    academic_year: "2026/2027",
    is_archived: false,
    status: "pending",
    verification_hash: "hash_1",
    created_at: "2026-06-16T09:00:00.000000Z",
    updated_at: "2026-06-16T09:00:00.000000Z",
    sender: { id: 101, name: "Dr. Amina Barzani" },
    receiver: { id: 201, name: "Prof. Darya Salih" },
    university: "University of Sulaimani",
    letterType: "inbox",
    date: "16 Jun 2026",
    message:
      "We request approval to establish a new College of Data Science for the 2026–2027 intake, with three founding departments and an initial cohort of 240 students.",
  },
  {
    id: 2,
    letter_number: "b2c3d4e5-f6a7-8901-2345-6789abcdef01",
    original_sender_id: 102,
    sender_id: 102,
    receiver_id: 202,
    type: "close_college",
    title: "Close College of Fine Arts",
    body: "We request approval to close the College of Fine Arts due to low enrollment.",
    is_read: false,
    academic_year: "2026/2027",
    is_archived: false,
    status: "pending",
    verification_hash: "hash_2",
    created_at: "2026-06-15T10:15:00.000000Z",
    updated_at: "2026-06-15T10:15:00.000000Z",
    sender: { id: 102, name: "Dr. Layla Omar" },
    receiver: { id: 202, name: "Dr. Hasan Qasim" },
    university: "Salahaddin University",
    letterType: "outbox",
    date: "15 Jun 2026",
    message:
      "We request approval to close the College of Fine Arts due to low enrollment.",
  },
  {
    id: 3,
    letter_number: "c3d4e5f6-a7b8-9012-3456-789abcdef012",
    original_sender_id: 103,
    sender_id: 103,
    receiver_id: 203,
    type: "open_college",
    title: "Open College of Nursing",
    body: "We request approval to open a new College of Nursing.",
    is_read: true,
    academic_year: "2026/2027",
    is_archived: true,
    status: "approved",
    verification_hash: "hash_3",
    created_at: "2026-06-14T08:30:00.000000Z",
    updated_at: "2026-06-14T08:30:00.000000Z",
    sender: { id: 103, name: "Dr. Nizar Karim" },
    receiver: { id: 203, name: "Prof. Rezan Aziz" },
    university: "University of Duhok",
    letterType: "archived",
    date: "14 Jun 2026",
    message: "We request approval to open a new College of Nursing.",
  },
];

export const getInboxLettersForUser = async (): Promise<Letter[]> => {
  const response = await axios.get<GetUserLettersResponse>(
    "/api/letters/inbox",
    {
      params: {
        "filter[status]": "pending",
      },
    },
  );

  const { data, success, message } = response.data;

  if (!success) {
    throw new Error(message || "Failed to fetch inbox letters");
  }

  const inboxLetters: Letter[] = data.data;

  return inboxLetters;
};

export const getOutboxLettersForUser = async (): Promise<Letter[]> => {
  const response = await axios.get<GetUserLettersResponse>(
    "/api/letters/outbox",
    {
      params: {
        "filter[status]": "pending",
      },
    },
  );

  const { data, success, message } = response.data;

  if (!success) {
    throw new Error(message || "Failed to fetch outbox letters");
  }

  const outboxLetters: Letter[] = data.data;

  return outboxLetters;
};

export const getLetterById = async (
  id: string,
): Promise<Letter | undefined> => {};
