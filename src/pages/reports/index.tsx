import MinistryReportsPage from "./components/MinistryReportsPage";
import UniversityReportPage from "./components/UniversityReportPage";
import { useUserStore } from "../../store/userStore";
import DepartmentHeadReportsPage from "./components/DepartmentHeadReportsPage";
import DeanReportsPage from "./components/DeanReportsPage";
import PageTransition from "../../components/common/PageTransition";

const ReportsPage = () => {
  const { user } = useUserStore();

  if (user?.roles[0]?.name === "MINISTRY_ADMIN")
    return (
      <PageTransition>
        <MinistryReportsPage />
      </PageTransition>
    );
  if (user?.roles[0]?.name === "UNIVERSITY_ADMIN")
    return (
      <PageTransition>
        <UniversityReportPage />
      </PageTransition>
    );
  if (user?.roles[0]?.name === "DEPARTMENT_HEAD")
    return (
      <PageTransition>
        <DepartmentHeadReportsPage />
      </PageTransition>
    );
  if (user?.roles[0]?.name === "DEAN")
    return (
      <PageTransition>
        <DeanReportsPage />
      </PageTransition>
    );
};

export default ReportsPage;
