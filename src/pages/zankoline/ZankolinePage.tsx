import { useTranslation } from "react-i18next";
import PageHeader from "../../components/common/PageHeader";
import { useUserStore } from "../../store/userStore";
import StatCard from "../../components/common/StatCard";
import { Badge } from "../../components/ui/badge";
import { useState } from "react";
import { Pen, Settings } from "lucide-react";
import { Button } from "@base-ui/react";
import type { Applicant } from "../../types/applicants";
import PageTransition from "../../components/common/PageTransition";

export const mockApplicants: Applicant[] = [
  {
    id: 1,
    name: "Lana Hekmat Aziz",
    initials: "LH",
    city: "Sulaymaniyah",
    choices: 50,
    finalGrade: 98.4,
    status: "Pending",
    school: "Shahid Hemn Preparatory",
    stream: "Scientific",
    rankedPreferences: [
      { rank: 1, major: "Medicine", university: "Hawler Medical University" },
      { rank: 2, major: "Medicine", university: "University of Sulaimani" },
      { rank: 3, major: "Medicine", university: "Salahaddin University–Erbil" },
      { rank: 4, major: "Medicine", university: "University of Duhok" },
      { rank: 5, major: "Dentistry", university: "Hawler Medical University" },
      { rank: 6, major: "Dentistry", university: "University of Sulaimani" },
      { rank: 7, major: "Pharmacy", university: "Hawler Medical University" },
      { rank: 8, major: "Pharmacy", university: "University of Sulaimani" },
      { rank: 9, major: "Nursing", university: "Hawler Medical University" },
      {
        rank: 10,
        major: "Computer Science",
        university: "Salahaddin University–Erbil",
      },
    ],
  },
  {
    id: 2,
    name: "Karwan Jamal Salih",
    initials: "KJ",
    city: "Erbil",
    choices: 46,
    finalGrade: 91.7,
    status: "Pending",
    school: "Dara Preparatory School",
    stream: "Scientific",
    rankedPreferences: [
      {
        rank: 1,
        major: "Computer Science",
        university: "Salahaddin University–Erbil",
      },
      {
        rank: 2,
        major: "Software Engineering",
        university: "Salahaddin University–Erbil",
      },
      {
        rank: 3,
        major: "Computer Science",
        university: "University of Sulaimani",
      },
      {
        rank: 4,
        major: "Electrical Engineering",
        university: "Salahaddin University–Erbil",
      },
      { rank: 5, major: "Medicine", university: "Hawler Medical University" },
      { rank: 6, major: "Pharmacy", university: "Hawler Medical University" },
      {
        rank: 7,
        major: "Civil Engineering",
        university: "Salahaddin University–Erbil",
      },
      {
        rank: 8,
        major: "Architecture",
        university: "Salahaddin University–Erbil",
      },
      { rank: 9, major: "Physics", university: "University of Sulaimani" },
      {
        rank: 10,
        major: "Mathematics",
        university: "Salahaddin University–Erbil",
      },
    ],
  },
  {
    id: 3,
    name: "Tara Botan Rashid",
    initials: "TB",
    city: "Duhok",
    choices: 50,
    finalGrade: 88.2,
    status: "Pending",
    school: "Narin Preparatory School",
    stream: "Scientific",
    rankedPreferences: [
      { rank: 1, major: "Medicine", university: "University of Duhok" },
      { rank: 2, major: "Dentistry", university: "University of Duhok" },
      { rank: 3, major: "Pharmacy", university: "University of Duhok" },
      { rank: 4, major: "Nursing", university: "University of Duhok" },
      { rank: 5, major: "Medicine", university: "Hawler Medical University" },
      { rank: 6, major: "Computer Science", university: "University of Duhok" },
      {
        rank: 7,
        major: "Software Engineering",
        university: "Salahaddin University–Erbil",
      },
      {
        rank: 8,
        major: "Civil Engineering",
        university: "University of Duhok",
      },
      {
        rank: 9,
        major: "Architecture",
        university: "Salahaddin University–Erbil",
      },
      { rank: 10, major: "Biology", university: "University of Duhok" },
    ],
  },
  {
    id: 4,
    name: "Hawre Aram Qadir",
    initials: "HA",
    city: "Sulaymaniyah",
    choices: 42,
    finalGrade: 84.6,
    status: "Pending",
    school: "Rozh Preparatory School",
    stream: "Scientific",
    rankedPreferences: [
      {
        rank: 1,
        major: "Electrical Engineering",
        university: "University of Sulaimani",
      },
      {
        rank: 2,
        major: "Computer Science",
        university: "University of Sulaimani",
      },
      {
        rank: 3,
        major: "Software Engineering",
        university: "Salahaddin University–Erbil",
      },
      {
        rank: 4,
        major: "Mechanical Engineering",
        university: "University of Sulaimani",
      },
      {
        rank: 5,
        major: "Civil Engineering",
        university: "University of Sulaimani",
      },
      { rank: 6, major: "Physics", university: "University of Sulaimani" },
      { rank: 7, major: "Mathematics", university: "University of Sulaimani" },
      { rank: 8, major: "Chemistry", university: "University of Sulaimani" },
      { rank: 9, major: "Pharmacy", university: "University of Sulaimani" },
      { rank: 10, major: "Biology", university: "University of Sulaimani" },
    ],
  },
  {
    id: 5,
    name: "Shilan Nawzad Ali",
    initials: "SN",
    city: "Halabja",
    choices: 38,
    finalGrade: 79.1,
    status: "Pending",
    school: "Halabja Preparatory School",
    stream: "Literary",
    rankedPreferences: [
      { rank: 1, major: "Law", university: "University of Sulaimani" },
      {
        rank: 2,
        major: "Administration & Economics",
        university: "University of Sulaimani",
      },
      { rank: 3, major: "Law", university: "Salahaddin University–Erbil" },
      {
        rank: 4,
        major: "Political Science",
        university: "University of Sulaimani",
      },
      { rank: 5, major: "Media", university: "Salahaddin University–Erbil" },
      {
        rank: 6,
        major: "Kurdish Language",
        university: "University of Sulaimani",
      },
      {
        rank: 7,
        major: "Arabic Language",
        university: "University of Sulaimani",
      },
      { rank: 8, major: "History", university: "University of Sulaimani" },
      { rank: 9, major: "Geography", university: "University of Sulaimani" },
      {
        rank: 10,
        major: "Philosophy",
        university: "Salahaddin University–Erbil",
      },
    ],
  },
  {
    id: 6,
    name: "Diyar Sabah Mahmud",
    initials: "DS",
    city: "Koya",
    choices: 33,
    finalGrade: 72.5,
    status: "Pending",
    school: "Koya Preparatory School",
    stream: "Literary",
    rankedPreferences: [
      {
        rank: 1,
        major: "Administration & Economics",
        university: "Salahaddin University–Erbil",
      },
      { rank: 2, major: "Law", university: "Salahaddin University–Erbil" },
      {
        rank: 3,
        major: "Accounting",
        university: "Salahaddin University–Erbil",
      },
      {
        rank: 4,
        major: "Business Administration",
        university: "University of Sulaimani",
      },
      {
        rank: 5,
        major: "Kurdish Language",
        university: "Salahaddin University–Erbil",
      },
      { rank: 6, major: "History", university: "Salahaddin University–Erbil" },
      {
        rank: 7,
        major: "Geography",
        university: "Salahaddin University–Erbil",
      },
      { rank: 8, major: "Media", university: "Salahaddin University–Erbil" },
      {
        rank: 9,
        major: "Islamic Studies",
        university: "Salahaddin University–Erbil",
      },
      {
        rank: 10,
        major: "Arabic Language",
        university: "Salahaddin University–Erbil",
      },
    ],
  },
];

export const mockSubmissionStats = {
  totalSubmissions: 6,
  averageGrade: 85.8,
};

function ZankolinePage() {
  const user = useUserStore((state) => state.user);
  const { t } = useTranslation();
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(
    null,
  );

  return (
    <PageTransition className="min-h-screen bg-background px-8 py-8">
      <PageHeader
        title={t("Ministry of Higher Education")}
        locationTitle={t("Zankoline")}
        year="2025-2026"
        role={user?.roles[0].name || ""}
      />

      <div className="flex gap-5 mt-6">
        <StatCard
          label={t("Submissions")}
          value={String(mockSubmissionStats.totalSubmissions)}
        />
        <StatCard
          label={t("Avg. grade")}
          value={String(mockSubmissionStats.averageGrade)}
        />
      </div>

      <div className="flex justify-between">
        <p className="text-sm text-muted-foreground py-6">
          {t("University admission forms submitted by high-school graduates")}
        </p>
        <Button className="inline-flex h-10.5 items-center gap-2 rounded-xl border border-[#0f7576] bg-[#0f7576] px-3.25 font-bold text-white shadow-[0_8px_18px_rgba(15,117,118,0.2)] transition hover:bg-[#0b5f60]">
          <Settings size={20} />
          {t("Process Submissions")}
        </Button>
      </div>

      <div className="flex gap-4 bg-card border border-border rounded-2xl overflow-hidden">
        {/* Applicant list */}
        <div className="w-80 border-r border-border shrink-0">
          <div className="px-4 py-3 border-b border-border">
            <h2 className="font-semibold text-sm">
              {t("Applicants")}
              <span className="text-muted-foreground ms-1">
                {mockApplicants.length}
              </span>
            </h2>
          </div>

          {mockApplicants.map((applicant, index) => (
            <div
              key={applicant.id}
              onClick={() => setSelectedApplicant(applicant)}
              className={`px-4 py-4 cursor-pointer transition-colors border-s-4 ${
                selectedApplicant?.id === applicant.id
                  ? "border-s-teal-700 bg-teal-500/10"
                  : "border-s-transparent hover:bg-muted/40"
              } ${index !== mockApplicants.length - 1 ? "border-b border-border" : ""}`}
            >
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full bg-teal-700 text-white flex items-center justify-center text-sm font-semibold">
                  {applicant.initials}
                </div>
                {/* student info */}
                <div>
                  <p className="font-semibold text-sm text-foreground mb-1">
                    {applicant.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {applicant.city} &middot; {applicant.choices} {t("choices")}
                  </p>
                </div>

                {/* grade and status */}
                <div className="flex flex-col items-end gap-1">
                  <p className="text-sm font-semibold text-foreground">
                    {applicant.finalGrade}
                  </p>
                  <Badge className="bg-amber-500/15 text-amber-600 dark:text-amber-400 hover:bg-amber-500/15 text-xs">
                    {t(applicant.status)}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* applicant details */}
        {selectedApplicant ? (
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-700 text-white flex items-center justify-center text-sm font-semibold">
                  {selectedApplicant.initials}
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">
                    {selectedApplicant.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {selectedApplicant.school} &middot; {selectedApplicant.city}
                  </p>
                </div>
              </div>
              <button className="flex items-center gap-1.5 text-sm text-muted-foreground border border-border px-3 py-1.5 rounded-lg hover:bg-muted/40 transition-colors">
                <Pen size={15} />
                {t("Place manually")}
              </button>
            </div>

            <div className="flex gap-8 mb-6 pb-6 border-b border-border">
              <div>
                <p className="text-xs text-muted-foreground mb-1">{t("Stream")}</p>
                <p className="text-sm font-semibold text-foreground">
                  {selectedApplicant.stream}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">{t("Final grade")}</p>
                <p className="text-sm font-semibold text-foreground">
                  {selectedApplicant.finalGrade}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  {t("Ranked major preferences")}
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {selectedApplicant.choices} {t("choices")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                {t("Ranked major preferences")} ({selectedApplicant.choices})
              </h3>
              <div className="flex flex-col gap-2">
                {selectedApplicant.rankedPreferences.map((pref) => (
                  <div
                    key={pref.rank}
                    className="flex items-center gap-3 py-2 border-b border-border"
                  >
                    <span className="w-6 h-6 rounded-full bg-muted text-muted-foreground text-xs flex items-center justify-center font-medium shrink-0">
                      {pref.rank}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {pref.major}
                      </p>
                      <p className="text-xs text-muted-foreground">{pref.university}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">
            {t("Select an applicant to view details")}
          </div>
        )}
      </div>
    </PageTransition>
  );
}

export default ZankolinePage;
