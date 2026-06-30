import { useTranslation } from "react-i18next";
import { Search, Plus } from "lucide-react";
import {
  DataTable,
  type DataTableColumn,
} from "../../components/common/DataTable";
import type {
  FacultyPayload,
  Faculty,
  FacultyStatus,
} from "../../types/hierarchy";
import { Badge } from "../../components/ui/badge";
import { useState } from "react";
import { Input } from "../../components/ui/input";
import Modal from "../../components/common/Modal";
import { useUserStore } from "../../store/userStore";
import PageHeader from "../../components/common/PageHeader";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Label } from "../../components/ui/label";
import { BreadcrumbItem } from "../../components/common/BreadcrumbItem";
import { useBreadcrumbAccess } from "../../hooks/useBreadcrumbAccess";
import {
  addFaculty,
  getFacultiesByUniversity,
} from "../../api/faculty";
import { useMutation, useQuery } from "@tanstack/react-query";
import ErrorState from "../../components/common/ErrorState";
import { getUniversityById } from "../../api/university";

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
  const [form, setForm] = useState<FacultyPayload>({
    name: "",
  });

  // get all faculties for a specific university
  const {
    data: faculties = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["faculties", universityId],
    queryFn: () => getFacultiesByUniversity(Number(universityId)),
    enabled: !!universityId,
  });

  // add faculty
  const { mutate: createFaculty, isPending } = useMutation({
    mutationFn: ({
      universityId,
      payload,
    }: {
      universityId: number;
      payload: FacultyPayload;
    }) => addFaculty(universityId, payload),
    onSuccess: () => {
      setForm({
        name: "",
      });
      setShowPopup(false);
      refetch();
    },
    onError: (error: Error) => {
      console.error(error.message);
    },
  });

  // get university by id
  const { data: university } = useQuery({
    queryKey: ["university", universityId],
    queryFn: () => getUniversityById(Number(universityId)),
    enabled: !!universityId,
  });

  const filteredFaculties = faculties.filter(
    (f) =>
      f.name.toLowerCase().includes(filter.toLowerCase()) ||
      f.dean.toLowerCase().includes(filter.toLowerCase()) ||
      f.status.toLowerCase().includes(filter.toLowerCase()),
  );

  function handleModal() {
    setShowPopup((prev) => !prev);
  }

  function handleAddFaculty() {
    if (!form.name.trim()) return;
    createFaculty({ universityId: Number(universityId), payload: form });
  }

  // loading state
  if (isLoading)
    return (
      <div className="min-h-screen bg-[#F7F6F2] px-8 py-8">
        <div className="rounded-xl border border-border bg-white overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5">
            <div className="flex items-center gap-2">
              <div className="h-4 w-20 rounded bg-muted animate-pulse" />
              <div className="h-3 w-14 rounded bg-muted/50 animate-pulse" />
            </div>
            <div className="h-8 w-32 rounded-full bg-muted/50 animate-pulse" />
          </div>

          <div className="grid grid-cols-[2fr_1fr_40px] px-5 py-2.5 border-y border-border">
            {["NAME", "STATUS", ""].map((col, i) => (
              <span
                key={i}
                className={`text-[11px] font-medium tracking-widest text-muted-foreground uppercase ${col === "STATUS" ? "text-right" : ""}`}
              >
                {col}
              </span>
            ))}
          </div>

          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-[2fr_1fr_40px] items-center px-5 py-[18px] border-b border-border last:border-0"
            >
              <div className="flex flex-col gap-1.5">
                <div
                  className="h-3.5 rounded bg-muted animate-pulse"
                  style={{
                    width: `${[60, 52, 48, 56, 50][i]}%`,
                    animationDelay: `${i * 80}ms`,
                  }}
                />
                <div
                  className="h-3 rounded bg-muted/60 animate-pulse"
                  style={{
                    width: `${[40, 36, 38, 34, 42][i]}%`,
                    animationDelay: `${i * 80 + 40}ms`,
                  }}
                />
              </div>
              <div className="flex justify-end">
                <div
                  className="h-6 w-16 rounded-full bg-muted/60 animate-pulse"
                  style={{ animationDelay: `${i * 80 + 100}ms` }}
                />
              </div>
              <div className="flex justify-end">
                <div
                  className="h-3 w-3 rounded bg-muted/50 animate-pulse"
                  style={{ animationDelay: `${i * 80 + 140}ms` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  // error state
  if (isError)
    return (
      <ErrorState title=" Couldn't load faculties" onClick={() => refetch()} />
    );

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
          isLoading={isPending}
        >
          <div className="flex flex-col gap-3">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1">
                {t("Name")}
              </Label>
              <Input
                placeholder={t("e.g. Faculty of Engineering")}
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default FacultiesPage;
