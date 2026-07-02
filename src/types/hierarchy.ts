export type UniversityStatus = "ACTIVE" | "INACTIVE";
export type FacultyStatus = "ACTIVE" | "INACTIVE";
export type DepartmentStatus = "ACTIVE" | "INACTIVE";
export type CourseStatus = "ACTIVE" | "INACTIVE";

export interface University {
  id: number;
  name: string;
  admin: {
    id: number | null;
    name: string;
  };
  academic_year: string | null;
  location: string;
  start_date: string | null; // ISO Date String (YYYY-MM-DD)
  end_date: string | null; // ISO Date String (YYYY-MM-DD)
  established_year: string; // Explicitly required in Laravel schema
  is_active: number; // 0 | 1
  created_at: string; // ISO 8601 Timestamp
  updated_at: string; // ISO 8601 Timestamp
  deleted_at?: string | null;

  // Derived / UI Fields (Populated server-side)
  status?: "ACTIVE" | "INACTIVE";
  president?: string;
}

export interface Faculty {
  id: number;
  name: string;
  admin_id: number | null;
  is_active: boolean;
  university_id: number;
  created_at: string;
  updated_at: string;

  university?: University;
}

export interface Department {
  id: number;
  name: string;
  code: string | null;
  faculty_id: number;
  created_at: string;
  updated_at: string;

  faculty?: Faculty;
}

export interface Course {
  // Database Columns
  id: number;
  name: string;
  code: string;
  credit_hours: number;
  year_level: number;
  is_active: number; // 0 | 1, not boolean
  department_id: number;
  created_at: string;
  updated_at: string;

  // Relations (populated server-side)
  department?: Department;
}

export interface ApiResponse<T = null> {
  success: boolean;
  message: string;
  data: T;
}

export type ListOfFaculties = ApiResponse<{ data: Faculty[] }>;
export type GetAllUniversities = ApiResponse<{ data: University[] }>;
export type ListOfDepartments = ApiResponse<{ data: Department[] }>;
export type ListOfCourses = ApiResponse<{ data: Course[] }>;

export interface UniversityPayload {
  name: string;
  location: string;
  establishedYear: string;
  isActive: boolean;
}

export interface DepartmentPayload {
  faculty_id: number;
  name: string;
  is_active: boolean;
}

export interface FacultyPayload {
  name: string;
  admin_id: number | null;
  is_active: boolean;
}

export interface CoursePayload {
  department_id: number;
  name: string;
  code: string;
  credit_hours: number | null;
  year_level: number | null;
  is_active: boolean;
}
