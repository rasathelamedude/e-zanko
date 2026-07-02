// import { useUserStore } from "../../store/userStore";
import { useUserStore } from "../../store/userStore";
import PageTransition from "../../components/common/PageTransition";
import DepartmentHeadDashboard from "./components/DepartmentHeadDashboard";
import DeanDashboard from "./components/DeanDashboard";
import MinistryDashboard from "./components/MinistryDashboard";
import UniversityDashboard from "./components/UniversityDashboard";
import UniversityStaffDashboard from "./components/UniversityStaffDashboard";

const DashboardPage = () => {
  const { user } = useUserStore();

  if (user?.roles[0]?.name === "MINISTRY_ADMIN")
    return (
      <PageTransition>
        <MinistryDashboard />
      </PageTransition>
    );
  if (user?.roles[0]?.name === "UNIVERSITY_ADMIN")
    return (
      <PageTransition>
        <UniversityDashboard />
      </PageTransition>
    );
  if (user?.roles[0]?.name === "UNIVERSITY_STAFF")
    return (
      <PageTransition>
        <UniversityStaffDashboard />
      </PageTransition>
    );
  if (user?.roles[0]?.name === "DEPARTMENT_HEAD")
    return (
      <PageTransition>
        <DepartmentHeadDashboard />
      </PageTransition>
    );
  if (user?.roles[0]?.name === "DEAN")
    return (
      <PageTransition>
        <DeanDashboard />
      </PageTransition>
    );
};

export default DashboardPage;
