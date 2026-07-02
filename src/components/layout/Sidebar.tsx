import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUserStore } from "../../store/userStore";
import type { UserRole, UserScope } from "../../types/auth";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../api/auth";
import { easeOutExpo } from "../../lib/motion";

type NavItem = {
  label: string;
  to: string;
};

type ManagementRoles = Exclude<UserRole, "STUDENT" | "LECTURER">;

const Sidebar = () => {
  const navigate = useNavigate();
  const { user, clearAuth } = useUserStore();
  const { t } = useTranslation();

  const getScopeId = (scopeType: UserScope) => {
    return user?.scopes?.find((s) => s.scope_type === scopeType)?.scope_id || 0;
  };

  const universityId = getScopeId("UNIVERSITY");
  const facultyId = getScopeId("FACULTY");
  const departmentId = getScopeId("DEPARTMENT");

  const NAV_ITEMS: Record<ManagementRoles, NavItem[]> = {
    MINISTRY_ADMIN: [
      { label: t("Dashboard"), to: "/" },
      { label: t("Universities"), to: "/universities" },
      { label: t("Zankoline"), to: "/zankoline"},
      { label: t("Letters"), to: "/letters" },
      { label: t("Reports"), to: "/reports" },
      { label: t("Settings"), to: "/settings" },
    ],
    MINISTRY_STAFF: [],
    UNIVERSITY_ADMIN: [
      { label: t("Dashboard"), to: "/" },
      {
        label: t("Faculties"),
        to: `/universities/${universityId}/faculties`,
      },
      { label: t("Letters"), to: "/letters" },
      { label: t("Reports"), to: "/reports" },
      { label: t("Settings"), to: "/settings" },
    ],
    UNIVERSITY_STAFF: [
      { label: t("Dashboard"), to: "/" },
      { label: t("Letters"), to: "/letters" },
      { label: t("Settings"), to: "/settings" },
    ],
    DEAN: [
      { label: t("Dashboard"), to: "/" },
      {
        label: t("Departments"),
        to: `/universities/${universityId}/faculties/${facultyId}/departments`,
      },
      { label: t("Letters"), to: "/letters" },
      { label: t("Reports"), to: "/reports" },
      { label: t("Settings"), to: "/settings" },
    ],
    HEAD_OF_DEPARTMENT: [
      { label: t("Dashboard"), to: "/" },
      {
        label: t("Courses"),
        to: `/universities/${universityId}/faculties/${facultyId}/departments/${departmentId}/courses`,
      },
      { label: t("Students"), to: "/students" },
      { label: t("Lecturers"), to: "/lecturers" },
      { label: t("Letters"), to: "/letters" },
      { label: t("Reports"), to: "/reports" },
      { label: t("Settings"), to: "/settings" },
    ],
  };

  const roleName = user?.roles[0]?.name || user?.scopes?.[0]?.role_name;
  const navItems = roleName ? NAV_ITEMS[roleName as ManagementRoles] || [] : [];

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    // The user is logged out locally either way, so a failure isn't actionable.
    meta: { suppressErrorToast: true },
    onSuccess: () => {
      clearAuth();
      navigate("/login", { replace: true });
    },
    onError: () => {
      clearAuth();
      navigate("/login", { replace: true });
    },
  });

  const handleLogout = () => {
    mutate();
  };

  return (
    <aside className="flex h-full w-64 flex-col border-e border-border bg-card">
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item, index) => (
          <motion.div
            key={item.to}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.28,
              delay: index * 0.04,
              ease: easeOutExpo,
            }}
          >
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex items-center justify-between rounded-lg px-4 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "bg-teal-600/10 font-semibold text-teal-700 dark:bg-teal-500/15 dark:text-teal-300"
                    : "font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                }`
              }
            >
              <span>{item.label}</span>
            </NavLink>
          </motion.div>
        ))}
      </nav>

      <div className="space-y-3 border-t border-border px-3 py-4">
        <div className="flex items-center gap-3 px-1">
          <div className="min-w-0 text-start">
            <p className="truncate text-sm font-bold text-foreground">
              {user?.name || t("Dr. A. Mahmoud")}
            </p>

            <p className="truncate text-xs text-muted-foreground">
              {roleName ? t(roleName) : t("System Administrator")}
            </p>
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        disabled={isPending}
        onClick={handleLogout}
        className="m-3 h-9 border-red-500/60 text-red-500 hover:bg-red-500/10 hover:text-red-500"
      >
        <LogOut />
        {isPending ? t("Logging out...") : t("Logout")}
      </Button>
    </aside>
  );
};

export default Sidebar;
