export interface RankedPreference {
  rank: number;
  major: string;
  university: string;
}

export type ApplicantStatus = "Pending" | "Placed" | "Rejected";

export interface Applicant {
  id: number;
  name: string;
  initials: string;
  city: string;
  school: string;
  stream: "Scientific" | "Literary";
  choices: number;
  finalGrade: number;
  status: ApplicantStatus;
  rankedPreferences: RankedPreference[];
}