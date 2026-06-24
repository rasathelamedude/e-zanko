import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="h-screen bg-[#f5f7fa] overflow-hidden">
      <Header />
      <div className="flex h-full pt-20.5">
        <Sidebar />
        <main className="flex-1 min-w-0 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
