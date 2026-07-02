import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LetterRow from "./LetterRow";
import type { Letter } from "../../types/letter";

interface Props {
  letters: Letter[];
  inboxHref?: string;
}

const RecentLetters = ({ letters, inboxHref = "/letters" }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between">
        <h3 className="font-bold text-foreground">{t("Recent letters")}</h3>
        <Link
          to={inboxHref}
          className="text-sm font-medium text-teal-700 dark:text-teal-400 hover:text-teal-800 transition-colors"
        >
          {t("View inbox")}{" "}
          <span className="inline-block rtl:rotate-180">&rarr;</span>
        </Link>
      </div>

      <div className="divide-y divide-border">
        {letters.map((letter) => (
          <LetterRow key={letter.id} {...letter} />
        ))}
      </div>
    </div>
  );
};

export default RecentLetters;
