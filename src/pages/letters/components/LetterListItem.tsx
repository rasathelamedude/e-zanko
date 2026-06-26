import { useTranslation } from "react-i18next";
import { Paperclip } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import type { Letter } from "../../../types/letter";

const statusStyles: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  approved: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  rejected: "bg-red-100 text-red-700 hover:bg-red-100",
};

const statusLabels: Record<string, string> = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
};

interface LetterListItemProps {
  letter: Letter;
  onClick?: (letter: Letter) => void;
}

function LetterListItem({ letter, onClick }: LetterListItemProps) {
  const { t } = useTranslation();

  return (
    <div
      onClick={() => onClick?.(letter)}
      className="flex items-center justify-between px-4 py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors"
    >
      <div className="flex items-center gap-3">
        <Badge className={statusStyles[letter.status]}>
          {t(statusLabels[letter.status])}
        </Badge>
        <div>
          <p className="text-sm font-semibold text-gray-800">{letter.title}</p>
          <p className="text-xs text-gray-400 mt-0.5">
            {letter.university} · {letter.letterType}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-gray-400">
        {letter.hasAttachment && <Paperclip className="w-4 h-4" />}
        <span className="text-xs">{letter.date}</span>
      </div>
    </div>
  );
}

export default LetterListItem;
