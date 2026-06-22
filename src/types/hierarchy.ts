export type UniversityStatus = "ACTIVE" | "UNDER_REVIEW" | "INACTIVE";
export type FacultyStatus = "ACTIVE" | "UNDER_REVIEW" | "INACTIVE";
export type DepartmentStatus = "ACTIVE" | "UNDER_REVIEW" | "INACTIVE";
export type CourseStatus = "ACTIVE" | "INACTIVE";

export interface University{
    id: string;
    name: string;
    president: string;
    status: string;
}
export interface Faculty{
    id: string;
    name: string;
    dean: string;
    status: string;
}
export interface Department{
    id: string;
    name: string;
    headOfDepartment: string;
    status: string;
}
export interface Course{
    id: string;
    code: string;
    name: string;
    department: string;
    lecturer: string;
    yearLevel: number;
    isActive: boolean;
}