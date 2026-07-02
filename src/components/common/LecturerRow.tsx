import type { Lecturer } from "../../types/lecturer";
import { Pencil, Trash2 } from "lucide-react";

interface LecturerRowProps {
  lecturer: Lecturer;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const LEVEL_STYLES: Record<string, string> = {
  PhD: "bg-teal-500/20 text-teal-800 dark:text-teal-300",
  MSc: "bg-teal-500/15 text-teal-700 dark:text-teal-400",
  BSc: "bg-muted text-muted-foreground",
};

const LecturerRow = ({ lecturer, onEdit, onDelete }: LecturerRowProps) => {
  return (
    <tr className="border-t border-border hover:bg-muted transition-colors group">
      <td className="px-5 py-3.5 text-sm font-medium text-foreground">
        {lecturer.name}
      </td>
      <td className="px-5 py-3.5 text-sm text-muted-foreground font-mono tracking-tight">
        {lecturer.email}
      </td>
      <td className="px-5 py-3.5">
        <span
          className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-md ${LEVEL_STYLES[lecturer.academicLevel]}`}
        >
          {lecturer.academicLevel}
        </span>
      </td>
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity justify-end">
          <button
            onClick={() => onEdit(lecturer.id)}
            className="p-1.5 rounded-lg hover:bg-teal-500/10 text-muted-foreground hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
            aria-label={`Edit ${lecturer.name}`}
          >
            <Pencil size={15} strokeWidth={1.8} />
          </button>
          <button
            onClick={() => onDelete(lecturer.id)}
            className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-500 dark:hover:text-red-400 transition-colors"
            aria-label={`Delete ${lecturer.name}`}
          >
            <Trash2 size={15} strokeWidth={1.8} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default LecturerRow;
