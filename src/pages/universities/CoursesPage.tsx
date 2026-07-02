import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Search, Plus } from "lucide-react";
import {
  DataTable,
  type DataTableColumn,
} from "../../components/common/DataTable";
import type { Course, CourseStatus } from "../../types/hierarchy";
import { Badge } from "../../components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { Input } from "../../components/ui/input";
import PageHeader from "../../components/common/PageHeader";
import { useUserStore } from "../../store/userStore";
import Modal from "../../components/common/Modal";
import { Label } from "../../components/ui/label";
// import {
//   Combobox,
//   ComboboxContent,
//   ComboboxEmpty,
//   ComboboxInput,
//   ComboboxItem,
//   ComboboxList,
// } from "../../components/ui/combobox";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useBreadcrumbAccess } from "../../hooks/useBreadcrumbAccess";
import { BreadcrumbItem } from "../../components/common/BreadcrumbItem";
import type { UserScope } from "../../types/auth";

const mockCourses: Course[] = [
  {
    id: 1,
    departmentId: 4,
    code: "CS101",
    name: "Introduction to Programming",
    creditHours: 3,
    yearLevel: 1,
    isActive: true,
    lecturer: "Dr. Hawre Aziz",
    department: "Computer Science",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    deletedAt: null,
  },
  {
    id: 2,
    departmentId: 1,
    code: "SE201",
    name: "Data Structures",
    creditHours: 3,
    yearLevel: 2,
    isActive: true,
    lecturer: "Dr. Karim Yusuf",
    department: "Software Engineering",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    deletedAt: null,
  },
  {
    id: 3,
    departmentId: 2,
    code: "CE301",
    name: "Structural Analysis",
    creditHours: 3,
    yearLevel: 3,
    isActive: true,
    lecturer: "Dr. Shko Rauf",
    department: "Civil Engineering",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    deletedAt: null,
  },
  {
    id: 4,
    departmentId: 3,
    code: "EE201",
    name: "Circuit Theory",
    creditHours: 3,
    yearLevel: 2,
    isActive: true,
    lecturer: "Dr. Dinya Salam",
    department: "Electrical Engineering",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    deletedAt: null,
  },
  {
    id: 5,
    departmentId: 5,
    code: "AR401",
    name: "Architectural Design",
    creditHours: 4,
    yearLevel: 4,
    isActive: false,
    lecturer: "Dr. Niga Star",
    department: "Architecture",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    deletedAt: null,
  },
];

// const lecturers = mockCourses.map((course) => course.lecturer);

const statusStyles: Record<CourseStatus, string> = {
  ACTIVE: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  INACTIVE: "bg-gray-100 text-gray-700 hover:bg-gray-100",
};

function CoursesPage() {
  const { t } = useTranslation();
  const user = useUserStore((state) => state.user);
  const [showPopup, setShowPopup] = useState(false);
  const [filter, setFilter] = useState("");
  const { universityId, facultyId, departmentId } = useParams();
  const navigate = useNavigate();
  const { canAccessUniversities, canAccessFaculties, canAccessDepartments } =
    useBreadcrumbAccess();

  const getScopeId = (scopeType: UserScope) => {
    return user?.scopes?.find((s) => s.scope_type === scopeType)?.scope_id || 0;
  };

  const userUniversityId = getScopeId("UNIVERSITY");
  const userFacultyId = getScopeId("FACULTY");
  const userDepartmentId = getScopeId("DEPARTMENT");

  const university = mockUniversities.find(
    (u) => String(u.id) === universityId,
  );
  const faculty = mockFaculties.find((u) => String(u.id) === facultyId);
  const department = mockDepartments.find((u) => String(u.id) === departmentId);

  function handleModal() {
    setShowPopup((prev) => !prev);
  }

  function handleAddCourse() {
    // Submit logic here
    setShowPopup(false);
  }

  const filteredCourses = mockCourses.filter((course) =>
    [
      course.code,
      course.name,
      course.department,
      course.lecturer,
      course.yearLevel,
    ]
      .join("")
      .toLowerCase()
      .includes(filter.toLowerCase()),
  );

  const shouldShowDepartmentColumn =
    user?.roles.some((role) => role.name === "DEAN") && userFacultyId === Number(facultyId);

  const columns: DataTableColumn<Course>[] = [
    {
      key: "code",
      header: t("Code"),
      render: (u) => (
        <span className="font-medium text-teal-700 cursor-pointer">
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
      ? [
          {
            key: "department",
            header: t("Department"),
            render: (u) => u.department,
          },
        ]
      : []),
    {
      key: "lecturer",
      header: t("Lecturer"),
      render: (u) => u.lecturer,
    },
    {
      key: "yearLevel",
      header: t("Year Level"),
      render: (u) => `${t("Year")} ${u.yearLevel}`,
    },
    {
      key: "isActive",
      header: t("Status"),
      render: (u) => (
        <Badge
          className={u.isActive ? statusStyles.ACTIVE : statusStyles.INACTIVE}
        >
          {u.isActive ? t("Active") : t("Inactive")}
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
          onClick={handleModal}
        >
          <Plus size={16} strokeWidth={2.5} />
          {t("Add Course")}
        </button>
      </div>

      {/* Table card */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        {/* Table toolbar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-700">
              {t("Courses")}
            </span>
            <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
              {filteredCourses.length} record
              {filteredCourses.length !== 1 ? "s" : ""}
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
          data={filteredCourses}
          getRowId={(u) => String(u.id)}
        />
      </div>

      {showPopup && (
        <Modal
          title={t("Add Course")}
          confirmLabel={t("Add Course")}
          onClose={() => setShowPopup(false)}
          onConfirm={handleAddCourse}
        >
          <div className="flex flex-col gap-3">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1">
                {t("Course Name")}
              </Label>
              <Input
                placeholder={t("e.g. Introduction to Programming")}
                type="text"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1">
                {t("Course Code")}
              </Label>
              <Input placeholder={t("e.g. CS101")} type="text" />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1">
                {t("Credit hours")}
              </Label>
              <Input placeholder={t("e.g. 3")} type="number" min={1} max={6} />
            </div>

            {/* <div>
              <Label className="text-sm font-medium text-gray-700 mb-1">
                Assign Lecturer
              </Label>
              <Combobox items={lecturers}>
                <ComboboxInput placeholder="Select a lecturer" />
                <ComboboxContent>
                  <ComboboxEmpty>No items found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </div> */}

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1">
                {t("Year Level")}
              </Label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
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
    </div>
  );
}

export default CoursesPage;
