import { useTranslation } from "react-i18next";
import { Search, Plus } from "lucide-react";
import {
  DataTable,
  type DataTableColumn,
} from "../../components/common/DataTable";
import type { University, UniversityStatus } from "../../types/hierarchy";
import { Badge } from "../../components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { Input } from "../../components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../../components/common/Modal";
import { Label } from "../../components/ui/label";
import PageHeader from "../../components/common/PageHeader";
import { useUserStore } from "../../store/userStore";

export const mockUniversities: University[] = [
  {
    id: 1,
    name: "Salahaddin University",
    president: "Dr. Aram Qadir",
    status: "ACTIVE",
    adminId: null,
    academicYear: null,
    location: "Erbil",
    startDate: null,
    endDate: null,
    establishedYear: "1991-01-01",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    deletedAt: null,
  },
  {
    id: 2,
    name: "University of Sulaimani",
    president: "Dr. Shilan Rashid",
    status: "ACTIVE",
    adminId: null,
    academicYear: null,
    location: "Sulaimani",
    startDate: null,
    endDate: null,
    establishedYear: "1970-01-01",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    deletedAt: null,
  },
  {
    id: 3,
    name: "University of Duhok",
    president: "Dr. Hemin Tahir",
    status: "ACTIVE",
    adminId: null,
    academicYear: null,
    location: "Duhok",
    startDate: null,
    endDate: null,
    establishedYear: "1987-01-01",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    deletedAt: null,
  },
  {
    id: 4,
    name: "University of Halabja",
    president: "Dr. Nask Ali",
    status: "INACTIVE",
    adminId: null,
    academicYear: null,
    location: "Halabja",
    startDate: null,
    endDate: null,
    establishedYear: "2010-01-01",
    isActive: false,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    deletedAt: null,
  },
  {
    id: 5,
    name: "University of Garmian",
    president: "Dr. Karwan Saeed",
    status: "ACTIVE",
    adminId: null,
    academicYear: null,
    location: "Kalar",
    startDate: null,
    endDate: null,
    establishedYear: "2005-01-01",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    deletedAt: null,
  },
];

const statusStyles: Record<UniversityStatus, string> = {
  ACTIVE: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  UNDER_REVIEW: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  INACTIVE: "bg-gray-100 text-gray-700 hover:bg-gray-100",
};

const statusLabels: Record<UniversityStatus, string> = {
  ACTIVE: "Active",
  UNDER_REVIEW: "Under review",
  INACTIVE: "Inactive",
};

function UniversitiesPage() {
  const { t } = useTranslation();
  const [showPopup, setShowPopup] = useState(false);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  function handleModal() {
    setShowPopup((prev) => !prev);
  }

  function handleAddUniversity() {
    // Submit logic here
    setShowPopup(false);
  }

  const columns: DataTableColumn<University>[] = [
    {
      key: "name",
      header: t("Name"),
      render: (u) => (
        <span
          onClick={() => navigate(`/universities/${u.id}/faculties`)}
          className="font-medium text-teal-700 cursor-pointer"
        >
          {u.name}
        </span>
      ),
    },
    {
      key: "president",
      header: t("President"),
      render: (u) => u.president,
    },
    {
      key: "status",
      header: t("Status"),
      render: (u: University) => (
        <Badge className={statusStyles[u.status]}>
          {t(statusLabels[u.status])}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: t("Actions"),
      align: "right",
      render: (u) => (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => console.log("edit", u.id)}
            aria-label={`${t("Edit")} ${u.name}`}
            className="rounded-md p-2 text-teal-600 hover:bg-teal-50"
          >
            <Pencil className="h-4 w-4 cursor-pointer" />
          </button>
          <button
            onClick={() => console.log("delete", u.id)}
            aria-label={`${t("Delete")} ${u.name}`}
            className="rounded-md p-2 text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4 cursor-pointer" />
          </button>
        </div>
      ),
    },
  ];

  const filteredUniversities = mockUniversities.filter(
    (u) =>
      u.name.toLowerCase().includes(filter.toLowerCase()) ||
      u.president?.toLowerCase().includes(filter.toLowerCase()) ||
      u.location.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#F7F6F2] px-8 py-8">
      {/* Page header + Add button row */}
      <div className="flex items-start justify-between mb-6">
      <PageHeader 
      title={t("Ministry of Higher Education")}
      locationTitle={t("Universities")}
      role={user?.role || ""}
      year="2025-2026"
      />
      <button
          className="flex items-center gap-1.5 bg-teal-700 hover:bg-teal-800 active:bg-teal-900 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors mt-1 cursor-pointer"
          onClick={handleModal}
        >
          <Plus size={16} strokeWidth={2.5} />
          {t("Add University")}
        </button>
      </div>

      {/* Table card */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        {/* Table toolbar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-700">
              {t("Universities")}
            </span>
            <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
              {filteredUniversities.length} record
              {filteredUniversities.length !== 1 ? "s" : ""}
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
              placeholder={t("Filter...")}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-8 pr-4 py-2 text-sm border border-slate-200 rounded-xl w-52 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={filteredUniversities}
          getRowId={(u) => String(u.id)}
        />
      </div>

      {showPopup && (
        <Modal
          title={t("Add University")}
          confirmLabel={t("Add University")}
          onClose={() => setShowPopup(false)}
          onConfirm={handleAddUniversity}
        >
          <div className="flex flex-col gap-3">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1">
                {t("Name")}
              </Label>
              <Input
                placeholder={t("e.g. University of Sulaimani")}
                type="text"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1">
                {t("Location")}
              </Label>
              <Input placeholder={t("e.g. Sulaimani")} type="text" />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1">
                {t("Established Year")}
              </Label>
              <Input type="date" />
            </div>

            <div className="flex items-center justify-between py-1">
              <Label className="text-sm font-medium text-gray-700">
                {t("Active")}
              </Label>
              <input
                type="checkbox"
                defaultChecked={true}
                className="w-4 h-4 accent-teal-700"
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default UniversitiesPage;
