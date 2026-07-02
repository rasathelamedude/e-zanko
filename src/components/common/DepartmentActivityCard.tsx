import { useTranslation } from "react-i18next";
import type { IconType } from "react-icons/lib";

interface DepartmentActivityCardProps {
  label: string;
  lettersThisWeek: number;
  Icon?: IconType;
}

const DepartmentActivityCard = ({
  label,
  lettersThisWeek,
  Icon,
}: DepartmentActivityCardProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-3 bg-card rounded-xl border border-border px-4 py-3 shadow-sm">
      <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center shrink-0 overflow-hidden">
        {Icon ? (
          <Icon className="w-full h-full object-cover" />
        ) : (
          <span className="w-5 h-5 rounded bg-teal-200 block" />
        )}
      </div>

      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {lettersThisWeek}{" "}
          {lettersThisWeek !== 1
            ? t("letters this week")
            : t("letter this week")}
        </p>
      </div>
    </div>
  );
};

export default DepartmentActivityCard;
