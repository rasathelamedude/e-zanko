import {
  DataTable,
  type DataTableColumn,
} from "../../components/common/DataTable";
import type { University, UniversityStatus } from "../../types/hierarchy";
import { Badge } from "../../components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

export const mockUniversities: University[] = [
  {
    id: 1,
    name: "Salahaddin University",
    president: "Dr. Aram Qadir",
    status: "ACTIVE",
    adminId: null,
    academicYear: null,
    location: "Erbil",
    startDate: null,
    endDate: null,
    establishedYear: "1991-01-01",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    deletedAt: null,
  },
  {
    id: 2,
    name: "University of Sulaimani",
    president: "Dr. Shilan Rashid",
    status: "ACTIVE",
    adminId: null,
    academicYear: null,
    location: "Sulaimani",
    startDate: null,
    endDate: null,
    establishedYear: "1970-01-01",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    deletedAt: null,
  },
  {
    id: 3,
    name: "University of Duhok",
    president: "Dr. Hemin Tahir",
    status: "ACTIVE",
    adminId: null,
    academicYear: null,
    location: "Duhok",
    startDate: null,
    endDate: null,
    establishedYear: "1987-01-01",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    deletedAt: null,
  },
  {
    id: 4,
    name: "University of Halabja",
    president: "Dr. Nask Ali",
    status: "INACTIVE",
    adminId: null,
    academicYear: null,
    location: "Halabja",
    startDate: null,
    endDate: null,
    establishedYear: "2010-01-01",
    isActive: false,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    deletedAt: null,
  },
  {
    id: 5,
    name: "University of Garmian",
    president: "Dr. Karwan Saeed",
    status: "ACTIVE",
    adminId: null,
    academicYear: null,
    location: "Kalar",
    startDate: null,
    endDate: null,
    establishedYear: "2005-01-01",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    deletedAt: null,
  },
];

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

function UniversitiesPage() {
  const navigate = useNavigate();
  const columns: DataTableColumn<University>[] = [
    {
      key: "name",
      header: "Name",
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
      header: "President",
      render: (u) => u.president,
    },
    {
      key: "status",
      header: "Status",
      render: (u: University) => (
        <Badge className={statusStyles[u.status]}>
          {statusLabels[u.status]}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (u) => (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => console.log("edit", u.id)}
            aria-label={`Edit ${u.name}`}
            className="rounded-md p-2 text-teal-600 hover:bg-teal-50"
          >
            <Pencil className="h-4 w-4 cursor-pointer" />
          </button>
          <button
            onClick={() => console.log("delete", u.id)}
            aria-label={`Delete ${u.name}`}
            className="rounded-md p-2 text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4 cursor-pointer" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="px-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-teal-600 font-bold text-sm py-1">
            Ministry of Higher Education
          </p>
          <h1 className="font-extrabold text-2xl py-1">Universities</h1>
          <p className="text-gray-500 py-1">
            System Administrator · Academic Year 2025–2026
          </p>
        </div>
        <Button className="bg-white border-teal-700 text-teal-700 hover:bg-teal-50">
          + Add University
        </Button>
      </div>

      <div className="flex justify-between my-3">
        <div className="flex gap-5">
          <h1 className="font-bold">Universities</h1>
          <p className="text-gray-500">{mockUniversities.length} records</p>
        </div>
        <div>
          <Input placeholder="Filter..." />
        </div>
      </div>
      <hr />

      <DataTable
        columns={columns}
        data={mockUniversities}
        getRowId={(u) => String(u.id)}
      />
    </div>
  );
}

export default UniversitiesPage;
