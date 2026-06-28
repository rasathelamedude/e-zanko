import { useTranslation } from "react-i18next";
import { Search, Plus } from "lucide-react";
import {
  DataTable,
  type DataTableColumn,
} from "../../components/common/DataTable";
import type { Faculty, FacultyStatus } from "../../types/hierarchy";
import { Badge } from "../../components/ui/badge";
import { useState } from "react";
import { Input } from "../../components/ui/input";
import Modal from "../../components/common/Modal";
import { useUserStore } from "../../store/userStore";
import PageHeader from "../../components/common/PageHeader";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { mockUniversities } from "./UniversitiesPage";
import { Label } from "../../components/ui/label";
import { BreadcrumbItem } from "../../components/common/BreadcrumbItem";
import { useBreadcrumbAccess } from "../../hooks/useBreadcrumbAccess";

export const mockFaculties: Faculty[] = [
  {
    id: 1,
    universityId: 1,
    name: "College of Engineering",
    dean: "Dr. Sara Ahmed",
    status: "ACTIVE",
    adminId: null,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    deletedAt: null,
  },
  {
    id: 2,
    universityId: 1,
    name: "College of Medicine",
    dean: "Dr. Diyar Omar",
    status: "ACTIVE",
    adminId: null,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    deletedAt: null,
  },
  {
    id: 3,
    universityId: 1,
    name: "College of Law",
    dean: "Dr. Lana Jabar",
    status: "ACTIVE",
    adminId: null,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    deletedAt: null,
  },
  {
    id: 4,
    universityId: 1,
    name: "College of Science",
    dean: "Dr. Rebin Faraj",
    status: "ACTIVE",
    adminId: null,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    deletedAt: null,
  },
  {
    id: 5,
    universityId: 1,
    name: "College of Education",
    dean: "Dr. Awat Hama",
    status: "INACTIVE",
    adminId: null,
    isActive: false,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    deletedAt: null,
  },
];

const statusStyles: Record<FacultyStatus, string> = {
  ACTIVE: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  UNDER_REVIEW: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  INACTIVE: "bg-gray-100 text-gray-700 hover:bg-gray-100",
};

const statusLabels: Record<FacultyStatus, string> = {
  ACTIVE: "Active",
  UNDER_REVIEW: "Under review",
  INACTIVE: "Inactive",
};

function FacultiesPage() {
  const { t } = useTranslation();
  const user = useUserStore((state) => state.user);
  const [showPopup, setShowPopup] = useState(false);
  const [filter, setFilter] = useState("");
  const { universityId } = useParams();
  const navigate = useNavigate();
  const { canAccessUniversities } = useBreadcrumbAccess();

  const university = mockUniversities.find(
    (u) => String(u.id) === universityId,
  );

  const filteredFaculties = mockFaculties.filter(
    (f) =>
      f.name.toLowerCase().includes(filter.toLowerCase()) ||
      f.dean.toLowerCase().includes(filter.toLowerCase()) ||
      f.status.toLowerCase().includes(filter.toLowerCase()),
  );

  function handleModal() {
    setShowPopup((prev) => !prev);
  }

  function handleAddFaculty() {
    // Submit logic here
    setShowPopup(false);
  }

  const columns: DataTableColumn<Faculty>[] = [
    {
      key: "name",
      header: t("Name"),
      render: (u) => (
        <span
          onClick={() =>
            navigate(
              `/universities/${universityId}/faculties/${u.id}/departments`,
            )
          }
          className="font-medium text-teal-700 cursor-pointer"
        >
          {u.name}
        </span>
      ),
    },
    {
      key: "dean",
      header: t("Dean"),
      render: (u) => u.dean,
    },
    {
      key: "status",
      header: t("Status"),
      align: "right",
      render: (u) => (
        <Badge className={statusStyles[u.status]}>
          {t(statusLabels[u.status])}
        </Badge>
      ),
    },
  ];

  if (user?.scope === "UNIVERSITY" && user?.scopeId !== Number(universityId)) {
    return <Navigate to="/forbidden" replace />;
  }

  return (
    <div className="min-h-screen bg-[#F7F6F2] px-8 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        {canAccessUniversities && (
          <>
            <BreadcrumbItem
              label={t("Universities")}
              onClick={() => navigate("/universities")}
            />
            <span>/</span>
          </>
        )}
        <BreadcrumbItem label={university?.name ?? t("University")} isCurrent />
      </nav>

      {/* Page header + Add button row */}
      <div className="flex items-start justify-between mb-6">
        <PageHeader
          title={t("Ministry of Higher Education")}
          locationTitle={t("Faculties")}
          role={user?.role || ""}
          year="2025–2026"
        />
        <button
          className="flex items-center gap-1.5 bg-teal-700 hover:bg-teal-800 active:bg-teal-900 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors mt-1 cursor-pointer"
          onClick={handleModal}
        >
          <Plus size={16} strokeWidth={2.5} />
          {t("Add Faculty")}
        </button>
      </div>

      {/* Table card */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        {/* Table toolbar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-700">
              {t("Faculties")}
            </span>
            <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
              {filteredFaculties.length} record
              {filteredFaculties.length !== 1 ? "s" : ""}
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
          data={filteredFaculties}
          getRowId={(u) => String(u.id)}
        />
      </div>

      {showPopup && (
        <Modal
          title={t("Add Faculty")}
          confirmLabel={t("Add Faculty")}
          onClose={() => setShowPopup(false)}
          onConfirm={handleAddFaculty}
        >
          <div className="flex flex-col gap-3">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1">
                {t("Name")}
              </Label>
              <Input
                placeholder={t("e.g. Faculty of Engineering")}
                type="text"
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default FacultiesPage;
