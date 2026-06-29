import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getMinistryDashboardAnalytics } from "../../../api/dashboard";
import PageHeader from "../../../components/common/PageHeader";
import StatCard from "../../../components/common/StatCard";
import { useUserStore } from "../../../store/userStore";
import BarChart from "../../../components/common/BarChart";
import DonutChart from "../../../components/common/DonutChart";
import RecentLetters from "../../../components/common/RecentLetters";
import type { Letter } from "../../../types/letter";

const MinistryDashboard = () => {
  const { t } = useTranslation();
  const [analytics, setAnalytics] = useState({
    totalUniversities: 0,
    totalPendingLetters: 0,
    totalApprovedLettersThisMonth: 0,
  });
  const user = useUserStore((state) => state.user);

  // Static until the backend exposes analytics endpoints
  const facultiesPerUniversity = [
    { label: "Salahaddin", value: 18 },
    { label: "Sulaimani", value: 15 },
    { label: "Duhok", value: 12 },
    { label: "Halabja", value: 11 },
    { label: "Garmian", value: 9 },
    { label: "Raparin", value: 8 },
  ];

  const lettersByStatus = [
    { label: t("Pending"), value: 18, color: "#d97706" },
    { label: t("Approved"), value: 46, color: "#228b22" },
    { label: t("Rejected"), value: 8, color: "#dc2626" },
  ];

  const recentLetters: Letter[] = [
    {
      id: 1,
      status: "pending",
      title: t("Open College of Data Science"),
      university: t("University of Sulaimani"),
      date: "16 Jun 2026",
      message: "",
      letterType: "",
    },
    {
      id: 2,
      status: "pending",
      title: t("Close College of Fine Arts"),
      university: t("Salahaddin University"),
      date: "15 Jun 2026",
      message: "",
      letterType: "",
    },
  ];

  useEffect(() => {
    const fetchAnalytics = async () => {
      const analyticsData = await getMinistryDashboardAnalytics();
      setAnalytics(analyticsData);
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="max-w-7xl w-full">
      <PageHeader
        title={t("Ministry of Higher Education")}
        locationTitle={t("Dashboard")}
        role={user?.roles[0]?.name || ""}
        year="2023-2024"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <StatCard
          label={t("Total Universities")}
          value={analytics.totalUniversities}
        />
        <StatCard
          label={t("Pending Letters")}
          value={analytics.totalPendingLetters}
          highlight
        />
        <StatCard
          label={t("Approved This Month")}
          value={analytics.totalApprovedLettersThisMonth}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <BarChart
          title={t("Faculties per university")}
          subtitle={t("top 6")}
          data={facultiesPerUniversity}
        />
        <DonutChart title={t("Letters by status")} segments={lettersByStatus} />
      </div>

      <RecentLetters letters={recentLetters} />
    </div>
  );
};

export default MinistryDashboard;
