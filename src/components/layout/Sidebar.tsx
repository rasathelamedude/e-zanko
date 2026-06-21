import { NavLink } from "react-router-dom";
import { useUserStore } from "../../store/userStore";

interface NavItem {
  label: string;
  to: string;
  badge?: number;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Universities", to: "/universities" },
  { label: "Letters Inbox", to: "/letters-inbox" },
  { label: "Sent Letters", to: "/sent-letters" },
  { label: "Reports", to: "/reports" },
  { label: "Settings", to: "/settings" },
];

const Sidebar = () => {
  const user = useUserStore((state) => state.user);

  return (
    <aside className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col">
      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
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
            {item.badge ? (
              <span className="bg-[#cc7a2b] text-white text-xs font-bold rounded-full min-w-5 h-5 px-1.5 flex items-center justify-center">
                {item.badge}
              </span>
            ) : null}
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
