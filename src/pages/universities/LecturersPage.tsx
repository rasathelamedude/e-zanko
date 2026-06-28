import { useState } from "react";
import { Search, Plus } from "lucide-react";
import PageHeader from "../../components/common/PageHeader";
import type { Lecturer } from "../../types/lecturer";
import EmptyTable from "../../components/common/EmptyTable";
import LecturerRow from "../../components/common/LecturerRow";
import Breadcrumb from "../../components/common/Breadcrumb";

const LECTURERS: Lecturer[] = [
  {
    id: 1,
    name: "Dr. Layla Hassan",
    email: "layla.hassan@kou.edu.krd",
    academicLevel: "PhD",
  },
  {
    id: 2,
    name: "Dr. Karim Yusuf",
    email: "karim.yusuf@kou.edu.krd",
    academicLevel: "PhD",
  },
  {
    id: 3,
    name: "Sana Mahmud",
    email: "sana.mahmud@kou.edu.krd",
    academicLevel: "MSc",
  },
  {
    id: 4,
    name: "Rawa Jalal",
    email: "rawa.jalal@kou.edu.krd",
    academicLevel: "MSc",
  },
];

const LecturersPage = () => {
  const [filter, setFilter] = useState("");
  const [lecturers, setLecturers] = useState<Lecturer[]>(LECTURERS);

  const filtered = lecturers.filter(
    (l) =>
      l.name.toLowerCase().includes(filter.toLowerCase()) ||
      l.email.toLowerCase().includes(filter.toLowerCase()) ||
      l.academicLevel.toLowerCase().includes(filter.toLowerCase()),
  );

  const handleEdit = (id: number) => {
    console.log("Edit lecturer", id);
  };

  const handleDelete = (id: number) => {
    setLecturers((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] px-8 py-8">
      <Breadcrumb />

      {/* Page header + Add button row */}
      <div className="flex items-start justify-between">
        <PageHeader
          title="Software Engineering"
          locationTitle="Lecturers"
          role="Head of Dept."
          year="2025–2026"
        />
        <button className="flex items-center gap-1.5 bg-teal-700 hover:bg-teal-800 active:bg-teal-900 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors mt-1 cursor-pointer">
          <Plus size={16} strokeWidth={2.5} />
          Add Lecturer
        </button>
      </div>

      {/* Table card */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        {/* Table toolbar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-700">
              Lecturers
            </span>
            <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
              {filtered.length} record{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Filter input */}
          <div className="relative">
            <Search
              size={14}
              strokeWidth={2}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Filter..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-8 pr-4 py-2 text-sm border border-slate-200 rounded-xl w-52 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <table className="w-full">
          <thead>
            <tr className="text-left bg-slate-50">
              <th className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                University Email
              </th>
              <th className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Academic Level
              </th>
              <th className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((lecturer) => (
                <LecturerRow
                  key={lecturer.id}
                  lecturer={lecturer}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <EmptyTable />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LecturersPage;
