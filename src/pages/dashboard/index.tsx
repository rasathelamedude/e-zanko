// import { useUserStore } from "../../store/userStore";
import { useUserStore } from "../../store/userStore";
import MinistryDashboard from "./components/MinistryDashboard";
import UniversityDashboard from "./components/UniversityDashboard";

const DashboardPage = () => {
  const { user } = useUserStore();

  if (user?.role === "MINISTRY_ADMIN") return <MinistryDashboard />;
  if (user?.role === "UNIVERSITY_ADMIN") return <UniversityDashboard />;
};

export default DashboardPage;
