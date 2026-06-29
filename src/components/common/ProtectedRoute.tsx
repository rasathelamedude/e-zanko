import { Navigate, Outlet } from "react-router-dom";
import type { UserRole } from "../../types/auth";
import { useUserStore } from "../../store/userStore";

interface ProtectedRoutesProps {
  allowedRoles?: UserRole[];
}

const ProtectedRoutes = ({ allowedRoles }: ProtectedRoutesProps) => {
  const { user } = useUserStore();
  const isAuthenticated = user !== null;

  // Check if the user is logged in
  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }

  // Check if the user has the required level to access the route
  if (allowedRoles && !allowedRoles.includes(user?.roles[0]?.name)) {
    return <Navigate to={"/unauthorized"} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
