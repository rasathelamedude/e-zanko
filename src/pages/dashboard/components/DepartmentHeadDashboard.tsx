import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getDepartmentHeadDashboardAnalytics } from "../../../api/dashboard";
import PageHeader from "../../../components/common/PageHeader";
import StatCard from "../../../components/common/StatCard";
import { useUserStore } from "../../../store/userStore";
import RecentLetters from "../../../components/common/RecentLetters";
import type { Letter } from "../../../types/letter";
import DepartmentInfoCard from "../../../components/common/DepartmentInfoCard";

const DepartmentHeadDashboard = () => {
  const { t } = useTranslation();
  const [analytics, setAnalytics] = useState({
    pendingLetters: 0,
    approvedLettersThisMonth: 0,
    rejectedLettersThisMonth: 0,
    departmentInfo: {
      department: "Software Engineering",
      faculty: "Faculty of Engineering",
      students: 32,
      lecturers: 14,
    },
  });
  const user = useUserStore((state) => state.user);

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
      const analyticsData = await getDepartmentHeadDashboardAnalytics();
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
          value={analytics.pendingLetters}
        />
        <StatCard
          label={t("Pending Letters")}
          value={analytics.approvedLettersThisMonth}
          highlight
        />
        <StatCard
          label={t("Approved This Month")}
          value={analytics.rejectedLettersThisMonth}
        />
      </div>

      <div className="my-6">
        <DepartmentInfoCard
          department={analytics.departmentInfo.department}
          faculty={analytics.departmentInfo.faculty}
          students={analytics.departmentInfo.students}
          lecturers={analytics.departmentInfo.lecturers}
        />
      </div>

      <RecentLetters letters={recentLetters} />
    </div>
  );
};

export default DepartmentHeadDashboard;
