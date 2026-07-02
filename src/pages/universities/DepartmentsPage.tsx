import { useTranslation } from "react-i18next";
import { Search, Plus } from "lucide-react";
import {
  DataTable,
  type DataTableColumn,
} from "../../components/common/DataTable";
import type {
  DepartmentPayload,
  Department,
  DepartmentStatus,
} from "../../types/hierarchy";
import { Badge } from "../../components/ui/badge";
import { useState } from "react";
import { Input } from "../../components/ui/input";
import Modal from "../../components/common/Modal";
import PageHeader from "../../components/common/PageHeader";
import PageTransition from "../../components/common/PageTransition";
import { useUserStore } from "../../store/userStore";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Label } from "../../components/ui/label";
import { useBreadcrumbAccess } from "../../hooks/useBreadcrumbAccess";
import { BreadcrumbItem } from "../../components/common/BreadcrumbItem";
import type { UserScope } from "../../types/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addDepartment, getDepartmentByFaculty } from "../../api/department";
import { getUniversityById } from "../../api/university";
import { notifySuccess } from "../../lib/notify";

const statusStyles: Record<DepartmentStatus, string> = {
  ACTIVE:
    "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/15",
  UNDER_REVIEW:
    "bg-amber-500/15 text-amber-600 dark:text-amber-400 hover:bg-amber-500/15",
  INACTIVE: "bg-muted text-muted-foreground hover:bg-muted",
};

const statusLabels: Record<DepartmentStatus, string> = {
  ACTIVE: "Active",
  UNDER_REVIEW: "Under review",
  INACTIVE: "Inactive",
};

function DepartmentsPage() {
  const { t } = useTranslation();
  const user = useUserStore((state) => state.user);
  const [showPopup, setShowPopup] = useState(false);
  const [filter, setFilter] = useState("");
  const { universityId, facultyId } = useParams();
  const navigate = useNavigate();
  const { canAccessUniversities, canAccessFaculties } = useBreadcrumbAccess();
  const [form, setForm] = useState<DepartmentPayload>({
    name: "",
    faculty_id: 0,
    is_active: false,
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
  const userFacultyId = getScopeId("FACULTY");

  const {
    data: departments = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["departments", facultyId],
    queryFn: () => getDepartmentByFaculty(Number(facultyId)),
    enabled: !!facultyId,
  });

  const { mutate: createDepartment, isPending } = useMutation({
    mutationFn: (payload: DepartmentPayload) => addDepartment(payload),
    onSuccess: () => {
      setForm({ name: "", faculty_id: Number(facultyId), is_active: true });
      setShowPopup(false);
      refetch();
      notifySuccess(t("Department added."));
    },
  });

  const { data: university } = useQuery({
    queryKey: ["university", universityId],
    queryFn: () => getUniversityById(Number(universityId)),
    enabled: !!universityId,
  });

  // const { data: faculty } = useQuery({
  //   queryKey: ["faculty", facultyId],
  //   queryFn: () => getFacultyById(Number(facultyId)),
  //   enabled: !!facultyId,
  // });

  const filteredDepartments = departments.filter(
    (d) => d.name.toLowerCase().includes(filter.toLowerCase()),
    // d.headOfDepartment?.toLowerCase().includes(filter.toLowerCase()) ||
    // d.status.toLowerCase().includes(filter.toLowerCase()),
  );

  function handleModal() {
    setShowPopup((prev) => !prev);
  }

  function handleAddDepartment() {
    if (!form.name.trim()) return;
    createDepartment({ ...form, faculty_id: Number(facultyId) });
  }

  const columns: DataTableColumn<Department>[] = [
    {
      key: "name",
      header: t("Name"),
      render: (u) => (
        <span
          onClick={() =>
            navigate(
              `/universities/${universityId}/faculties/${facultyId}/departments/${u.id}/courses`,
            )
          }
          className="font-medium text-teal-700 dark:text-teal-400 cursor-pointer"
        >
          {u.name}
        </span>
      ),
    },
    // {
    //   key: "headOfDepartment",
    //   header: t("Head Of Department"),
    //   render: (u) => u.headOfDepartment,
    // },
    // {
    //   key: "status",
    //   header: t("Status"),
    //   align: "right",
    //   render: (u) => (
    //     <Badge className={statusStyles[u.status]}>
    //       {t(statusLabels[u.status])}
    //     </Badge>
    //   ),
    // },
  ];

  if (
    (user?.scopes.some((s) => s.scope_type === "UNIVERSITY") &&
      userUniversityId !== Number(universityId)) ||
    (user?.scopes.some((s) => s.scope_type === "FACULTY") &&
      userFacultyId !== Number(facultyId))
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
        {canAccessFaculties && (
          <>
            <BreadcrumbItem
              label={university?.name ?? t("University")}
              onClick={() =>
                navigate(`/universities/${universityId}/faculties`)
              }
            />
            <span>/</span>
          </>
        )}
        {/* faculty?.name ?? ---> to be merged */}
        <BreadcrumbItem label={t("Faculty")} isCurrent />
      </nav>

      {/* Page header + Add button row */}
      <div className="flex items-start justify-between mb-6">
        <PageHeader
          title={t("Ministry of Higher Education")}
          locationTitle={t("Departments")}
          role={user?.roles[0]?.name || ""}
          year="2025–2026"
        />
        <button
          className="flex items-center gap-1.5 bg-teal-700 hover:bg-teal-800 active:bg-teal-900 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors mt-1 cursor-pointer"
          onClick={handleModal}
        >
          <Plus size={16} strokeWidth={2.5} />
          {t("Add Department")}
        </button>
      </div>

      {/* Table card */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {/* Table toolbar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground">
              {t("Departments")}
            </span>
            <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              {filteredDepartments.length} record
              {filteredDepartments.length !== 1 ? "s" : ""}
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
          data={filteredDepartments}
          getRowId={(u) => String(u.id)}
        />
      </div>

      {showPopup && (
        <Modal
          title={t("Add Department")}
          confirmLabel={t("Add Department")}
          onClose={() => setShowPopup(false)}
          onConfirm={handleAddDepartment}
          isLoading={isPending}
        >
          <div className="flex flex-col gap-3">
            <div>
              <Label className="text-sm font-medium text-foreground mb-1">
                {t("Name")}
              </Label>
              <Input
                placeholder={t("e.g. Department of electrical engineering")}
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
              />
            </div>
          </div>
        </Modal>
      )}
    </PageTransition>
  );
}

export default DepartmentsPage;
