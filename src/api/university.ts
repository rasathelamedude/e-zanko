import axios from "../lib/axios";
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

  const universities: University[] = data.data;

  return universities;
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

export async function getUniversityById(id: number): Promise<University> {
  const response = await axios.get(`/api/universities/${id}`);
  const { success, message, data } = response.data;
  if (!success) throw new Error(message || "University not found");
  return data;
}

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
