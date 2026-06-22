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

const mockDepartments: Department[] = [
  {
    id: "1",
    name: "Software Engineering",
    headOfDepartment: "Dr. Karim Yusuf",
    status: "ACTIVE",
  },
  {
    id: "2",
    name: "Civil Engineering",
    headOfDepartment: "Dr. Shko Rauf",
    status: "ACTIVE",
  },
  {
    id: "3",
    name: "Electrical Engineering",
    headOfDepartment: "Dr. Dinya Salam",
    status: "ACTIVE",
  },
  {
    id: "4",
    name: "Computer Science",
    headOfDepartment: "Dr. Hawre Aziz",
    status: "ACTIVE",
  },
  {
    id: "5",
    name: "Architecture",
    headOfDepartment: "Dr. Niga Star",
    status: "UNDER_REVIEW",
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
        <span className="font-medium text-teal-700 cursor-pointer">
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

  return (
    <div className="px-5">
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
        getRowId={(u) => u.id}
      />

      {showPopup && (
        <Modal
          title="Add Department"
          confirmLabel="Add Department"
          onClose={() => setShowPopup(false)}
          onConfirm={handleAddDepartment}
        >
          <Input placeholder="Department name" className="mb-2" />
          <Input placeholder="Head of Dept." />
        </Modal>
      )}
    </div>
  );
}

export default DepartmentsPage;
