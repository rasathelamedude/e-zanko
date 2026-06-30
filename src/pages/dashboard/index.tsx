// import { useUserStore } from "../../store/userStore";
import { useUserStore } from "../../store/userStore";
import DepartmentHeadDashboard from "./components/DepartmentHeadDashboard";
import DeanDashboard from "./components/DeanDashboard";
import MinistryDashboard from "./components/MinistryDashboard";
import UniversityDashboard from "./components/UniversityDashboard";
import UniversityStaffDashboard from "./components/UniversityStaffDashboard";

const DashboardPage = () => {
  const { user } = useUserStore();

  if (user?.roles[0]?.name === "MINISTRY_ADMIN") return <MinistryDashboard />;
  if (user?.roles[0]?.name === "UNIVERSITY_ADMIN")
    return <UniversityDashboard />;
  if (user?.roles[0]?.name === "UNIVERSITY_STAFF")
    return <UniversityStaffDashboard />;
  if (user?.roles[0]?.name === "DEPARTMENT_HEAD")
    return <DepartmentHeadDashboard />;
  if (user?.roles[0]?.name === "DEAN") return <DeanDashboard />;
};

export default DashboardPage;
