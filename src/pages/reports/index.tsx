import MinistryReportsPage from "./components/MinistryReportsPage";
import UniversityReportPage from "./components/UniversityReportPage";
import { useUserStore } from "../../store/userStore";

const ReportsPage = () => {
  const { user } = useUserStore();

  if (user?.role === "MINISTRY_ADMIN") return <MinistryReportsPage />;
  if (user?.role === "UNIVERSITY_ADMIN") return <UniversityReportPage />;
};

export default ReportsPage;
