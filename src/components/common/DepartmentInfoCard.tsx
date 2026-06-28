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
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-6 py-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <p className="text-xs text-gray-400 mb-1">{t("Department")}</p>
          <p className="text-sm font-semibold text-gray-900">{department}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-1">{t("Faculty")}</p>
          <p className="text-sm font-semibold text-gray-900">{faculty}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-1">{t("Students")}</p>
          <p className="text-sm font-semibold text-gray-900">{students}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-1">{t("Lecturers")}</p>
          <p className="text-sm font-semibold text-gray-900">{lecturers}</p>
        </div>
      </div>
    </div>
  );
};

export default DepartmentInfoCard;
