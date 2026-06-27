import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUserStore } from "../../store/userStore";
import type { UserRole } from "../../types/auth";

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
      { label: "Dashboard", to: "/" },
      { label: "Letters", to: "/letters" },
      { label: "Settings", to: "/settings" },
    ],
    DEAN: [
      { label: "Dashboard", to: "/" },
      { label: "Departments", to: `/universities/${user?.scopeId}/faculties/${user?.scopeId}/departments` },
      { label: "Letters", to: "/letters" },
      { label: "Reports", to: "/reports" },
      { label: "Settings", to: "/settings" },
    ],
    DEPARTMENT_HEAD: [
      { label: "Dashboard", to: "/" },
      { label: "Courses", to: `/universities/${user?.scopeId}/faculties/1/departments/1/courses` },
      { label: "Letters", to: "/letters" },
      { label: "Reports", to: "/reports" },
      { label: "Settings", to: "/settings" },
    ],
  };

  const navItems = user?.role ? NAV_ITEMS[user.role as ManagementRoles] : [];

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
    </aside>
  );
};

export default Sidebar;
