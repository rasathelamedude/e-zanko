import LetterRow from "./LetterRow";
import type { Letter } from "../../types/letter";
import { Link } from "react-router-dom";

interface Props {
  letters: Letter[];
  inboxHref?: string;
}

const RecentLetters = ({ letters, inboxHref = "/inbox" }: Props) => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
    <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
      <h3 className="font-bold text-slate-800">Recent letters</h3>
      <Link
        to={inboxHref}
        className="text-sm font-medium text-teal-700 hover:text-teal-800 transition-colors"
      >
        View inbox &rarr;
      </Link>
    </div>

    <div className="divide-y divide-slate-100">
      {letters.map((letter) => (
        <LetterRow key={letter.id} {...letter} />
      ))}
    </div>
  </div>
);

export default RecentLetters;
