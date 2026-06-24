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
import { Button } from "../../components/ui/button";
import { useState } from "react";
import Modal from "../../components/common/Modal";
import { Label } from "../../components/ui/label";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../../components/ui/combobox";
import { useNavigate, useParams } from "react-router-dom";
import { mockUniversities } from "./UniversitiesPage";
import { mockFaculties } from "./FacultiesPage";
import { mockDepartments } from "./DepartmentsPage";

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

const lecturers = mockCourses.map((course) => course.lecturer);

const statusStyles: Record<CourseStatus, string> = {
  ACTIVE: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  INACTIVE: "bg-gray-100 text-gray-700 hover:bg-gray-100",
};

function CoursesPage() {
  const user = useUserStore((state) => state.user);
  const [showPopup, setShowPopup] = useState(false);
  const [filter, setFilter] = useState("");
  const { universityId, facultyId, departmentId } = useParams();
  const navigate = useNavigate();

  const university = mockUniversities.find((u) => String(u.id) === universityId);
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

  const columns: DataTableColumn<Course>[] = [
    {
      key: "code",
      header: "Code",
      render: (u) => (
        <span className="font-medium text-teal-700 cursor-pointer">
          {u.code}
        </span>
      ),
    },
    {
      key: "name",
      header: "Name",
      render: (u) => u.name,
    },
    {
      key: "department",
      header: "Department",
      render: (u) => u.department,
    },
    {
      key: "lecturer",
      header: "Lecturer",
      render: (u) => u.lecturer,
    },
    {
      key: "yearLevel",
      header: "Year Level",
      render: (u) => `Year ${u.yearLevel}`,
    },
    {
      key: "isActive",
      header: "Status",
      render: (u) => (
        <Badge
          className={u.isActive ? statusStyles.ACTIVE : statusStyles.INACTIVE}
        >
          {u.isActive ? "Active" : "Inactive"}
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
        <span
          onClick={() =>
            navigate(
              `/universities/${universityId}/faculties/${facultyId}/departments`,
            )
          }
          className="cursor-pointer hover:text-teal-700"
        >
          {faculty?.name ?? "Faculty"}
        </span>
        <span>/</span>
        <span className="text-gray-900 font-medium">
          {department?.name ?? "Department"}
        </span>
      </nav>
      <div className="flex justify-between items-center">
        <PageHeader
          title="Ministry of higher education"
          locationTitle="Courses"
          role={user?.role || ""}
          year="2023-2024"
        />
        <Button
          onClick={handleModal}
          className="bg-white border-teal-700 text-teal-700 hover:bg-teal-50"
        >
          + Add Course
        </Button>
      </div>
      <div className="flex justify-between my-3">
        <div className="flex gap-5">
          <h1 className="font-bold">Courses</h1>
          <p className="text-gray-500">{filteredCourses.length} records</p>
        </div>
        <div>
          <Input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter..."
          />
        </div>
      </div>
      <hr />
      <DataTable
        columns={columns}
        data={filteredCourses}
        getRowId={(u) => String(u.id)}
      />

      {showPopup && (
        <Modal
          title="Add Course"
          confirmLabel="Add Course"
          onClose={() => setShowPopup(false)}
          onConfirm={handleAddCourse}
        >
          <div className="flex flex-col gap-3">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1">
                Course Name
              </Label>
              <Input
                placeholder="e.g. Introduction to Programming"
                type="text"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1">
                Course Code
              </Label>
              <Input placeholder="e.g. CS101" type="text" />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1">
                Department
              </Label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option value="">Select a department</option>
                <option value="cs">Computer Science</option>
                <option value="se">Software Engineering</option>
                <option value="ce">Civil Engineering</option>
                <option value="ee">Electrical Engineering</option>
                <option value="ar">Architecture</option>
              </select>
            </div>

            <div>
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
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1">
                Year Level
              </Label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option value="">Select year level</option>
                <option value="1">Year 1</option>
                <option value="2">Year 2</option>
                <option value="3">Year 3</option>
                <option value="4">Year 4</option>
                <option value="5">Year 5</option>
              </select>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default CoursesPage;
