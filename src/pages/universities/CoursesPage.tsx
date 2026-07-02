import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Search, Plus } from "lucide-react";
import {
  DataTable,
  type DataTableColumn,
} from "../../components/common/DataTable";
import type {
  Course,
  CoursePayload,
  CourseStatus,
} from "../../types/hierarchy";
import { Badge } from "../../components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { Input } from "../../components/ui/input";
import PageHeader from "../../components/common/PageHeader";
import PageTransition from "../../components/common/PageTransition";
import { useUserStore } from "../../store/userStore";
import Modal from "../../components/common/Modal";
import { Label } from "../../components/ui/label";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useBreadcrumbAccess } from "../../hooks/useBreadcrumbAccess";
import { BreadcrumbItem } from "../../components/common/BreadcrumbItem";
import type { UserScope } from "../../types/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addCourse,
  deleteCourse,
  getCourseByDepartment,
  updateCourse,
} from "../../api/course";
import { getUniversityById } from "../../api/university";
import { getFacultyById } from "../../api/faculty";
import {
  getDepartmentByFaculty,
  getDepartmentById,
} from "../../api/department";
import ErrorState from "../../components/common/ErrorState";
import ConfirmDialog from "../../components/common/ConfirmDialog";

const statusStyles: Record<CourseStatus, string> = {
  ACTIVE:
    "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/15",
  INACTIVE: "bg-muted text-muted-foreground hover:bg-muted",
};

type ModalState =
  | { type: "add" }
  | { type: "edit"; course: Course }
  | { type: "delete"; course: Course }
  | null;

function CoursesPage() {
  const { t } = useTranslation();
  const user = useUserStore((state) => state.user);
  const [modal, setModal] = useState<ModalState>(null);
  const [filter, setFilter] = useState("");
  const { universityId, facultyId, departmentId } = useParams();
  const navigate = useNavigate();
  const { canAccessUniversities, canAccessFaculties, canAccessDepartments } =
    useBreadcrumbAccess();
  const [form, setForm] = useState<CoursePayload>({
    department_id: 0,
    name: "",
    code: "",
    credit_hours: 0,
    year_level: 0,
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
  const userDepartmentId = getScopeId("DEPARTMENT");

  // get courses of specific department
  const {
    data: courses = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["courses", departmentId],
    queryFn: () => getCourseByDepartment(Number(departmentId)),
    enabled: !!departmentId,
  });

  // add course
  const { mutate: createCourse, isPending } = useMutation({
    mutationFn: (payload: CoursePayload) => addCourse(payload),
    onSuccess: () => {
      setModal(null);
      setForm({
        department_id: 0,
        name: "",
        code: "",
        credit_hours: 0,
        year_level: 0,
        is_active: false,
      });
      refetch();
    },
    onError: (error: Error) => {
      console.error(error.message);
    },
  });

  // edit course
  const { mutate: editCourrse, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: CoursePayload }) =>
      updateCourse(id, payload),
    onSuccess: () => {
      setModal(null);
      setForm({
        department_id: 0,
        name: "",
        code: "",
        credit_hours: 0,
        year_level: 0,
        is_active: false,
      });
      refetch();
    },
    onError: (error: Error) => console.error(error.message),
  });

  // delete course
  const { mutate: removeCourse, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => deleteCourse(id),
    onSuccess: () => {
      setModal(null);
      refetch();
    },
    onError: (error: Error) => {
      console.error(error.message);
    },
  });

  const { data: university } = useQuery({
    queryKey: ["university", universityId],
    queryFn: () => getUniversityById(Number(universityId)),
    enabled: !!universityId,
  });

  const { data: faculty } = useQuery({
    queryKey: ["faculty", facultyId],
    queryFn: () => getFacultyById(Number(facultyId)),
    enabled: !!facultyId,
  });

  const { data: department } = useQuery({
    queryKey: ["department", departmentId],
    queryFn: () => getDepartmentById(Number(departmentId)),
    enabled: !!departmentId,
  });

  const { data: departments = [] } = useQuery({
    queryKey: ["departments", facultyId],
    queryFn: () => getDepartmentByFaculty(Number(facultyId)), // adjust to your actual API fn
    enabled: !!facultyId,
  });

  function handleAddCourse() {
    if (
      !form.name.trim() ||
      !form.code.trim() ||
      !form.credit_hours ||
      !form.year_level ||
      !form.department_id
    )
      return;
    createCourse({ ...form, department_id: Number(departmentId) });
  }

  function handleUpdateCourse() {
    if (
      !form.name.trim() ||
      !form.code.trim() ||
      !form.credit_hours ||
      !form.year_level ||
      !form.department_id
    )
      return;
    if (modal?.type !== "edit") return;
    editCourrse({ id: modal.course.id, payload: form });
  }

  const filteredCourses = courses.filter((course) =>
    [
      course.code,
      course.name,
      course.department,
      // course.lecturer,
      course.year_level,
    ]
      .join("")
      .toLowerCase()
      .includes(filter.toLowerCase()),
  );

  const shouldShowDepartmentColumn =
    user?.roles.some((role) => role.name === "DEAN") &&
    userFacultyId === Number(facultyId);

  if (isError)
    return (
      <ErrorState title="Couldn't load courses" onClick={() => refetch()} />
    );
  const columns: DataTableColumn<Course>[] = [
    {
      key: "code",
      header: t("Code"),
      render: (u) => (
        <span className="font-medium text-teal-700 dark:text-teal-400 cursor-pointer">
          {u.code}
        </span>
      ),
    },
    {
      key: "name",
      header: t("Name"),
      render: (u) => u.name,
    },
    ...(shouldShowDepartmentColumn
      ? ([
          {
            key: "department",
            header: t("Department"),
            render: (u) => u.department,
          },
        ] as DataTableColumn<Course>[])
      : []),
    // {
    //   key: "lecturer",
    //   header: t("Lecturer"),
    //   render: (u) => u.lecturer,
    // },
    {
      key: "yearLevel",
      header: t("Year Level"),
      render: (u) => `${t("Year")} ${u.year_level}`,
    },
    {
      key: "isActive",
      header: t("Status"),
      render: (u) => (
        <Badge
          className={u.is_active ? statusStyles.ACTIVE : statusStyles.INACTIVE}
        >
          {u.is_active ? t("Active") : t("Inactive")}
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
                department_id: u.department_id,
                code: u.code,
                credit_hours: u.credit_hours,
                year_level: u.year_level,
                is_active: Boolean(u.is_active),
              });
              setModal({ type: "edit", course: u });
            }}
            aria-label={`${t("Edit")} ${u.name}`}
            className="rounded-md p-2 text-teal-600 dark:text-teal-400 hover:bg-teal-500/10"
          >
            <Pencil className="h-4 w-4 cursor-pointer" />
          </button>
          <button
            onClick={() => setModal({ type: "delete", course: u })}
            aria-label={`${t("Delete")} ${u.name}`}
            className="rounded-md p-2 text-red-600 dark:text-red-400 hover:bg-red-500/10"
          >
            <Trash2 className="h-4 w-4 cursor-pointer" />
          </button>
        </div>
      ),
    },
  ];

  if (
    (user?.scopes?.some((scope) => scope.scope_type === "UNIVERSITY") &&
      userUniversityId !== Number(universityId)) ||
    (user?.scopes?.some((scope) => scope.scope_type === "FACULTY") &&
      userFacultyId !== Number(facultyId)) ||
    (user?.scopes?.some((scope) => scope.scope_type === "DEPARTMENT") &&
      userDepartmentId !== Number(departmentId))
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
        {canAccessDepartments && (
          <>
            <BreadcrumbItem
              label={faculty?.name ?? t("Faculty")}
              onClick={() =>
                navigate(
                  `/universities/${universityId}/faculties/${facultyId}/departments`,
                )
              }
            />
            <span>/</span>
          </>
        )}
        <BreadcrumbItem label={department?.name ?? t("Department")} isCurrent />
      </nav>

      {/* Page header + Add button row */}
      <div className="flex items-start justify-between mb-6">
        <PageHeader
          title={t("Ministry of higher education")}
          locationTitle={t("Courses")}
          role={user?.roles[0]?.name || ""}
          year="2025–2026"
        />
        <button
          className="flex items-center gap-1.5 bg-teal-700 hover:bg-teal-800 active:bg-teal-900 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors mt-1 cursor-pointer"
          onClick={() => setModal({ type: "add" })}
        >
          <Plus size={16} strokeWidth={2.5} />
          {t("Add Course")}
        </button>
      </div>

      {/* Table card */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {/* Table toolbar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground">
              {t("Courses")}
            </span>
            <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              {filteredCourses.length} record
              {filteredCourses.length !== 1 ? "s" : ""}
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
          data={filteredCourses}
          getRowId={(u) => String(u.id)}
        />
      </div>

      {modal?.type == "add" && (
        <Modal
          title={t("Add Course")}
          confirmLabel={t("Add Course")}
          onClose={() => setModal(null)}
          onConfirm={handleAddCourse}
          isLoading={isPending}
        >
          <div className="flex flex-col gap-3">
            <div>
              <Label className="text-sm font-medium text-foreground mb-1">
                {t("Course Name")}
              </Label>
              <Input
                placeholder={t("e.g. Introduction to Programming")}
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-foreground mb-1">
                {t("Course Code")}
              </Label>
              <Input
                placeholder={t("e.g. CS101")}
                type="text"
                value={form.code}
                onChange={(e) =>
                  setForm((f) => ({ ...f, code: e.target.value }))
                }
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-foreground mb-1">
                {t("Credit hours")}
              </Label>
              <Input
                placeholder={t("e.g. 3")}
                type="number"
                min={1}
                max={6}
                value={form.credit_hours ?? ""}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    credit_hours:
                      e.target.value === "" ? null : Number(e.target.value),
                  }))
                }
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-foreground mb-1">
                {t("Year Level")}
              </Label>
              <select
                value={form.year_level ?? ""}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    year_level:
                      e.target.value === "" ? null : Number(e.target.value),
                  }))
                }
                className="w-full border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">{t("Select year level")}</option>
                <option value="1">{t("Year 1")}</option>
                <option value="2">{t("Year 2")}</option>
                <option value="3">{t("Year 3")}</option>
                <option value="4">{t("Year 4")}</option>
                <option value="5">{t("Year 5")}</option>
                <option value="6">{t("Year 6")}</option>
              </select>
            </div>
          </div>
        </Modal>
      )}

      {/* edit course popup */}
      {modal?.type === "edit" && (
        <Modal
          title={t("Update Course")}
          confirmLabel={t("Update Course")}
          onClose={() => setModal(null)}
          onConfirm={handleUpdateCourse}
          isLoading={isUpdating}
        >
          <div className="flex flex-col gap-3">
            <div>
              <Label className="text-sm font-medium text-foreground mb-1">
                {t("Name")}
              </Label>
              <Input
                placeholder={t("e.g. Database Systems")}
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                type="text"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-foreground mb-1">
                {t("Code")}
              </Label>
              <Input
                placeholder={t("e.g. CS321")}
                value={form.code}
                onChange={(e) =>
                  setForm((f) => ({ ...f, code: e.target.value }))
                }
                type="text"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-foreground mb-1">
                {t("Credit Hours")}
              </Label>
              <Input
                placeholder={t("e.g. 3")}
                value={form.credit_hours ?? ""}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    credit_hours:
                      e.target.value === "" ? null : Number(e.target.value),
                  }))
                }
                type="number"
                min={1}
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-foreground mb-1">
                {t("Year Level")}
              </Label>
              <Input
                placeholder={t("e.g. 3")}
                value={form.year_level ?? ""}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    year_level:
                      e.target.value === "" ? null : Number(e.target.value),
                  }))
                }
                type="number"
                min={1}
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-foreground mb-1">
                {t("Department")}
              </Label>
              <select
                value={form.department_id}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    department_id: Number(e.target.value),
                  }))
                }
                className="border rounded-md px-2 py-1.5 text-sm w-full"
              >
                <option value="" disabled>
                  {t("Select a department")}
                </option>
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between py-1">
              <Label className="text-sm font-medium text-foreground">
                {t("Active")}
              </Label>
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) =>
                  setForm((f) => ({ ...f, is_active: e.target.checked }))
                }
                className="w-4 h-4 accent-teal-700"
              />
            </div>
          </div>
        </Modal>
      )}

      {/* delete course confirmation popup */}
      {modal?.type === "delete" && (
        <ConfirmDialog
          title={t("Delete Course")}
          description={`Are you sure you want to delete ${modal.course.name}? This action cannot be undone.`}
          onClose={() => setModal(null)}
          onConfirm={() => removeCourse(modal.course.id)}
          isLoading={isDeleting}
        />
      )}
    </PageTransition>
  );
}

export default CoursesPage;
