import { useTranslation } from "react-i18next";
import { Paperclip } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import type { Letter } from "../../../types/letter";

const statusStyles: Record<string, string> = {
  pending:
    "bg-amber-500/15 text-amber-600 dark:text-amber-400 hover:bg-amber-500/15",
  approved:
    "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/15",
  rejected:
    "bg-red-500/15 text-red-600 dark:text-red-400 hover:bg-red-500/15",
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
      className="flex items-center justify-between px-4 py-4 border-b border-border last:border-b-0 hover:bg-muted cursor-pointer transition-colors"
    >
      <div className="flex items-center gap-3">
        <Badge className={statusStyles[letter.status]}>
          {t(statusLabels[letter.status])}
        </Badge>
        <div>
          <p className="text-sm font-semibold text-foreground">
            {letter.title}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {letter.university} · {letter.letterType}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        {letter.hasAttachment && <Paperclip className="w-4 h-4" />}
        <span className="text-xs">{letter.date}</span>
      </div>
    </div>
  );
}

export default LetterListItem;
