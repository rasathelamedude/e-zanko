import MinistryReportsPage from "./components/MinistryReportsPage";
import UniversityReportPage from "./components/UniversityReportPage";
import { useUserStore } from "../../store/userStore";
import DepartmentHeadReportsPage from "./components/DepartmentHeadReportsPage";
import DeanReportsPage from "./components/DeanReportsPage";

const ReportsPage = () => {
  const { user } = useUserStore();

  if (user?.roles[0]?.name === "MINISTRY_ADMIN") return <MinistryReportsPage />;
  if (user?.roles[0]?.name === "UNIVERSITY_ADMIN")
    return <UniversityReportPage />;
  if (user?.roles[0]?.name === "DEPARTMENT_HEAD")
    return <DepartmentHeadReportsPage />;
  if (user?.roles[0]?.name === "DEAN") return <DeanReportsPage />;
};

export default ReportsPage;
