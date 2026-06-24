// import { useUserStore } from "../../store/userStore";
import type { User } from "../../types/auth";
import MinistryDashboard from "./components/MinistryDashboard";
import UniversityDashboard from "./components/UniversityDashboard";

const DashboardPage = () => {
  // const { user } = useUserStore();
  const user: User = {
    id: 1,
    email: "test@institution.edu.krd",
    name: "Test User",
    role: "UNIVERSITY_ADMIN",
    scope: "UNIVERSITY",
    scopeId: 1,
    isActive: true,
    phone: "1234567890",
  };

  if (user.role === "MINISTRY_ADMIN") return <MinistryDashboard />;
  if (user.role === "UNIVERSITY_ADMIN") return <UniversityDashboard />;
};

export default DashboardPage;
