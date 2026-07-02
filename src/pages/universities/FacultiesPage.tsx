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
import PageTransition from "../../components/common/PageTransition";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Label } from "../../components/ui/label";
import { BreadcrumbItem } from "../../components/common/BreadcrumbItem";
import { useBreadcrumbAccess } from "../../hooks/useBreadcrumbAccess";
import { addFaculty, getFacultiesByUniversity } from "../../api/faculty";
import { useMutation, useQuery } from "@tanstack/react-query";
import ErrorState from "../../components/common/ErrorState";
import { getUniversityById } from "../../api/university";
import type { UserScope } from "../../types/auth";
import { notifySuccess } from "../../lib/notify";
import TableSkeleton from "../../components/common/TableSkeleton";

const statusStyles: Record<FacultyStatus, string> = {
  ACTIVE:
    "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/15",
  INACTIVE: "bg-muted text-muted-foreground hover:bg-muted",
};

const statusLabels: Record<FacultyStatus, string> = {
  ACTIVE: "Active",
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
    admin_id: null,
    is_active: false,
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
  const getScopeId = (scopeType: UserScope) => {
    // Coerce to a number: the API may send scope_id as a numeric string ("5"),
    // and the route params are always strings, so comparing them below must be
    // done numerically — otherwise `"5" !== Number("5")` wrongly forbids access.
    return (
      Number(user?.scopes?.find((s) => s.scope_type === scopeType)?.scope_id) ||
      0
    );
  };

  const userUniversityId = getScopeId("UNIVERSITY");

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
        admin_id: null,
        is_active: false,
      });
      setShowPopup(false);
      refetch();
      notifySuccess(t("Faculty added."));
    },
  });

  // get university by id
  const { data: university } = useQuery({
    queryKey: ["university", universityId],
    queryFn: () => getUniversityById(Number(universityId)),
    enabled: !!universityId,
  });

  const filteredFaculties = faculties.filter(
    (f) => f.name.toLowerCase().includes(filter.toLowerCase()),
    // f.dean.toLowerCase().includes(filter.toLowerCase()) ||
    // f.status.toLowerCase().includes(filter.toLowerCase()),
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
      <div className="min-h-screen bg-background px-8 py-8">
        <TableSkeleton
          gridCols="grid-cols-[2fr_1fr_1fr_80px]"
          columnHeaders={["NAME", "DEAN", "STATUS"]}
          extraColumns={[{ width: "w-24" }]}
        />
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
          className="font-medium text-teal-700 dark:text-teal-400 cursor-pointer"
        >
          {u.name}
        </span>
      ),
    },
    {
      key: "dean",
      header: t("Dean"),
      render: (u) => u.admin.name,
    },
    {
      key: "status",
      header: t("Status"),
      align: "right",
      render: (u) => (
        <Badge
          className={
            u.is_active === 1
              ? "bg-emerald-100 text-emerald-700"
              : "bg-gray-100 text-gray-700"
          }
        >
          {u.is_active === 1 ? t("Active") : t("Inactive")}
        </Badge>
      ),
    },
  ];

  if (
    user?.scopes.some((s) => s.scope_type === "UNIVERSITY") &&
    userUniversityId !== Number(universityId)
  ) {
    return <Navigate to="/forbidden" replace />;
  }

  return (
    <PageTransition className="min-h-screen bg-background px-8 py-8">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
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
          role={user?.roles[0]?.name || ""}
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
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {/* Table toolbar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground">
              {t("Faculties")}
            </span>
            <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              {filteredFaculties.length} record
              {filteredFaculties.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Filter input */}
          <div className="relative">
            <Search
              size={14}
              strokeWidth={2}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
            <input
              type="text"
              placeholder={t("Filter...")}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-8 pr-4 py-2 text-sm border border-border rounded-xl w-52 bg-muted placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 transition-all"
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
              <Label className="text-sm font-medium text-foreground mb-1">
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
    </PageTransition>
  );
}

export default FacultiesPage;
