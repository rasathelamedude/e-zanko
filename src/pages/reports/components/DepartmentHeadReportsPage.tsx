import { useTranslation } from "react-i18next";
import BarChartCard from "../../../components/common/BarChart";
import PageHeader from "../../../components/common/PageHeader";
import StatCard from "../../../components/common/StatCard";
import { useUserStore } from "../../../store/userStore";

const DepartmentHeadReportsPage = () => {
  const { t } = useTranslation();
  const { user } = useUserStore();

  const monthlyLettersData = [
    { label: t("Jan"), value: 12 },
    { label: t("Feb"), value: 16 },
    { label: t("Mar"), value: 14 },
    { label: t("Apr"), value: 19 },
    { label: t("May"), value: 22 },
    { label: t("Jun"), value: 18 },
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-screen space-y-8">
      <PageHeader
        title={t("University Administration")}
        locationTitle={t("Reports")}
        role={user?.roles[0]?.name || ""}
        year="2023-2024"
      />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
        <StatCard label={t("Letters this year")} value="156" />
        <StatCard label={t("Approval rate")} value="82%" />
      </div>

      <div className="w-full">
        <BarChartCard
          title={t("Letters per month")}
          data={monthlyLettersData}
        />
      </div>
    </div>
  );
};

export default DepartmentHeadReportsPage;
