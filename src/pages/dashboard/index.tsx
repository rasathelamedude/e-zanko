// import { useUserStore } from "../../store/userStore";
import { useUserStore } from "../../store/userStore";
import MinistryDashboard from "./components/MinistryDashboard";
import UniversityDashboard from "./components/UniversityDashboard";
import UniversityStaffDashboard from "./components/UniversityStaffDashboard";

const DashboardPage = () => {
  const { user } = useUserStore();

  if (user?.role === "MINISTRY_ADMIN") return <MinistryDashboard />;
  if (user?.role === "UNIVERSITY_ADMIN") return <UniversityDashboard />;
  if (user?.role === "UNIVERSITY_STAFF") return <UniversityStaffDashboard />
};

export default DashboardPage;
