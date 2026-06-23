import type { User } from "../../types/auth";
import MinistryReportsPage from "./components/MinistryReportsPage";
// import { useUserStore } from "../../store/userStore";

const ReportsPage = () => {
  // const { user } = useUserStore();

  const user: User = {
    id: "1",
    email: "test@institution.edu.krd",
    username: "Test User",
    role: "MINISTRY_ADMIN",
    name: "Test User",
  };

  if (user.role === "MINISTRY_ADMIN") return <MinistryReportsPage />;
};

export default ReportsPage;
