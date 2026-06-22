import StatusBadge from "./StatusBadge.tsx";
import type { Letter } from "../../types/letter";

const LetterRow = ({ status, title, university, date }: Letter) => (
  <div className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors group cursor-pointer">
    <div className="flex items-center gap-4">
      <StatusBadge status={status} />
      <div>
        <h4 className="text-sm font-bold text-slate-800">{title}</h4>
        <p className="text-xs text-slate-500 mt-0.5">
          {university} &middot; {date}
        </p>
      </div>
    </div>
    <span className="text-slate-300 group-hover:text-teal-700 transition-colors">
      &rarr;
    </span>
  </div>
);

export default LetterRow;
