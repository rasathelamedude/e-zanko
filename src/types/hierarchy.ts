export type UniversityStatus = "ACTIVE" | "UNDER_REVIEW" | "INACTIVE";

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