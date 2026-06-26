import { useTranslation } from "react-i18next";
import { mockLetters } from "../../../api/letters";
import LetterListItem from "./LetterListItem";

const archivedLetters = mockLetters.filter((l) => l.letterType === "archived");

function ArchivedLetters() {
  const { t } = useTranslation();

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <div className="px-4 py-3 border-b border-gray-100">
        <h2 className="font-semibold text-sm">
          {t("Archived")}
          <span className="text-gray-400 ms-1">{archivedLetters.length}</span>
        </h2>
      </div>
      {archivedLetters.map((letter) => (
        <LetterListItem key={letter.id} letter={letter} />
      ))}
    </div>
  );
}

export default ArchivedLetters;
