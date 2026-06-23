import { useState } from "react";
import LetterCard from "./LetterCard";
import LetterDetails from "./LetterDetails";
import { mockLetters } from "../../../api/letters";
import type { Letter } from "../../../types/letter";

function InboxLetters() {
  const [selectedLetter, setSelectedLetter] = useState<Letter>(mockLetters[0]);

  return (
    <div className="flex gap-4 h-full">
      <div className="w-80 flex-shrink-0">
        <LetterCard
          selectedLetterId={selectedLetter.id}
          onSelect={setSelectedLetter}
        />
      </div>
      <div className="flex-1">
        <LetterDetails letter={selectedLetter} />
      </div>
    </div>
  );
}

export default InboxLetters;