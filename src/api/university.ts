import axios from "axios";
import type {
  GetAllUniversities,
  University,
  UniversityPayload,
} from "../types/hierarchy";

export async function getAllUniversities() {
  const response = await axios.get<GetAllUniversities>("/api/universities");

  const { success, message, data } = response.data;

  if (!success) {
    throw new Error(message || "No university is returned!");
  }

  return data;
}

export async function addUniversity(
  payload: UniversityPayload,
): Promise<University> {
  const response = await axios.post("/api/universities", payload);

  const { success, message, data } = response.data;

  if (!success) {
    throw new Error(message || "Couldn't add university");
  }

  return data;
}

export const getUniversityById = async (id: string) => {
  return "University by id";
};

export const deleteUniversity = async (id: number) => {
  const response = await axios.delete(`/api/universities/${id}`);

  const { success, message } = response.data;

  if (!success) {
    throw new Error(message || "Couldn't delete university");
  }
};

export const updateUniversity = async (
  id: number,
  payload: UniversityPayload,
): Promise<University> => {
  const response = await axios.patch(`/api/universities/${id}`, payload);
  const { success, message, data } = response.data;

  if (!success) throw new Error(message || "Couldn't update university");

  return data;
};
