import { useState } from "react";
import { Search, Plus } from "lucide-react";
import PageHeader from "../../components/common/PageHeader";
import type { Student } from "../../types/student";
import EmptyTable from "../../components/common/EmptyTable";
import StudentRow from "../../components/common/StudentRow";
import Breadcrumb from "../../components/common/Breadcrumb";

const STUDENTS: Student[] = [
  { id: 1, name: "Ahmed Salih", email: "ahmed.salih@kou.edu.iq", stage: 3 },
  { id: 2, name: "Dilan Nawzad", email: "dilan.nawzad@kou.edu.iq", stage: 1 },
  { id: 3, name: "Renas Kamal", email: "renas.kamal@kou.edu.iq", stage: 4 },
  {
    id: 4,
    name: "Trifa Boran",
    email: "trifa.boran@kou.edu.iq",
    stage: 1,
  },
  {
    id: 5,
    name: "Hawkar Zana",
    email: "hawkar.zana@kou.edu.iq",
    stage: 3,
  },
  {
    id: 6,
    name: "Shilan Omar",
    email: "shilan.omar@kou.edu.iq",
    stage: 1,
  },
  {
    id: 7,
    name: "Rezan Mustafa",
    email: "rezan.mustafa@kou.edu.iq",
    stage: 2,
  },
  {
    id: 8,
    name: "Karwan Aziz",
    email: "karwan.aziz@kou.edu.iq",
    stage: 4,
  },
];

const StudentsPage = () => {
  const [filter, setFilter] = useState("");
  const [students, setStudents] = useState<Student[]>(STUDENTS);

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(filter.toLowerCase()) ||
      s.email.toLowerCase().includes(filter.toLowerCase()) ||
      s.stage.toString().includes(filter.toLowerCase()),
  );

  const handleEdit = (id: number) => {
    console.log("Edit student", id);
  };

  const handleDelete = (id: number) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] px-8 py-8">
      <Breadcrumb />

      {/* Page header + Add button row */}
      <div className="flex items-start justify-between">
        <PageHeader
          title="Software Engineering"
          locationTitle="Students"
          role="Head of Dept."
          year="2025–2026"
        />
        <button className="flex items-center gap-1.5 bg-teal-700 hover:bg-teal-800 active:bg-teal-900 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors mt-1 cursor-pointer">
          <Plus size={16} strokeWidth={2.5} />
          Add Student
        </button>
      </div>

      {/* Table card */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        {/* Table toolbar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-700">
              Students
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
                Stage
              </th>
              <th className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((student) => (
                <StudentRow
                  key={student.id}
                  student={student}
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

export default StudentsPage;
