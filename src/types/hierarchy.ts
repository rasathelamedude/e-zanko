export type UniversityStatus = "ACTIVE" | "UNDER_REVIEW" | "INACTIVE";
export type FacultyStatus = "ACTIVE" | "UNDER_REVIEW" | "INACTIVE";
export type DepartmentStatus = "ACTIVE" | "UNDER_REVIEW" | "INACTIVE";
export type CourseStatus = "ACTIVE" | "INACTIVE";

export interface University {
  id: number;
  name: string;
  adminId: number | null;
  academicYear: string | null;
  location: string;
  startDate: string | null; // ISO Date String (YYYY-MM-DD)
  endDate: string | null; // ISO Date String (YYYY-MM-DD)
  establishedYear: string; // Explicitly required in Laravel schema
  isActive: boolean;
  createdAt: string; // ISO 8601 Timestamp
  updatedAt: string; // ISO 8601 Timestamp
  deletedAt: string | null;

  // Derived / UI Fields (Populated server-side)
  status: "ACTIVE" | "INACTIVE";
  president?: string;
}

export interface Faculty {
  id: number;
  universityId: number;
  name: string;
  adminId: number | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;

  // Derived / UI Fields (Populated server-side)
  dean: string;
  status: "ACTIVE" | "INACTIVE";
}

export interface Department {
  id: number;
  facultyId: number;
  name: string;
  adminId: number | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;

  // Derived / UI Fields (Populated server-side)
  status: DepartmentStatus;
  headOfDepartment?: string;
}

export interface Course {
  // Database Columns
  id: number;
  departmentId: number;
  code: string;
  name: string;
  creditHours: number;
  yearLevel: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;

  // Derived / UI Fields (Populated server-side)
  status?: CourseStatus;
  department?: string;
  lecturer?: string;
}

export interface ApiResponse<T = null> {
  success: boolean;
  message: string;
  data: T;
}

export type GetAllUniversities = ApiResponse<University[]>;
export type ListOfFaculties = ApiResponse<Faculty[]>;

export interface UniversityPayload{
  name: string;
  location: string;
  establishedYear: string;
  isActive: boolean;
}

export interface FacultyPayload{
  name: string;
}