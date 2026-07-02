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
    <header className="mb-6">
      <h2 className="text-sm font-bold uppercase tracking-wide text-teal-600 dark:text-teal-400">
        {title}
      </h2>

      <h1 className="mt-1 text-3xl font-bold text-foreground">
        {locationTitle}
      </h1>

      <p className="mt-1 text-sm text-muted-foreground">
        {role} &middot; {t("Academic Year")} {year}
      </p>
    </header>
  );
};

export default PageHeader;
