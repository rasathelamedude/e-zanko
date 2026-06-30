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
  name: string;
  admin_id: number | null;
  is_active: boolean;
  university_id: number;
  university: {
    id: number;
    name: string;
    admin_id: number | null;
    academic_year: string | null;
    location: string | null;
    start_date: string | null;
    end_date: string | null;
    established_year: string | null;
    is_active: boolean | null;
    created_at: string | null;
    updated_at: string | null;
  };
  created_at: string;
  updated_at: string;
}

export interface Department {
  id: number;
  name: string;
  code: string | null;
  faculty_id: number;
  faculty: {
    id: number;
    name: string;
    admin_id: number | null;
    is_active: boolean | null;
    university_id: number | null;
    created_at: string | null;
    updated_at: string | null;
  };
  created_at: string;
  updated_at: string;
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

export type ListOfFaculties = ApiResponse<{ data: Faculty[] }>;
export type GetAllUniversities = ApiResponse<{ data: University[] }>;
export type ListOfDepartments = ApiResponse<{ data: Department[] }>;

export interface UniversityPayload {
  name: string;
  location: string;
  establishedYear: string;
  isActive: boolean;
}

export interface departmentPayload {
  faculty_id: number;
  name: string;
  is_active: boolean;
}

export interface FacultyPayload {
  name: string;
  admin_id: number | null;
  is_active: boolean;
}
