import {
  DataTable,
  type DataTableColumn,
} from "../../components/common/DataTable";
import type { Faculty, UniversityStatus } from "../../types/hierarchy";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { Input } from "../../components/ui/input";

const mockFaculties: Faculty[] = [
  {
    id: "1",
    name: "College of Engineering",
    dean: "Dr. Sara Ahmed",
    status: "ACTIVE",
  },
  {
    id: "2",
    name: "College of Medicine",
    dean: "Dr. Diyar Omar",
    status: "ACTIVE",
  },
  {
    id: "3",
    name: "College of Law",
    dean: "Dr. Lana Jabar",
    status: "ACTIVE",
  },
  {
    id: "4",
    name: "College of Science",
    dean: "Dr. Rebin Faraj",
    status: "ACTIVE",
  },
  {
    id: "5",
    name: "College of Education",
    dean: "Dr. Awat Hama",
    status: "UNDER_REVIEW",
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

function FacultiesPage() {
  const [showPopup, setShowPopup] = useState(false);

  function handleModal() {
    setShowPopup((prev) => !prev);
  }

  const columns: DataTableColumn<Faculty>[] = [
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
      key: "dean",
      header: "Dean",
      render: (u) => u.dean,
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
      <div>
        <p className="text-teal-600 font-bold text-sm py-1">
          Ministry of Higher Education
        </p>
        <h1 className="font-extrabold text-2xl py-1">Faculties</h1>
        <p className="text-gray-500 py-1">
          System Administrator · Academic Year 2025–2026
        </p>
      </div>

      <div className="flex justify-between my-3">
        <div className="flex gap-5">
          <h1 className="font-bold">Faculties</h1>
          <p className="text-gray-500">{mockFaculties.length} records</p>
        </div>
        <div>
          <Button
            onClick={handleModal}
            className="bg-white border-teal-700 text-teal-700 hover:bg-teal-50"
          >
            + Add Faculty
          </Button>
        </div>
      </div>
      <hr />

      <DataTable
        columns={columns}
        data={mockFaculties}
        getRowId={(u) => u.id}
      />

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md mx-4">
            <h1 className="text-xl font-bold">Add faculty</h1>
            <Input placeholder="Faculty name" className="my-2" />
            <Input placeholder="Dean" />
            <div className="flex justify-end gap-5 p-4">
              <Button onClick={() => setShowPopup((prev) => !prev)} className="bg-white border-teal-700 text-gray-800 hover:bg-white">
                Cancel
              </Button>
              <Button className="bg-teal-700 text-white">Add Faculty</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FacultiesPage;
