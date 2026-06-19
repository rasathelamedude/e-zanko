import React from "react";
import { Navigate } from "react-router-dom";
import type { HierarchyLevel } from "../../types/auth";

interface ProtectedRoutesProps {
  readonly children: React.ReactNode;
  isAuthenticated: boolean;
  userLevel: HierarchyLevel;
  requiredLevel?: HierarchyLevel;
}

const ProtectedRoutes = ({
  children,
  isAuthenticated,
  userLevel,
  requiredLevel,
}: ProtectedRoutesProps) => {
  // Check if the user is logged in
  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }

  // Check if the user has the required level to access the route
  if (requiredLevel && userLevel !== requiredLevel) {
    return <Navigate to={"/unauthorized"} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
