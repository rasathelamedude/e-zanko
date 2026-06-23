import type { University } from "../types/hierarchy";

export const getUniversities = async () : Promise<University[]> => {
    return [];
}

export const getUniversityById = async (id: string) => {
    return "University by id"
}

export const deleteUniversity = async (id: string) => {
    return;
}

export const addUniversity = async (data: Omit<University, "id">): Promise<University> => {
  return { ...data, id: "" };
};

export const updateUniversity = async (id: string, data: Partial<University>): Promise<University | undefined> => {
  return undefined;
};