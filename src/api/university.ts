import type { University, GetUniversitiesResponse } from "../types/hierarchy";
import axios from "../lib/axios";

export const getUniversities = async (): Promise<University[]> => {
  const response =
    await axios.get<GetUniversitiesResponse>("/api/universities");

  const { data, success, message } = response.data;

  if (!success) {
    throw new Error(message || "Universities fetch failed");
  }

  return data;
};

export const getUniversityById = async (id: string) => {
  return "University by id";
};

export const deleteUniversity = async (id: string) => {
  return;
};

export const addUniversity = async (
  data: Omit<University, "id">,
): Promise<University> => {
  return { ...data, id: "" };
};

export const updateUniversity = async (
  id: string,
  data: Partial<University>,
): Promise<University | undefined> => {
  return undefined;
};
