import { useUserStore } from "../../store/userStore";
import MinistrySettingsPage from "./components/MinistrySettingsPage";

const SettingsPage = () => {
  const { user } = useUserStore();

  if (user?.role === "MINISTRY_ADMIN") return <MinistrySettingsPage />;

  return null;
};

export default SettingsPage;
