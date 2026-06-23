import type { User } from "../../types/auth";
import MinistrySettingsPage from "./components/MinistrySettingsPage";

const SettingsPage = () => {
  const user: User = {
    id: "1",
    email: "test@institution.edu.krd",
    username: "Test User",
    role: "MINISTRY_ADMIN",
    name: "Test User",
  };

  if (user.role === "MINISTRY_ADMIN") return <MinistrySettingsPage />;

  return null;
};

export default SettingsPage;
