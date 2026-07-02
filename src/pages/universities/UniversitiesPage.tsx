import { useTranslation } from "react-i18next";
import { Search, Plus, Building2, Pencil, Trash2, X } from "lucide-react";
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
import { Input } from "../../components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../../components/common/Modal";
import { Label } from "../../components/ui/label";
import PageHeader from "../../components/common/PageHeader";
import PageTransition from "../../components/common/PageTransition";
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
  ACTIVE:
    "bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/15 dark:text-emerald-400",
  UNDER_REVIEW:
    "bg-amber-500/15 text-amber-600 hover:bg-amber-500/15 dark:text-amber-400",
  INACTIVE: "bg-muted text-muted-foreground hover:bg-muted",
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

// --- Draft shape for the "Add University" structure builder (UI only) --------
interface DepartmentDraft {
  name: string;
  head: string;
}
interface FacultyDraft {
  name: string;
  dean: string;
  departments: DepartmentDraft[];
}
interface UniversityDraft {
  name: string;
  president: string;
  faculties: FacultyDraft[];
}

const emptyDraft: UniversityDraft = { name: "", president: "", faculties: [] };

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
  const [draft, setDraft] = useState<UniversityDraft>(emptyDraft);

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
      setDraft(emptyDraft);
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

  // --- Draft builder helpers -------------------------------------------------
  const addFaculty = () =>
    setDraft((d) => ({
      ...d,
      faculties: [...d.faculties, { name: "", dean: "", departments: [] }],
    }));

  const removeFaculty = (fi: number) =>
    setDraft((d) => ({
      ...d,
      faculties: d.faculties.filter((_, i) => i !== fi),
    }));

  const updateFaculty = (fi: number, patch: Partial<FacultyDraft>) =>
    setDraft((d) => ({
      ...d,
      faculties: d.faculties.map((f, i) => (i === fi ? { ...f, ...patch } : f)),
    }));

  const addDepartment = (fi: number) =>
    setDraft((d) => ({
      ...d,
      faculties: d.faculties.map((f, i) =>
        i === fi
          ? { ...f, departments: [...f.departments, { name: "", head: "" }] }
          : f,
      ),
    }));

  const removeDepartment = (fi: number, di: number) =>
    setDraft((d) => ({
      ...d,
      faculties: d.faculties.map((f, i) =>
        i === fi
          ? { ...f, departments: f.departments.filter((_, j) => j !== di) }
          : f,
      ),
    }));

  const updateDepartment = (
    fi: number,
    di: number,
    patch: Partial<DepartmentDraft>,
  ) =>
    setDraft((d) => ({
      ...d,
      faculties: d.faculties.map((f, i) =>
        i === fi
          ? {
              ...f,
              departments: f.departments.map((dep, j) =>
                j === di ? { ...dep, ...patch } : dep,
              ),
            }
          : f,
      ),
    }));

  function handleAddUniversity() {
    if (!draft.name.trim()) return;
    // TODO: send `draft.president` + `draft.faculties` (with departments) once
    // the backend accepts the nested structure. For now we create the core
    // university record via the existing endpoint.
    createUniversity({
      name: draft.name,
      location: "",
      establishedYear: new Date().toISOString().split("T")[0],
      isActive: true,
    });
  }

  function handleUpdateUniversity() {
    if (!form.name.trim() || !form.location.trim()) return;
    if (modal?.type !== "edit") return;
    editUniversity({ id: modal.university.id, payload: form });
  }

  // loading state
  if (isLoading)
    return (
      <div className="bg-background px-8 py-8">
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between px-5 py-3.5">
            <div className="flex items-center gap-2">
              <div className="h-4 w-24 rounded bg-muted animate-pulse" />
              <div className="h-3 w-14 rounded bg-muted/50 animate-pulse" />
            </div>
            <div className="h-8 w-40 rounded-full bg-muted/50 animate-pulse" />
          </div>

          <div className="grid grid-cols-[2fr_1.5fr_1fr_80px] border-y border-border px-5 py-2.5">
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
              className="grid grid-cols-[2fr_1.5fr_1fr_80px] items-center border-b border-border px-5 py-4.5 last:border-0"
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
                  className="h-7 w-7 rounded-full bg-muted/60 animate-pulse"
                  style={{ animationDelay: `${i * 80 + 140}ms` }}
                />
                <div
                  className="h-7 w-7 rounded-full bg-muted/60 animate-pulse"
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
          className="cursor-pointer font-medium text-teal-700 dark:text-teal-400"
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
            className="rounded-md p-2 text-teal-600 hover:bg-teal-500/10 dark:text-teal-400"
          >
            <Pencil className="h-4 w-4 cursor-pointer" />
          </button>
          <button
            onClick={() => setModal({ type: "delete", university: u })}
            aria-label={`${t("Delete")} ${u.name}`}
            className="rounded-md p-2 text-red-600 hover:bg-red-500/10 dark:text-red-400"
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
    <PageTransition className="bg-background px-8 py-8">
      {/* Page header + Add button row */}
      <div className="mb-6 flex items-start justify-between">
        <PageHeader
          title={t("Ministry of Higher Education")}
          locationTitle={t("Universities")}
          role={user?.roles[0]?.name || ""}
          year="2025-2026"
        />
        <button
          className="mt-1 flex cursor-pointer items-center gap-1.5 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-800 active:bg-teal-900"
          onClick={() => {
            setDraft(emptyDraft);
            setModal({ type: "add" });
          }}
        >
          <Plus size={16} strokeWidth={2.5} />
          {t("Add University")}
        </button>
      </div>

      {/* Table card */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        {/* Table toolbar */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground">
              {t("Universities")}
            </span>
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
              {filteredUniversities.length} record
              {filteredUniversities.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Filter input */}
          <div className="relative">
            <Search
              size={14}
              strokeWidth={2}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder={t("Filter...")}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-52 rounded-xl border border-border bg-muted/40 py-2 pl-8 pr-4 text-sm text-foreground placeholder-muted-foreground transition-all focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
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

      {/* add university popup — structure builder */}
      {modal?.type === "add" && (
        <Modal
          title={t("Add University")}
          confirmLabel={t("Add University")}
          onClose={() => setModal(null)}
          onConfirm={handleAddUniversity}
          isLoading={isPending}
          size="lg"
        >
          <div className="flex flex-col gap-5">
            {/* Core fields */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label className="mb-1 text-sm font-medium text-foreground">
                  {t("Name")}
                </Label>
                <Input
                  placeholder={t("e.g. University of Sulaimani")}
                  value={draft.name}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, name: e.target.value }))
                  }
                  type="text"
                />
              </div>
              <div>
                <Label className="mb-1 text-sm font-medium text-foreground">
                  {t("President")}
                </Label>
                <Input
                  placeholder={t("e.g. Dr. Aram Qadir")}
                  value={draft.president}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, president: e.target.value }))
                  }
                  type="text"
                />
              </div>
            </div>

            {/* Structure builder */}
            <div className="border-t border-border pt-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                  <span className="text-sm font-semibold text-foreground">
                    {t("University structure")}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">
                    · {draft.faculties.length}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={addFaculty}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-teal-600/40 px-3 py-1.5 text-xs font-semibold text-teal-700 transition-colors hover:bg-teal-500/10 dark:text-teal-400"
                >
                  <Plus size={14} strokeWidth={2.5} />
                  {t("Add Faculty")}
                </button>
              </div>

              {draft.faculties.length === 0 ? (
                <p className="rounded-xl border border-dashed border-border py-6 text-center text-sm text-muted-foreground">
                  {t("No faculties added yet.")}
                </p>
              ) : (
                <div className="flex flex-col gap-3">
                  {draft.faculties.map((faculty, fi) => (
                    <div
                      key={fi}
                      className="rounded-xl border border-border bg-muted/30 p-3"
                    >
                      {/* Faculty row */}
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-teal-600/15 text-xs font-bold text-teal-700 dark:text-teal-300">
                          {fi + 1}
                        </span>
                        <Input
                          placeholder={t("Faculty name")}
                          value={faculty.name}
                          onChange={(e) =>
                            updateFaculty(fi, { name: e.target.value })
                          }
                          className="flex-1"
                        />
                        <Input
                          placeholder={t("Dean")}
                          value={faculty.dean}
                          onChange={(e) =>
                            updateFaculty(fi, { dean: e.target.value })
                          }
                          className="flex-1"
                        />
                        <button
                          type="button"
                          onClick={() => removeFaculty(fi)}
                          aria-label={t("Remove faculty")}
                          className="rounded-md p-2 text-red-500 transition-colors hover:bg-red-500/10"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Departments */}
                      <div className="mt-3 pl-9">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                            {t("Departments")} · {faculty.departments.length}
                          </span>
                          <button
                            type="button"
                            onClick={() => addDepartment(fi)}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 transition-colors hover:text-teal-800 dark:text-teal-400"
                          >
                            <Plus size={13} strokeWidth={2.5} />
                            {t("Add Department")}
                          </button>
                        </div>

                        {faculty.departments.length === 0 ? (
                          <p className="text-xs text-muted-foreground">
                            {t("No departments added yet.")}
                          </p>
                        ) : (
                          <div className="flex flex-col gap-2">
                            {faculty.departments.map((dep, di) => (
                              <div key={di} className="flex items-center gap-2">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-muted text-[11px] font-bold text-muted-foreground">
                                  {di + 1}
                                </span>
                                <Input
                                  placeholder={t("Department name")}
                                  value={dep.name}
                                  onChange={(e) =>
                                    updateDepartment(fi, di, {
                                      name: e.target.value,
                                    })
                                  }
                                  className="flex-1"
                                />
                                <Input
                                  placeholder={t("Department head")}
                                  value={dep.head}
                                  onChange={(e) =>
                                    updateDepartment(fi, di, {
                                      head: e.target.value,
                                    })
                                  }
                                  className="flex-1"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeDepartment(fi, di)}
                                  aria-label={t("Remove department")}
                                  className="rounded-md p-2 text-red-500 transition-colors hover:bg-red-500/10"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
              <Label className="mb-1 text-sm font-medium text-foreground">
                {t("Name")}
              </Label>
              <Input
                placeholder={t("e.g. University of Sulaimani")}
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                type="text"
              />
            </div>

            <div>
              <Label className="mb-1 text-sm font-medium text-foreground">
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
              <Label className="mb-1 text-sm font-medium text-foreground">
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
              <Label className="text-sm font-medium text-foreground">
                {t("Active")}
              </Label>
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) =>
                  setForm((f) => ({ ...f, isActive: e.target.checked }))
                }
                className="h-4 w-4 accent-teal-700"
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
    </PageTransition>
  );
}

export default UniversitiesPage;
