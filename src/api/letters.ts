import type {
  ComposeLetterPayload,
  ComposeLetterResponse,
  GetUserLettersResponse,
  Letter,
} from "../types/letter";
import axios from "../lib/axios";
import type { BroadcastLetterPayload, Letter } from "../types/letter";
import axios from "../lib/axios";
import type { GetUserLettersResponse } from "../types/letter";
import api from "../lib/axios";

export const getInboxLettersForUser = async (): Promise<Letter[]> => {
  const response = await axios.get<GetUserLettersResponse>(
    "/api/letters/inbox",
    {
      params: {
        filter: {
          status: "pending",
        },
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
        filter: {
          status: "pending",
        },
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

export const getCompletedLettersForUser = async (): Promise<Letter[]> => {
  const response = await axios.get<GetUserLettersResponse>("/api/letters", {
    params: {
      filter: {
        status: ["approved", "rejected"],
      },
    },
  });

  const { data, success, message } = response.data;

  if (!success) {
    throw new Error(message || "Failed to fetch completed letters");
  }

  const completedLetters: Letter[] = data.data;

  return completedLetters;
};

export const composeLetter = async (
  letterPayload: ComposeLetterPayload,
): Promise<Letter> => {
  const response = await axios.post<ComposeLetterResponse>(
    "/api/letters",
    {
      ...letterPayload,
      status: "pending",
    },
  );

  const { data, success, message } = response.data;

  if (!success) {
    throw new Error(message || "Failed to compose letter");
  }

  return data;
};

export const broadcastLetter = async (
  payload: BroadcastLetterPayload,
): Promise<Letter> => {
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("body", payload.body);

  payload.files?.forEach((file) => {
    formData.append("files[]", file);
  });

  const { data } = await api.post("/api/letter-broadcast", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};
