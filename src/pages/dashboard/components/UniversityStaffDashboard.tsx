import { useEffect, useState } from "react";
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

function UniversityStaffDashboard() {
  const [analytics, setAnalytics] = useState({
    totalFaculties: 0,
    totalPendingLetters: 0,
    totalActiveDeans: 0,
  });

  const user = useUserStore((state) => state.user);

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
        role={user?.roles[0]?.name || ""}
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

      <RecentLetters letters={recentLetters} />
    </div>
  );
}

export default UniversityStaffDashboard;
