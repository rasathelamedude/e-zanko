import StatusBadge from "./StatusBadge.tsx";
import type { Letter } from "../../types/letter";

const LetterRow = ({ status, title, university, date }: Letter) => (
  <div className="px-6 py-4 flex items-center justify-between hover:bg-muted transition-colors group cursor-pointer">
    <div className="flex items-center gap-4">
      <StatusBadge status={status} />
      <div>
        <h4 className="text-sm font-bold text-foreground">{title}</h4>
        <p className="text-xs text-muted-foreground mt-0.5">
          {university} &middot; {date}
        </p>
      </div>
    </div>
    <span className="text-muted-foreground group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors rtl:rotate-180">
      &rarr;
    </span>
  </div>
);

export default LetterRow;
