import MinistryReportsPage from "./components/MinistryReportsPage";
import { useUserStore } from "../../store/userStore";

const ReportsPage = () => {
  const { user } = useUserStore();

  if (user?.role === "MINISTRY_ADMIN") return <MinistryReportsPage />;
};

export default ReportsPage;
