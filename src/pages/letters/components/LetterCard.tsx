import { useTranslation } from "react-i18next";
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

interface LetterCardProps {
  letters: Letter[];
  selectedLetterId: string | number | null;
  onSelect: (letter: Letter) => void;
}

function LetterCard({ letters, selectedLetterId, onSelect }: LetterCardProps) {
  const { t } = useTranslation();

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card h-full">
      <div className="px-4 py-3 border-b border-border">
        <h2 className="font-semibold text-sm">
          {t("Inbox")}
          <span className="text-muted-foreground ms-1">{letters.length}</span>
        </h2>
      </div>
      {letters.map((letter, index) => (
        <div
          key={letter.id}
          onClick={() => onSelect(letter)}
          className={`px-4 py-4 cursor-pointer transition-colors border-s-4 ${
            selectedLetterId === letter.id
              ? "border-s-teal-700 bg-teal-500/10"
              : "border-s-transparent hover:bg-muted"
          } ${index !== letters.length - 1 ? "border-b border-border" : ""}`}
        >
          <div className="flex items-center justify-between mb-1">
            <p className="font-semibold text-sm text-foreground">
              {letter.university}
            </p>
            <Badge className={statusStyles[letter.status]}>
              {t(statusLabels[letter.status])}
            </Badge>
          </div>
          <p className="text-sm font-medium text-foreground">{letter.title}</p>
          <p className="text-xs text-muted-foreground mt-1">{letter.date}</p>
        </div>
      ))}
    </div>
  );
}

export default LetterCard;
