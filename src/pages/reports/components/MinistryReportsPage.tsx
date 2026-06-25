import StatCard from "../../../components/common/StatCard";
import BarChartCard from "../../../components/common/BarChart";
import PageHeader from "../../../components/common/PageHeader";
import { useUserStore } from "../../../store/userStore";

const MinistryReportsPage = () => {
  const { user } = useUserStore();

  const monthlyLettersData = [
    { label: "Jan", value: 28 },
    { label: "Feb", value: 34 },
    { label: "Mar", value: 29 },
    { label: "Apr", value: 41 },
    { label: "May", value: 46 },
    { label: "Jun", value: 38 },
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-screen space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Ministry of higher education"
        locationTitle="Reports"
        role={user?.role || ""}
        year="2023-2024"
      />

      {/* Metrics Section */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
        <StatCard label="Letters this year" value="334" />
        <StatCard label="Approval rate" value="84%" />
      </div>

      {/* Data Visualization Section */}
      <div className="w-full">
        <BarChartCard title="Letters per month" data={monthlyLettersData} />
      </div>
    </div>
  );
};

export default MinistryReportsPage;
