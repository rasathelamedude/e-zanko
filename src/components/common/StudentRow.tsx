import type { Student } from "../../types/student";
import { Pencil, Trash2 } from "lucide-react";

interface StudentRowProps {
  student: Student;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const STAGE_STYLES: Record<number, string> = {
  1: "bg-muted text-muted-foreground",
  2: "bg-teal-500/15 text-teal-700 dark:text-teal-400",
  3: "bg-teal-500/20 text-teal-800 dark:text-teal-300",
  4: "bg-teal-500/25 text-teal-900 dark:text-teal-200",
};

const StudentRow = ({ student, onEdit, onDelete }: StudentRowProps) => {
  return (
    <tr className="border-t border-border hover:bg-muted transition-colors group">
      <td className="px-5 py-3.5 text-sm font-medium text-foreground">
        {student.name}
      </td>
      <td className="px-5 py-3.5 text-sm text-muted-foreground font-mono tracking-tight">
        {student.email}
      </td>
      <td className="px-5 py-3.5">
        <span
          className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-md ${STAGE_STYLES[student.stage]}`}
        >
          {student.stage}
        </span>
      </td>
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity justify-end">
          <button
            onClick={() => onEdit(student.id)}
            className="p-1.5 rounded-lg hover:bg-teal-500/10 text-muted-foreground hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
            aria-label={`Edit ${student.name}`}
          >
            <Pencil size={15} strokeWidth={1.8} />
          </button>
          <button
            onClick={() => onDelete(student.id)}
            className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-500 dark:hover:text-red-400 transition-colors"
            aria-label={`Delete ${student.name}`}
          >
            <Trash2 size={15} strokeWidth={1.8} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default StudentRow;
