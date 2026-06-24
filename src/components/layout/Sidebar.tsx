import { NavLink } from "react-router-dom";
// import { useUserStore } from "../../store/userStore";
import type { User, UserRole } from "../../types/auth";

type NavItem = {
  label: string;
  to: string;
};

// Exclude roles like students and lecturers which don't use the main admin nav.
type AllowedUserRole = Exclude<UserRole, "STUDENT" | "LECTURER">;

// Specific nav items for each role
const NAV_ITEMS: Record<AllowedUserRole, NavItem[]> = {
  MINISTRY_ADMIN: [
    { label: "Dashboard", to: "/" },
    { label: "Universities", to: "/universities" },
    { label: "Letters", to: "/letters" },
    { label: "Reports", to: "/reports" },
    { label: "Settings", to: "/settings" },
  ],
  MINISTRY_STAFF: [],
  UNIVERSITY_ADMIN: [
    { label: "Dashboard", to: "/" },
    { label: "Faculties", to: "/faculties" },
    { label: "Letters", to: "/letters" },
    { label: "Reports", to: "/reports" },
    { label: "Settings", to: "/settings" },
  ],
  UNIVERSITY_STAFF: [],
  DEAN: [],
  DEPARTMENT_HEAD: [],
};

const Sidebar = () => {
  // const user = useUserStore((state) => state.user);
  const user: User = {
    id: 1,
    email: "test@institution.edu.krd",
    name: "Test User",
    role: "MINISTRY_ADMIN",
    scope: "MINISTRY",
    scopeId: 1,
    isActive: true,
    phone: "1234567890",
  };

  // Get nav items based on user role
  const navItems = user?.role ? NAV_ITEMS[user?.role as AllowedUserRole] : [];

  return (
    <aside className="w-64 h-full bg-white border-r border-slate-200 flex flex-col">
      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item: NavItem) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-[#e0f0f0] text-[#0f7576] font-semibold"
                  : "text-slate-600 font-medium hover:bg-slate-50"
              }`
            }
          >
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-slate-100 space-y-3">
        <div className="flex items-center gap-3 px-1">
          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-900 truncate">
              {user?.name || "Dr. A. Mahmoud"}
            </p>
            <p className="text-xs text-slate-500 truncate">
              {user?.role || "System Administrator"}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
