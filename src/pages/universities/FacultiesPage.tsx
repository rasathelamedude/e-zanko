import { useTranslation } from "react-i18next";
import {
  DataTable,
  type DataTableColumn,
} from "../../components/common/DataTable";
import type { Faculty, FacultyStatus } from "../../types/hierarchy";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { Input } from "../../components/ui/input";
import Modal from "../../components/common/Modal";
import { useUserStore } from "../../store/userStore";
import PageHeader from "../../components/common/PageHeader";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { mockUniversities } from "./UniversitiesPage";
import { Label } from "../../components/ui/label";

export const mockFaculties: Faculty[] = [
  {
    id: 1,
    universityId: 1,
    name: "College of Engineering",
    dean: "Dr. Sara Ahmed",
    status: "ACTIVE",
    adminId: null,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    deletedAt: null,
  },
  {
    id: 2,
    universityId: 1,
    name: "College of Medicine",
    dean: "Dr. Diyar Omar",
    status: "ACTIVE",
    adminId: null,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    deletedAt: null,
  },
  {
    id: 3,
    universityId: 1,
    name: "College of Law",
    dean: "Dr. Lana Jabar",
    status: "ACTIVE",
    adminId: null,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    deletedAt: null,
  },
  {
    id: 4,
    universityId: 1,
    name: "College of Science",
    dean: "Dr. Rebin Faraj",
    status: "ACTIVE",
    adminId: null,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    deletedAt: null,
  },
  {
    id: 5,
    universityId: 1,
    name: "College of Education",
    dean: "Dr. Awat Hama",
    status: "INACTIVE",
    adminId: null,
    isActive: false,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    deletedAt: null,
  },
];

const statusStyles: Record<FacultyStatus, string> = {
  ACTIVE: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  UNDER_REVIEW: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  INACTIVE: "bg-gray-100 text-gray-700 hover:bg-gray-100",
};

const statusLabels: Record<FacultyStatus, string> = {
  ACTIVE: "Active",
  UNDER_REVIEW: "Under review",
  INACTIVE: "Inactive",
};

function FacultiesPage() {
  const { t } = useTranslation();
  const user = useUserStore((state) => state.user);
  const [showPopup, setShowPopup] = useState(false);
  const { universityId } = useParams();
  const navigate = useNavigate();

  const university = mockUniversities.find(
    (u) => String(u.id) === universityId,
  );

  function handleModal() {
    setShowPopup((prev) => !prev);
  }

  function handleAddFaculty() {
    // Submit logic here
    setShowPopup(false);
  }

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
          className="font-medium text-teal-700 cursor-pointer"
        >
          {u.name}
        </span>
      ),
    },
    {
      key: "dean",
      header: t("Dean"),
      render: (u) => u.dean,
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

  if (user?.scope === "UNIVERSITY" && user?.scopeId !== Number(universityId)) {
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
        <span className="text-gray-900 font-medium">
          {university?.name ?? t("Faculties")}
        </span>
      </nav>

      <PageHeader
        title={t("Ministry of Higher Education")}
        locationTitle={t("Faculties")}
        role={user?.role || ""}
        year="2023-2024"
      />

      <div className="flex justify-between my-3">
        <div className="flex gap-5">
          <h1 className="font-bold">{t("Faculties")}</h1>
          <p className="text-gray-500">
            {mockFaculties.length} {t("records")}
          </p>
        </div>
        <div>
          <Button
            onClick={handleModal}
            className="bg-white border-teal-700 text-teal-700 hover:bg-teal-50"
          >
            + {t("Add Faculty")}
          </Button>
        </div>
      </div>

      <hr />

      <DataTable
        columns={columns}
        data={mockFaculties}
        getRowId={(u) => String(u.id)}
      />

      {showPopup && (
        <Modal
          title={t("Add Faculty")}
          confirmLabel={t("Add Faculty")}
          onClose={() => setShowPopup(false)}
          onConfirm={handleAddFaculty}
        >
          <div className="flex flex-col gap-3">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1">
                {t("Name")}
              </Label>
              <Input
                placeholder={t("e.g. Faculty of Engineering")}
                type="text"
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default FacultiesPage;
