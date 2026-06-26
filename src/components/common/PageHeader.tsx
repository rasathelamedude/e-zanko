import { useTranslation } from "react-i18next";

interface Props {
  title: string;
  locationTitle: string;
  role: string;
  year: string;
}

const PageHeader = ({ title, locationTitle, role, year }: Props) => {
  const { t } = useTranslation();

  return (
    <header className="mb-8">
      <h2 className="mt-1 text-sm font-bold uppercase tracking-wide text-teal-700">
        {title}
      </h2>

      <h1 className="mt-1 text-3xl font-bold text-slate-900">
        {locationTitle}
      </h1>

      <p className="mt-1 text-sm text-slate-500">
        {role} &middot; {t("Academic Year")} {year}
      </p>
    </header>
  );
};

export default PageHeader;
