import { useTranslation } from "react-i18next";
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
import { useState } from "react";
import Modal from "../../components/common/Modal";
import { Label } from "../../components/ui/label";

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
  const { t } = useTranslation();
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  function handleModal() {
    setShowPopup((prev) => !prev);
  }

  function handleAddUniversity() {
    // Submit logic here
    setShowPopup(false);
  }

  const columns: DataTableColumn<University>[] = [
    {
      key: "name",
      header: t("Name"),
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

  return (
    <div className="px-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-teal-600 font-bold text-sm py-1">
            {t("Ministry of Higher Education")}
          </p>
          <h1 className="font-extrabold text-2xl py-1">{t("Universities")}</h1>
          <p className="text-gray-500 py-1">
            {t("System Administrator")} · {t("Academic Year")} 2025–2026
          </p>
        </div>
        <Button
          onClick={handleModal}
          className="bg-white border-teal-700 text-teal-700 hover:bg-teal-50"
        >
          + {t("Add University")}
        </Button>
      </div>

      <div className="flex justify-between my-3">
        <div className="flex gap-5">
          <h1 className="font-bold">{t("Universities")}</h1>
          <p className="text-gray-500">
            {mockUniversities.length} {t("records")}
          </p>
        </div>
        <div>
          <Input placeholder={t("Filter...")} />
        </div>
      </div>

      <hr />

      <DataTable
        columns={columns}
        data={mockUniversities}
        getRowId={(u) => String(u.id)}
      />

      {showPopup && (
        <Modal
          title={t("Add University")}
          confirmLabel={t("Add University")}
          onClose={() => setShowPopup(false)}
          onConfirm={handleAddUniversity}
        >
          <div className="flex flex-col gap-3">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1">
                {t("Name")}
              </Label>
              <Input
                placeholder={t("e.g. University of Sulaimani")}
                type="text"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1">
                {t("Location")}
              </Label>
              <Input placeholder={t("e.g. Sulaimani")} type="text" />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1">
                {t("Established Year")}
              </Label>
              <Input type="date" />
            </div>

            <div className="flex items-center justify-between py-1">
              <Label className="text-sm font-medium text-gray-700">
                {t("Active")}
              </Label>
              <input
                type="checkbox"
                defaultChecked={true}
                className="w-4 h-4 accent-teal-700"
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default UniversitiesPage;
