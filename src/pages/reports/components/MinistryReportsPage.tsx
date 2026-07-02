import { useTranslation } from "react-i18next";
import StatCard from "../../../components/common/StatCard";
import BarChartCard from "../../../components/common/BarChart";
import PageHeader from "../../../components/common/PageHeader";
import { useUserStore } from "../../../store/userStore";

const MinistryReportsPage = () => {
  const { t } = useTranslation();
  const { user } = useUserStore();

  const monthlyLettersData = [
    { label: t("Jan"), value: 28 },
    { label: t("Feb"), value: 34 },
    { label: t("Mar"), value: 29 },
    { label: t("Apr"), value: 41 },
    { label: t("May"), value: 46 },
    { label: t("Jun"), value: 38 },
  ];

  return (
    <div className="p-8 bg-background min-h-screen space-y-8">
      {/* Page Header */}
      <PageHeader
        title={t("Ministry of higher education")}
        locationTitle={t("Reports")}
        role={user?.roles[0]?.name || ""}
        year="2023-2024"
      />

      {/* Metrics Section */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
        <StatCard label={t("Letters this year")} value="334" />
        <StatCard label={t("Approval rate")} value="84%" />
      </div>

      {/* Data Visualization Section */}
      <div className="w-full">
        <BarChartCard
          title={t("Letters per month")}
          data={monthlyLettersData}
        />
      </div>
    </div>
  );
};

export default MinistryReportsPage;
