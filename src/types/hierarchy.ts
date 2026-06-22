export type UniversityStatus = "ACTIVE" | "UNDER_REVIEW" | "INACTIVE";
export type FacultyStatus = "ACTIVE" | "UNDER_REVIEW" | "INACTIVE";
export type DepartmentStatus = "ACTIVE" | "UNDER_REVIEW" | "INACTIVE";

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