import Sidebar from "../components/layout/Sidebar";
import Header from "../components/common/Header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      <Header />
      <div className="flex pt-20.5">
        <Sidebar />
        <main className="flex-1 min-w-0 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
  </div>
  );
};

export default AppLayout;
