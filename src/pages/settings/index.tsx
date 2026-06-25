import { useUserStore } from "../../store/userStore";
import type { User } from "../../types/auth";
import MinistrySettingsPage from "./components/MinistrySettingsPage";

const SettingsPage = () => {
  const { user } = useUserStore() as { user: User };

  if (user.role === "MINISTRY_ADMIN") return <MinistrySettingsPage />;

  return null;
};

export default SettingsPage;
