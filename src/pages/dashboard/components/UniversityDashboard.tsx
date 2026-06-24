import { useEffect, useState } from "react";
import BarChart from "../../../components/common/BarChart";
import DonutChart from "../../../components/common/DonutChart";
import RecentLetters from "../../../components/common/RecentLetters";
import type { Letter } from "../../../types/letter";
// import { useUserStore } from "../../../store/userStore";
import StatCard from "../../../components/common/StatCard";
import PageHeader from "../../../components/common/PageHeader";
import { getUniversityDashboardAnalytics } from "../../../api/dashboard";
import DepartmentActivityCard from "../../../components/common/DepartmentActivityCard";
import { MdOutlineScience } from "react-icons/md";
import { MdOutlineManageAccounts } from "react-icons/md";
import { PiStudentLight } from "react-icons/pi";

const recentLetters: Letter[] = [
  {
    id: 1,
    status: "pending",
    title: "Open College of Data Science",
    university: "University of Sulaimani",
    date: "16 Jun 2026",
    message: "",
    letterType: "",
  },
  {
    id: 2,
    status: "pending",
    title: "Close College of Fine Arts",
    university: "Salahaddin University",
    date: "15 Jun 2026",
    message: "",
    letterType: "",
  },
];

const lettersByStatus = [
  { label: "Pending", value: 18, color: "#d97706" },
  { label: "Approved", value: 46, color: "#228b22" },
  { label: "Rejected", value: 8, color: "#dc2626" },
];

const studentsPerFaculty = [
  { label: "Engineering", value: 500 },
  { label: "Arts", value: 300 },
  { label: "Science", value: 200 },
  { label: "Business", value: 150 },
  { label: "Medicine", value: 100 },
  { label: "Law", value: 50 },
];

const departmentActivity = [
  {
    label: "Administration",
    lettersThisWeek: 4,
    Icon: MdOutlineManageAccounts,
  },
  { label: "Student Affairs", lettersThisWeek: 6, Icon: PiStudentLight },
  {
    label: "Scientific Affairs",
    lettersThisWeek: 3,
    Icon: MdOutlineScience,
  },
];

const UniversityDashboard = () => {
  const [analytics, setAnalytics] = useState({
    totalFaculties: 0,
    totalPendingLetters: 0,
    totalActiveDeans: 0,
  });

  // const user = useUserStore((state) => state.user);

  const user = {
    id: 1,
    email: "test@institution.edu.krd",
    name: "Test User",
    role: "UNIVERSITY_ADMIN",
    scope: "UNIVERSITY",
    scopeId: 1,
    isActive: true,
    phone: "1234567890",
  };

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
        title="Ministry of Higher Education"
        locationTitle="Dashboard"
        role={user?.role || ""}
        year="2023-2024"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <StatCard label="Total Faculties" value={analytics.totalFaculties} />
        <StatCard
          label="Pending Letters"
          value={analytics.totalPendingLetters}
          highlight
        />
        <StatCard label="Active Deans" value={analytics.totalActiveDeans} />
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
          title="Students per faculty"
          subtitle="top 6"
          data={studentsPerFaculty}
        />
        <DonutChart title="Letters by status" segments={lettersByStatus} />
      </div>

      <RecentLetters letters={recentLetters} />
    </div>
  );
};

export default UniversityDashboard;
