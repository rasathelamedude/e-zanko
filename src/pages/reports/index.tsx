import MinistryReportsPage from "./components/MinistryReportsPage";
import { useUserStore } from "../../store/userStore";
import type { User } from "../../types/auth";

const ReportsPage = () => {
  const { user } = useUserStore() as { user: User };

  if (user.role === "MINISTRY_ADMIN") return <MinistryReportsPage />;
};

export default ReportsPage;
