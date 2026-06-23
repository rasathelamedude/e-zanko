import type { Letter } from "../types/letter";

export const mockLetters: Letter[] = [
  {
    id: 1,
    status: "pending",
    title: "Open College of Data Science",
    university: "University of Sulaimani",
    letterType: "inbox",
    date: "16 Jun 2026",
    message:
      "We request approval to establish a new College of Data Science for the 2026–2027 intake, with three founding departments and an initial cohort of 240 students.",
  },
  {
    id: 2,
    status: "pending",
    title: "Close College of Fine Arts",
    university: "Salahaddin University",
    letterType: "outbox",
    date: "15 Jun 2026",
    message:
      "We request approval to close the College of Fine Arts due to low enrollment.",
  },
  {
    id: 3,
    status: "approved",
    title: "Open College of Nursing",
    university: "University of Duhok",
    letterType: "archived",
    date: "14 Jun 2026",
    message: "We request approval to open a new College of Nursing.",
  },
];


export const getLetters = async () : Promise<Letter[]> => {
    return mockLetters;
}

export const getLetterById = async (id: string): Promise<Letter | undefined> => {
  return mockLetters.find((l) => l.id === id);
};
