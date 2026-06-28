import type { Lecturer } from "../../types/lecturer";
import { Pencil, Trash2 } from "lucide-react";

interface LecturerRowProps {
  lecturer: Lecturer;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const LEVEL_STYLES: Record<string, string> = {
  PhD: "bg-teal-100 text-teal-800",
  MSc: "bg-teal-50 text-teal-700",
  BSc: "bg-slate-100 text-slate-600",
};

const LecturerRow = ({ lecturer, onEdit, onDelete }: LecturerRowProps) => {
  return (
    <tr className="border-t border-slate-100 hover:bg-slate-50 transition-colors group">
      <td className="px-5 py-3.5 text-sm font-medium text-slate-800">
        {lecturer.name}
      </td>
      <td className="px-5 py-3.5 text-sm text-slate-500 font-mono tracking-tight">
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
            className="p-1.5 rounded-lg hover:bg-teal-50 text-slate-400 hover:text-teal-700 transition-colors"
            aria-label={`Edit ${lecturer.name}`}
          >
            <Pencil size={15} strokeWidth={1.8} />
          </button>
          <button
            onClick={() => onDelete(lecturer.id)}
            className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
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
