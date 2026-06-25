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
      header: "Name",
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
      header: "Head Of Department",
      render: (u) => u.headOfDepartment,
    },
    {
      key: "status",
      header: "Status",
      align: "right",
      render: (u) => (
        <Badge className={statusStyles[u.status]}>
          {statusLabels[u.status]}
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
          Universities
        </span>
        <span>/</span>
        <span
          onClick={() => navigate(`/universities/${universityId}/faculties`)}
          className="cursor-pointer hover:text-teal-700"
        >
          {university?.name ?? "University"}
        </span>
        <span>/</span>
        <span className="text-gray-900 font-medium">
          {faculty?.name ?? "Faculty"}
        </span>
      </nav>
      <PageHeader
        title="Ministry of Higher Education"
        locationTitle="Departments"
        role={user?.role || ""}
        year="2023-2024"
      />
      <div className="flex justify-between my-3">
        <div className="flex gap-5">
          <h1 className="font-bold">Departments</h1>
          <p className="text-gray-500">{mockDepartments.length} records</p>
        </div>
        <div>
          <Button
            onClick={handleModal}
            className="bg-white border-teal-700 text-teal-700 hover:bg-teal-50"
          >
            + Add Department
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
          title="Add Department"
          confirmLabel="Add Department"
          onClose={() => setShowPopup(false)}
          onConfirm={handleAddDepartment}
        >
          <div className="flex flex-col gap-3">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1">
                Name
              </Label>
              <Input
                placeholder="e.g. Department of electrical engineering"
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
