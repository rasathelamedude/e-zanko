import { useEffect, useState } from "react";
import { getDashboardAnalytics } from "../../../api/dashboard";
import DashboardTitle from "../../../components/common/DashboardTitle";
import StatCard from "../../../components/common/StatCard";
import { useUserStore } from "../../../store/userStore";
import BarChart from "../../../components/common/BarChart";
import DonutChart from "../../../components/common/DonutChart";
import RecentLetters from "../../../components/common/RecentLetters";
import type { Letter } from "../../../types/letter";

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
  { label: "Pending", value: 18, color: "#d97706" },
  { label: "Approved", value: 46, color: "#228b22" },
  { label: "Rejected", value: 8, color: "#dc2626" },
];

const recentLetters: Letter[] = [
  {
    id: 1,
    status: "pending",
    title: "Open College of Data Science",
    university: "University of Sulaimani",
    date: "16 Jun 2026",
  },
  {
    id: 2,
    status: "pending",
    title: "Close College of Fine Arts",
    university: "Salahaddin University",
    date: "15 Jun 2026",
  },
];

const MinistryDashboard = () => {
  const [analytics, setAnalytics] = useState({
    totalUniversities: 0,
    totalPendingLetters: 0,
    totalApprovedLettersThisMonth: 0,
  });
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const analyticsData = await getDashboardAnalytics();
      setAnalytics(analyticsData);
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="max-w-7xl w-full">
      <DashboardTitle
        title="Ministry of Higher Education"
        role={user?.role || ""}
        year="2023-2024"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <StatCard
          label="Total Universities"
          value={analytics.totalUniversities}
        />
        <StatCard
          label="Pending Letters"
          value={analytics.totalPendingLetters}
          highlight
        />
        <StatCard
          label="Approved This Month"
          value={analytics.totalApprovedLettersThisMonth}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <BarChart
          title="Faculties per university"
          subtitle="top 6"
          data={facultiesPerUniversity}
        />
        <DonutChart title="Letters by status" segments={lettersByStatus} />
      </div>

      <RecentLetters letters={recentLetters} />
    </div>
  );
};

export default MinistryDashboard;
