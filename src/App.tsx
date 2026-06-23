import AppLayout from "./layouts/AppLayout";
import LoginPage from "./pages/auth/LoginPage";
import DashboardPage from "./pages/dashboard"; // Automatically imports index.tsx
import CoursesPage from "./pages/universities/CoursesPage";
import DepartmentsPage from "./pages/universities/DepartmentsPage";
import FacultiesPage from "./pages/universities/FacultiesPage";
import UniversitiesPage from "./pages/universities/UniversitiesPage";
import ReportsPage from "./pages/reports";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* Routes under AppLayout have the same structure (sidebar + header) */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/universities" element={<UniversitiesPage />} />
        <Route
          path="/universities/:universityId/faculties"
          element={<FacultiesPage />}
        />
        <Route
          path="/universities/:universityId/faculties/:facultyId/departments"
          element={<DepartmentsPage />}
        />
        <Route
          path="/universities/:universityId/faculties/:facultyId/departments/:departmentId/courses"
          element={<CoursesPage />}
        />
        <Route path="/reports" element={<ReportsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
