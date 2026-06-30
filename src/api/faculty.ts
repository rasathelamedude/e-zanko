import api from "../lib/axios";
import type {
  Faculty,
  FacultyPayload,
  ListOfFaculties,
} from "../types/hierarchy";

export async function getFacultiesByUniversity(
  universityId: number,
): Promise<Faculty[]> {
  const response = await api.get<ListOfFaculties>("/api/faculties", {
    params: { "filter[university_id]": universityId },
  });

  const { success, message, data } = response.data;

  if (!success) {
    throw new Error(message || "No faculty is returned!");
  }

  return data.data;
}

export async function getAllFaculties() {
  const response = await api.get<ListOfFaculties>("/api/faculties");

  const { success, message, data } = response.data;

  if (!success) {
    throw new Error(message || "No faculty is returned!");
  }

  return data.data;
}

export async function addFaculty(
  universityId: number,
  payload: FacultyPayload,
): Promise<Faculty> {
  const response = await api.post(
    `/api/universities/${universityId}/faculties`,
    payload,
  );
  const { success, message, data } = response.data;

  if (!success) {
    throw new Error(message || "Couldn't add faculty");
  }

  return data;
}

export async function getFacultyById(id: number): Promise<Faculty> {
  const response = await api.get(`/api/faculties/${id}`);
  const { success, message, data } = response.data;
  if (!success) throw new Error(message || "Faculty not found");
  return data;
}

export async function deleteFaculty(id: number) {
  const response = await api.delete(`/api/faculties/${id}`);
  const { success, message } = response.data;

  if (!success) {
    throw new Error(message || "Couldn't delete faculty");
  }
}

export async function updateFaculty(
  id: number,
  payload: FacultyPayload,
): Promise<Faculty> {
  const response = await api.patch(`/api/faculties/${id}`, payload);
  const { success, message, data } = response.data;

  if (!success) throw new Error(message || "Couldn't update faculty");

  return data;
}