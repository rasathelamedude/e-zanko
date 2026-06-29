import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUserStore } from "../../store/userStore";
import type { UserRole } from "../../types/auth";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../api/auth";

type NavItem = {
  label: string;
  to: string;
};

type ManagementRoles = Exclude<UserRole, "STUDENT" | "LECTURER">;

const Sidebar = () => {
  const user = useUserStore((state) => state.user);
  const { t } = useTranslation();

  const NAV_ITEMS: Record<ManagementRoles, NavItem[]> = {
    MINISTRY_ADMIN: [
      { label: t("Dashboard"), to: "/" },
      { label: t("Universities"), to: "/universities" },
      { label: t("Letters"), to: "/letters" },
      { label: t("Reports"), to: "/reports" },
      { label: t("Settings"), to: "/settings" },
    ],
    MINISTRY_STAFF: [],
    UNIVERSITY_ADMIN: [
      { label: t("Dashboard"), to: "/" },
      {
        label: t("Faculties"),
        to: `/universities/${user?.scopeId}/faculties`,
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
        to: `/universities/${user?.scopeId}/faculties/${user?.scopeId}/departments`,
      },
      { label: t("Letters"), to: "/letters" },
      { label: t("Reports"), to: "/reports" },
      { label: t("Settings"), to: "/settings" },
    ],
    DEPARTMENT_HEAD: [
      { label: t("Dashboard"), to: "/" },
      {
        label: t("Courses"),
        to: `/universities/${user?.scopeId}/faculties/1/departments/1/courses`,
      },
      { label: t("Students"), to: "/students" },
      { label: t("Lecturers"), to: "/lecturers" },
      { label: t("Letters"), to: "/letters" },
      { label: t("Reports"), to: "/reports" },
      { label: t("Settings"), to: "/settings" },
    ],
  };

  const navItems = user?.role ? NAV_ITEMS[user.role as ManagementRoles] : [];

  const { setUser, setToken } = useUserStore();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setUser(null);
      setToken(null);
      navigate("/login", { replace: true });
    },
  });

  const handleLogout = () => {
    mutate();
  };

  return (
    <aside className="flex h-full w-64 flex-col border-e border-slate-200 bg-white">
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center justify-between rounded-lg px-4 py-2.5 text-sm transition-colors ${
                isActive
                  ? "bg-[#e0f0f0] font-semibold text-[#0f7576]"
                  : "font-medium text-slate-600 hover:bg-slate-50"
              }`
            }
          >
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="space-y-3 border-t border-slate-100 px-3 py-4">
        <div className="flex items-center gap-3 px-1">
          <div className="min-w-0 text-start">
            <p className="truncate text-sm font-bold text-slate-900">
              {user?.name || t("Dr. A. Mahmoud")}
            </p>

            <p className="truncate text-xs text-slate-500">
              {user?.role ? t(user.role) : t("System Administrator")}
            </p>
          </div>
        </div>
      </div>

      <Button
        disabled={isPending}
        onClick={handleLogout}
        className="bg-white border-red-500 text-red-500 hover:bg-red-50 m-3"
      >
        <LogOut />
        {isPending ? t("Logging out...") : t("Logout")}
      </Button>
    </aside>
  );
};

export default Sidebar;
