import { useTranslation } from "react-i18next";
import type { LetterStatus } from "../../types/letter";

interface Props {
  status: LetterStatus;
}

const STATUS_STYLES: Record<LetterStatus, string> = {
  pending: "bg-[#fdf2f8] text-[#9d4b30]",
  approved: "bg-emerald-50 text-emerald-700",
  rejected: "bg-red-50 text-red-700",
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
