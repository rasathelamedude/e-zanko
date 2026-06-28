import MinistryReportsPage from "./components/MinistryReportsPage";
import UniversityReportPage from "./components/UniversityReportPage";
import { useUserStore } from "../../store/userStore";
import DepartmentHeadReportsPage from "./components/DepartmentHeadReportsPage";
import DeanReportsPage from "./components/DeanReportsPage";

const ReportsPage = () => {
  const { user } = useUserStore();

  if (user?.role === "MINISTRY_ADMIN") return <MinistryReportsPage />;
  if (user?.role === "UNIVERSITY_ADMIN") return <UniversityReportPage />;
  if (user?.role === "DEPARTMENT_HEAD") return <DepartmentHeadReportsPage />;
  if (user?.role === "DEAN") return <DeanReportsPage />;
};

export default ReportsPage;
