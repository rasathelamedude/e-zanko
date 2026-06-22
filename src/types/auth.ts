export type UserRole = 
    | "MINISTRY_ADMIN" 
    | "UNIVERSITY_PRESIDENT" 
    | "ADMIN" 
    | "DEAN" 
    | "HEAD_OF_DEPARTMENT";

export interface User {
    id: string;
    username: string;
    name: string;
    role: UserRole;
    email: string;
    role: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface LoginResponse {
    user: User;
    token: string;
}

export type HierarchyLevel =
    | "MINISTRY"
    | "MINISTRY_DEPT"
    | "UNIVERSITY"
    | "UNIV_PRESIDENCY_DEPT"
    | "FACULTY"
    | "DEPARTMENT";
