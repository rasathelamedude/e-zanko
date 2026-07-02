import { useTranslation } from "react-i18next";
import type { LetterStatus } from "../../types/letter";

interface Props {
  status: LetterStatus;
}

const STATUS_STYLES: Record<LetterStatus, string> = {
  pending: "bg-orange-500/15 text-orange-600 dark:text-orange-400",
  approved: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  rejected: "bg-red-500/15 text-red-600 dark:text-red-400",
};

const STATUS_LABEL: Record<LetterStatus, string> = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
};

const StatusBadge = ({ status }: Props) => {
  const { t } = useTranslation();

  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap ${STATUS_STYLES[status]}`}
    >
      {t(STATUS_LABEL[status])}
    </span>
  );
};

export default StatusBadge;
