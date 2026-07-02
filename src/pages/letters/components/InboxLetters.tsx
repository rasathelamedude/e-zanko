import { useEffect, useState } from "react";
import LetterCard from "./LetterCard";
import LetterDetails from "./LetterDetails";
import InboxSkeleton from "./InboxSkeleton";
import type { Letter } from "../../../types/letter";
import { getInboxLettersForUser } from "../../../api/letters";
import { useQuery } from "@tanstack/react-query";

function InboxLetters() {
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);

  const { data: letters, isLoading } = useQuery({
    queryKey: ["inbox-letters"],
    queryFn: () => getInboxLettersForUser(),
  });

  // default to the first letter once data arrives
  useEffect(() => {
    const getFirstLetter = () => {
      if (letters && letters.length > 0 && !selectedLetter) {
        setSelectedLetter(letters[0]);
      }
    };

    getFirstLetter();
  }, [letters, selectedLetter]);

  if (isLoading) {
    return <InboxSkeleton />;
  }

  if (!letters || letters.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-gray-400 border border-gray-200 rounded-xl bg-white p-10">
        No letters in your inbox.
      </div>
    );
  }

  return (
    <div className="flex gap-4 h-full">
      <div className="w-80 shrink-0">
        <LetterCard
          letters={letters}
          selectedLetterId={selectedLetter?.id ?? null}
          onSelect={setSelectedLetter}
        />
      </div>
      <div className="flex-1">
        {selectedLetter && <LetterDetails letter={selectedLetter} />}
      </div>
    </div>
  );
}

export default InboxLetters;
