import BarChartCard from "../../../components/common/BarChart";
import PageHeader from "../../../components/common/PageHeader";
import StatCard from "../../../components/common/StatCard";
import { useUserStore } from "../../../store/userStore";

const DepartmentHeadReportsPage = () => {
  const { user } = useUserStore();

  const monthlyLettersData = [
    { label: "Jan", value: 12 },
    { label: "Feb", value: 16 },
    { label: "Mar", value: 14 },
    { label: "Apr", value: 19 },
    { label: "May", value: 22 },
    { label: "Jun", value: 18 },
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-screen space-y-8">
      <PageHeader
        title="University Administration"
        locationTitle="Reports"
        role={user?.role || ""}
        year="2023-2024"
      />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
        <StatCard label="Letters this year" value="156" />
        <StatCard label="Approval rate" value="82%" />
      </div>

      <div className="w-full">
        <BarChartCard title="Letters per month" data={monthlyLettersData} />
      </div>
    </div>
  );
};

export default DepartmentHeadReportsPage;
