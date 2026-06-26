import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "../../../components/ui/badge";
import type { Letter } from "../../../types/letter";
import { getLetters, mockLetters } from "../../../api/letters";

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

interface LetterCardProps {
  selectedLetterId: string | number;
  onSelect: (letter: Letter) => void;
}

function LetterCard({ selectedLetterId, onSelect }: LetterCardProps) {
  const { t } = useTranslation();
  const [letters, setLetters] = useState<Letter[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getLetters();
      setLetters(data);
    };

    fetchData();
  }, []);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white h-full">
      <div className="px-4 py-3 border-b border-gray-100">
        <h2 className="font-semibold text-sm">
          {t("Inbox")}
          <span className="text-gray-400 ms-1">{letters.length}</span>
        </h2>
      </div>
      {letters.map((letter, index) => (
        <div
          key={letter.id}
          onClick={() => onSelect(letter)}
          className={`px-4 py-4 cursor-pointer transition-colors border-s-4 ${
            selectedLetterId === letter.id
              ? "border-s-teal-700 bg-teal-50/50"
              : "border-s-transparent hover:bg-gray-50"
          } ${index !== mockLetters.length - 1 ? "border-b border-gray-100" : ""}`}
        >
          <div className="flex items-center justify-between mb-1">
            <p className="font-semibold text-sm text-gray-800">
              {letter.university}
            </p>
            <Badge className={statusStyles[letter.status]}>
              {t(statusLabels[letter.status])}
            </Badge>
          </div>
          <p className="text-sm font-medium text-gray-700">{letter.title}</p>
          <p className="text-xs text-gray-400 mt-1">{letter.date}</p>
        </div>
      ))}
    </div>
  );
}

export default LetterCard;
