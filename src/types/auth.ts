export interface User {
    id: string;
    username: string;
    name: string;
    role: string;
    email: string;
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
