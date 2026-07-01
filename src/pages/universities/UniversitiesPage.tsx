import { useTranslation } from "react-i18next";
import { Search, Plus, AlertTriangle } from "lucide-react";
import {
  DataTable,
  type DataTableColumn,
} from "../../components/common/DataTable";
import type {
  University,
  UniversityPayload,
  UniversityStatus,
} from "../../types/hierarchy";
import { Badge } from "../../components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { Input } from "../../components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../../components/common/Modal";
import { Label } from "../../components/ui/label";
import PageHeader from "../../components/common/PageHeader";
import { useUserStore } from "../../store/userStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addUniversity,
  deleteUniversity,
  getAllUniversities,
  updateUniversity,
} from "../../api/university";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import ErrorState from "../../components/common/ErrorState";
import { notifySuccess } from "../../lib/notify";

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

type ModalState =
  | { type: "add" }
  | { type: "edit"; university: University }
  | { type: "delete"; university: University }
  | null;

function UniversitiesPage() {
  const { t } = useTranslation();
  const [modal, setModal] = useState<ModalState>(null);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const [form, setForm] = useState<UniversityPayload>({
    name: "",
    location: "",
    establishedYear: new Date().toISOString().split("T")[0],
    isActive: true,
  });

  // get all universities
  const {
    data: universities = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["universities"],
    queryFn: getAllUniversities,
  });

  // add university — errors surface via the global toast handler
  const { mutate: createUniversity, isPending } = useMutation({
    mutationFn: addUniversity,
    onSuccess: () => {
      setModal(null);
      setForm({
        name: "",
        location: "",
        establishedYear: "",
        isActive: true,
      });
      refetch();
      notifySuccess(t("University added."));
    },
  });

  // edit university
  const { mutate: editUniversity, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UniversityPayload }) =>
      updateUniversity(id, payload),
    onSuccess: () => {
      setModal(null);
      setForm({ name: "", location: "", establishedYear: "", isActive: true });
      refetch();
      notifySuccess(t("University updated."));
    },
  });

  // delete university
  const { mutate: removeUniversity, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => deleteUniversity(id),
    onSuccess: () => {
      setModal(null);
      refetch();
      notifySuccess(t("University deleted."));
    },
  });

  function handleAddUniversity() {
    if (!form.name.trim() || !form.location.trim()) return;
    createUniversity(form);
  }

  function handleUpdateUniversity() {
    if (!form.name.trim() || !form.location.trim()) return;
    if (modal?.type !== "edit") return;
    editUniversity({ id: modal.university.id, payload: form });
  }

  // loading state
  if (isLoading)
    return (
      <div className="min-h-screen bg-[#F7F6F2] px-8 py-8">
        <div className="rounded-xl border border-border bg-white overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5">
            <div className="flex items-center gap-2">
              <div className="h-4 w-24 rounded bg-muted animate-pulse" />
              <div className="h-3 w-14 rounded bg-muted/50 animate-pulse" />
            </div>
            <div className="h-8 w-40 rounded-full bg-muted/50 animate-pulse" />
          </div>

          <div className="grid grid-cols-[2fr_1.5fr_1fr_80px] px-5 py-2.5 border-y border-border">
            {["NAME", "PRESIDENT", "STATUS", "ACTIONS"].map((col) => (
              <span
                key={col}
                className={`text-[11px] font-medium tracking-widest text-muted-foreground uppercase ${col === "ACTIONS" ? "text-right" : ""}`}
              >
                {col}
              </span>
            ))}
          </div>

          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-[2fr_1.5fr_1fr_80px] items-center px-5 py-4.5 border-b border-border last:border-0"
            >
              <div
                className="h-3.5 rounded bg-muted animate-pulse"
                style={{
                  width: `${[62, 55, 70, 50, 65][i]}%`,
                  animationDelay: `${i * 80}ms`,
                }}
              />
              <div
                className="h-3 rounded bg-muted/60 animate-pulse"
                style={{
                  width: `${[55, 48, 60, 52, 45][i]}%`,
                  animationDelay: `${i * 80 + 50}ms`,
                }}
              />
              <div
                className="h-6 w-16 rounded-full bg-muted/60 animate-pulse"
                style={{ animationDelay: `${i * 80 + 100}ms` }}
              />
              <div className="flex justify-end gap-2">
                <div
                  className="w-7 h-7 rounded-full bg-muted/60 animate-pulse"
                  style={{ animationDelay: `${i * 80 + 140}ms` }}
                />
                <div
                  className="w-7 h-7 rounded-full bg-muted/60 animate-pulse"
                  style={{ animationDelay: `${i * 80 + 170}ms` }}
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
      <ErrorState title=" Couldn't load universities" onClick={() => refetch()} />
    );

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
            onClick={() => {
              setForm({
                name: u.name,
                location: u.location,
                establishedYear: u.establishedYear,
                isActive: u.isActive,
              });
              setModal({ type: "edit", university: u });
            }}
            aria-label={`${t("Edit")} ${u.name}`}
            className="rounded-md p-2 text-teal-600 hover:bg-teal-50"
          >
            <Pencil className="h-4 w-4 cursor-pointer" />
          </button>
          <button
            onClick={() => setModal({ type: "delete", university: u })}
            aria-label={`${t("Delete")} ${u.name}`}
            className="rounded-md p-2 text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4 cursor-pointer" />
          </button>
        </div>
      ),
    },
  ];

  const filteredUniversities = universities.filter(
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
          role={user?.roles[0]?.name || ""}
          year="2025-2026"
        />
        <button
          className="flex items-center gap-1.5 bg-teal-700 hover:bg-teal-800 active:bg-teal-900 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors mt-1 cursor-pointer"
          onClick={() => setModal({ type: "add" })}
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

      {/* add university popup */}
      {modal?.type === "add" && (
        <Modal
          title={t("Add University")}
          confirmLabel={t("Add University")}
          onClose={() => setModal(null)}
          onConfirm={handleAddUniversity}
          isLoading={isPending}
        >
          <div className="flex flex-col gap-3">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1">
                {t("Name")}
              </Label>
              <Input
                placeholder={t("e.g. University of Sulaimani")}
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                type="text"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1">
                {t("Location")}
              </Label>
              <Input
                placeholder={t("e.g. Sulaimani")}
                value={form.location}
                onChange={(e) =>
                  setForm((f) => ({ ...f, location: e.target.value }))
                }
                type="text"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1">
                {t("Established Year")}
              </Label>
              <Input
                value={form.establishedYear}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    establishedYear: e.target.value,
                  }))
                }
                type="date"
              />
            </div>

            <div className="flex items-center justify-between py-1">
              <Label className="text-sm font-medium text-gray-700">
                {t("Active")}
              </Label>
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) =>
                  setForm((f) => ({ ...f, isActive: e.target.checked }))
                }
                defaultChecked={true}
                className="w-4 h-4 accent-teal-700"
              />
            </div>
          </div>
        </Modal>
      )}

      {/* edit university popup */}
      {modal?.type === "edit" && (
        <Modal
          title={t("Update University")}
          confirmLabel={t("Update University")}
          onClose={() => setModal(null)}
          onConfirm={handleUpdateUniversity}
          isLoading={isUpdating}
        >
          <div className="flex flex-col gap-3">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1">
                {t("Name")}
              </Label>
              <Input
                placeholder={t("e.g. University of Sulaimani")}
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                type="text"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1">
                {t("Location")}
              </Label>
              <Input
                placeholder={t("e.g. Sulaimani")}
                value={form.location}
                onChange={(e) =>
                  setForm((f) => ({ ...f, location: e.target.value }))
                }
                type="text"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1">
                {t("Established Year")}
              </Label>
              <Input
                value={form.establishedYear}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    establishedYear: e.target.value,
                  }))
                }
                type="date"
              />
            </div>

            <div className="flex items-center justify-between py-1">
              <Label className="text-sm font-medium text-gray-700">
                {t("Active")}
              </Label>
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) =>
                  setForm((f) => ({ ...f, isActive: e.target.checked }))
                }
                defaultChecked={true}
                className="w-4 h-4 accent-teal-700"
              />
            </div>
          </div>
        </Modal>
      )}

      {/* delete university confirmation popup */}
      {modal?.type === "delete" && (
        <ConfirmDialog
          title={t("Delete University")}
          description={`Are you sure you want to delete ${modal.university.name}? This action cannot be undone.`}
          onClose={() => setModal(null)}
          onConfirm={() => removeUniversity(modal.university.id)}
          isLoading={isDeleting}
        />
      )}
    </div>
  );
}

export default UniversitiesPage;
