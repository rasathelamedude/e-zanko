import api from "../lib/axios";
import type {
  Department,
  departmentPayload,
  ListOfDepartments,
} from "../types/hierarchy";

export async function getDepartmentByFaculty(
  facultyId: number,
): Promise<Department[]> {
  const response = await api.get<ListOfDepartments>("/api/departments", {
    params: { "filter[faculty_id]": facultyId },
  });

  const { success, message, data } = response.data;

  if (!success) {
    throw new Error(message || "No department is returned!");
  }

  return data.data;
}

export async function addDepartment(
  payload: departmentPayload,
): Promise<Department> {
  const response = await api.post(`/api/departments`, payload);

  const { success, message, data } = response.data;

  if (!success) {
    throw new Error(message || "Couldn't add department");
  }

  return data;
}

export async function getDepartmentById(id: number): Promise<Department> {
  const response = await api.get(`/api/departments/${id}`);
  const { success, message, data } = response.data;
  if (!success) throw new Error(message || "Department not found");
  return data;
}

export async function deleteDepartment(id: number) {
  const response = await api.delete(`/api/departments/${id}`);

  const { success, message } = response.data;

  if (!success) {
    throw new Error(message || "Couldn't delete department");
  }
}

export async function updateDepartment(
  id: number,
  payload: departmentPayload,
): Promise<Department> {
  const response = await api.patch(`/api/departments/${id}`, payload);

  const { success, message, data } = response.data;

  if (!success) throw new Error(message || "Couldn't update department");

  return data;
}