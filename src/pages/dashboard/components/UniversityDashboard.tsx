import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import BarChart from "../../../components/common/BarChart";
import DonutChart from "../../../components/common/DonutChart";
import RecentLetters from "../../../components/common/RecentLetters";
import type { Letter } from "../../../types/letter";
import { useUserStore } from "../../../store/userStore";
import StatCard from "../../../components/common/StatCard";
import PageHeader from "../../../components/common/PageHeader";
import { getUniversityDashboardAnalytics } from "../../../api/dashboard";
import DepartmentActivityCard from "../../../components/common/DepartmentActivityCard";
import { MdOutlineScience } from "react-icons/md";
import { MdOutlineManageAccounts } from "react-icons/md";
import { PiStudentLight } from "react-icons/pi";

const UniversityDashboard = () => {
  const { t } = useTranslation();
  const [analytics, setAnalytics] = useState({
    totalFaculties: 0,
    totalPendingLetters: 0,
    totalActiveDeans: 0,
  });

  const user = useUserStore((state) => state.user);

  const recentLetters: Letter[] = [
    {
      id: 1,
      status: "pending",
      title: t("Open College of Data Science"),
      university: "University of Sulaimani",
      date: "16 Jun 2026",
      message: "",
      letterType: "",
    },
    {
      id: 2,
      status: "pending",
      title: t("Close College of Fine Arts"),
      university: "Salahaddin University",
      date: "15 Jun 2026",
      message: "",
      letterType: "",
    },
  ];

  const lettersByStatus = [
    { label: t("Pending"), value: 18, color: "#d97706" },
    { label: t("Approved"), value: 46, color: "#228b22" },
    { label: t("Rejected"), value: 8, color: "#dc2626" },
  ];

  const studentsPerFaculty = [
    { label: t("Engineering"), value: 500 },
    { label: t("Arts"), value: 300 },
    { label: t("Science"), value: 200 },
    { label: t("Business"), value: 150 },
    { label: t("Medicine"), value: 100 },
    { label: t("Law"), value: 50 },
  ];

  const departmentActivity = [
    {
      label: t("Administration"),
      lettersThisWeek: 4,
      Icon: MdOutlineManageAccounts,
    },
    {
      label: t("Student Affairs"),
      lettersThisWeek: 6,
      Icon: PiStudentLight,
    },
    {
      label: t("Scientific Affairs"),
      lettersThisWeek: 3,
      Icon: MdOutlineScience,
    },
  ];

  useEffect(() => {
    const fetchAnalytics = async () => {
      const analyticsData = await getUniversityDashboardAnalytics();
      setAnalytics(analyticsData);
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="max-w-7xl w-full">
      <PageHeader
        title={t("Ministry of Higher Education")}
        locationTitle={t("Dashboard")}
        role={user?.role || ""}
        year="2023-2024"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <StatCard
          label={t("Total Faculties")}
          value={analytics.totalFaculties}
        />
        <StatCard
          label={t("Pending Letters")}
          value={analytics.totalPendingLetters}
          highlight
        />
        <StatCard
          label={t("Active Deans")}
          value={analytics.totalActiveDeans}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {departmentActivity.map((dept) => (
          <DepartmentActivityCard
            key={dept.label}
            label={dept.label}
            lettersThisWeek={dept.lettersThisWeek}
            Icon={dept.Icon}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <BarChart
          title={t("Students per faculty")}
          subtitle={t("top 6")}
          data={studentsPerFaculty}
        />
        <DonutChart title={t("Letters by status")} segments={lettersByStatus} />
      </div>

      <RecentLetters letters={recentLetters} />
    </div>
  );
};

export default UniversityDashboard;
