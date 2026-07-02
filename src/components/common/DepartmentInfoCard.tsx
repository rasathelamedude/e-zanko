import { useTranslation } from "react-i18next";

interface DepartmentInfoCardProps {
  department: string;
  faculty: string;
  students: number;
  lecturers: number;
}

const DepartmentInfoCard = ({
  department,
  faculty,
  students,
  lecturers,
}: DepartmentInfoCardProps) => {
  const { t } = useTranslation();

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm px-6 py-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <p className="text-xs text-muted-foreground mb-1">{t("Department")}</p>
          <p className="text-sm font-semibold text-foreground">{department}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">{t("Faculty")}</p>
          <p className="text-sm font-semibold text-foreground">{faculty}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">{t("Students")}</p>
          <p className="text-sm font-semibold text-foreground">{students}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">{t("Lecturers")}</p>
          <p className="text-sm font-semibold text-foreground">{lecturers}</p>
        </div>
      </div>
    </div>
  );
};

export default DepartmentInfoCard;
