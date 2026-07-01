import { useTranslation } from "react-i18next";
import { getOutboxLettersForUser } from "../../../api/letters";
import LetterListItem from "./LetterListItem";
import { useQuery } from "@tanstack/react-query";

function OutboxLetters() {
  const { t } = useTranslation();

  const { data: outboxLetters = [] } = useQuery({
    queryKey: ["outboxLetters"],
    queryFn: getOutboxLettersForUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <div className="px-4 py-3 border-b border-gray-100">
        <h2 className="font-semibold text-sm">
          {t("Outbox")}
          <span className="text-gray-400 ms-1">{outboxLetters.length}</span>
        </h2>
      </div>
      {outboxLetters.map((letter) => (
        <LetterListItem key={letter.id} letter={letter} />
      ))}
    </div>
  );
}

export default OutboxLetters;
