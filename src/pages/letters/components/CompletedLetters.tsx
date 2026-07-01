import { useTranslation } from "react-i18next";
import { getCompletedLettersForUser } from "../../../api/letters";
import LetterListItem from "./LetterListItem";
import { useQuery } from "@tanstack/react-query";
import LetterListItemSkeleton from "../../../components/common/LetterListItemSkeleton";

function CompletedLetters() {
  const { t } = useTranslation();

  const { data: completedLetters, isLoading } = useQuery({
    queryKey: ["completed-letters"],
    queryFn: getCompletedLettersForUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <div className="px-4 py-3 border-b border-gray-100">
        <h2 className="font-semibold text-sm">
          {t("Archived")}
          {!isLoading && (
            <span className="text-gray-400 ms-1">
              {completedLetters?.length}
            </span>
          )}
        </h2>
      </div>

      {isLoading
        ? Array.from({ length: 6 }).map((_, index) => (
            <LetterListItemSkeleton key={index} />
          ))
        : completedLetters?.map((letter) => (
            <LetterListItem key={letter.id} letter={letter} />
          ))}
    </div>
  );
}

export default CompletedLetters;
