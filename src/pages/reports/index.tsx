import MinistryReportsPage from "./components/MinistryReportsPage";
import UniversityReportPage from "./components/UniversityReportPage";
import { useUserStore } from "../../store/userStore";
import DepartmentHeadReportsPage from "./components/DepartmentHeadReportsPage";

const ReportsPage = () => {
  const { user } = useUserStore();

  if (user?.role === "MINISTRY_ADMIN") return <MinistryReportsPage />;
  if (user?.role === "UNIVERSITY_ADMIN") return <UniversityReportPage />;
  if (user?.role === "DEPARTMENT_HEAD") return <DepartmentHeadReportsPage />;
};

export default ReportsPage;
