import api from "../lib/axios";
import type { ApiResponse, Course, CoursePayload, ListOfCourses } from "../types/hierarchy";

export async function getCourseByDepartment(
  departmentId: number,
): Promise<Course[]> {
  const response = await api.get<ListOfCourses>("/api/courses", {
    params: { "filter[department_id]": departmentId },
  });

  const { success, message, data } = response.data;

  if (!success) {
    throw new Error(message || "No course is returned!");
  }

  return data.data;
}

export async function addCourse(payload: CoursePayload): Promise<Course> {
  const response = await api.post<ApiResponse<Course>>(`/api/courses`, payload);

  const { success, message, data } = response.data;

  if (!success) {
    throw new Error(message || "Couldn't add course");
  }

  return data;
}

export async function getCourseById(id: number): Promise<Course> {
  const response = await api.get<ApiResponse<Course>>(`/api/courses/${id}`);
  const { success, message, data } = response.data;
  if (!success) throw new Error(message || "Course not found");
  return data;
}

export async function deleteCourse(id: number) {
  const response = await api.delete<ApiResponse<null>>(`/api/courses/${id}`);

  const { success, message } = response.data;

  if (!success) {
    throw new Error(message || "Couldn't delete course");
  }
}

export async function updateCourse(
  id: number,
  payload: CoursePayload,
): Promise<Course> {
  const response = await api.patch<ApiResponse<Course>>(`/api/courses/${id}`, payload);

  const { success, message, data } = response.data;

  if (!success) throw new Error(message || "Couldn't update course");

  return data;
}
