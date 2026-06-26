import { useTranslation } from "react-i18next";
import {
  DataTable,
  type DataTableColumn,
} from "../../components/common/DataTable";
import type { Department, DepartmentStatus } from "../../types/hierarchy";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { Input } from "../../components/ui/input";
import Modal from "../../components/common/Modal";
import PageHeader from "../../components/common/PageHeader";
import { useUserStore } from "../../store/userStore";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { mockFaculties } from "./FacultiesPage";
import { mockUniversities } from "./UniversitiesPage";
import { Label } from "../../components/ui/label";

export const mockDepartments: Department[] = [
  {
    id: 1,
    facultyId: 1,
    name: "Software Engineering",
    headOfDepartment: "Dr. Karim Yusuf",
    status: "ACTIVE",
    adminId: null,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    deletedAt: null,
  },
  {
    id: 2,
    facultyId: 1,
    name: "Civil Engineering",
    headOfDepartment: "Dr. Shko Rauf",
    status: "ACTIVE",
    adminId: null,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    deletedAt: null,
  },
  {
    id: 3,
    facultyId: 1,
    name: "Electrical Engineering",
    headOfDepartment: "Dr. Dinya Salam",
    status: "ACTIVE",
    adminId: null,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    deletedAt: null,
  },
  {
    id: 4,
    facultyId: 1,
    name: "Computer Science",
    headOfDepartment: "Dr. Hawre Aziz",
    status: "ACTIVE",
    adminId: null,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    deletedAt: null,
  },
  {
    id: 5,
    facultyId: 1,
    name: "Architecture",
    headOfDepartment: "Dr. Niga Star",
    status: "UNDER_REVIEW",
    adminId: null,
    isActive: false,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    deletedAt: null,
  },
];

const statusStyles: Record<DepartmentStatus, string> = {
  ACTIVE: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  UNDER_REVIEW: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  INACTIVE: "bg-gray-100 text-gray-700 hover:bg-gray-100",
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
  const { universityId, facultyId } = useParams();
  const navigate = useNavigate();

  const university = mockUniversities.find(
    (u) => String(u.id) === universityId,
  );
  const faculty = mockFaculties.find((u) => String(u.id) === facultyId);

  function handleModal() {
    setShowPopup((prev) => !prev);
  }

  function handleAddDepartment() {
    // Submit logic here
    setShowPopup(false);
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
          className="font-medium text-teal-700 cursor-pointer"
        >
          {u.name}
        </span>
      ),
    },
    {
      key: "headOfDepartment",
      header: t("Head Of Department"),
      render: (u) => u.headOfDepartment,
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

  if (
    (user?.scope === "UNIVERSITY" && user?.scopeId !== Number(universityId)) ||
    (user?.scope === "FACULTY" && user?.scopeId !== Number(facultyId))
  ) {
    return <Navigate to="/forbidden" replace />;
  }

  return (
    <div className="px-5">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span
          onClick={() => navigate("/universities")}
          className="cursor-pointer hover:text-teal-700"
        >
          {t("Universities")}
        </span>
        <span>/</span>
        <span
          onClick={() => navigate(`/universities/${universityId}/faculties`)}
          className="cursor-pointer hover:text-teal-700"
        >
          {university?.name ?? t("University")}
        </span>
        <span>/</span>
        <span className="text-gray-900 font-medium">
          {faculty?.name ?? t("Faculty")}
        </span>
      </nav>

      <PageHeader
        title={t("Ministry of Higher Education")}
        locationTitle={t("Departments")}
        role={user?.role || ""}
        year="2023-2024"
      />

      <div className="flex justify-between my-3">
        <div className="flex gap-5">
          <h1 className="font-bold">{t("Departments")}</h1>
          <p className="text-gray-500">
            {mockDepartments.length} {t("records")}
          </p>
        </div>
        <div>
          <Button
            onClick={handleModal}
            className="bg-white border-teal-700 text-teal-700 hover:bg-teal-50"
          >
            + {t("Add Department")}
          </Button>
        </div>
      </div>

      <hr />

      <DataTable
        columns={columns}
        data={mockDepartments}
        getRowId={(u) => String(u.id)}
      />

      {showPopup && (
        <Modal
          title={t("Add Department")}
          confirmLabel={t("Add Department")}
          onClose={() => setShowPopup(false)}
          onConfirm={handleAddDepartment}
        >
          <div className="flex flex-col gap-3">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1">
                {t("Name")}
              </Label>
              <Input
                placeholder={t("e.g. Department of electrical engineering")}
                type="text"
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default DepartmentsPage;
