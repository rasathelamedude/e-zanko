import SettingsPage from "./pages/settings";
import UnauthorizedPage from "./pages/auth/UnauthorizedPage";
import AppLayout from "./layouts/AppLayout";
import LoginPage from "./pages/auth/LoginPage";
import DashboardPage from "./pages/dashboard"; // Automatically imports index.tsx
import LettersPage from "./pages/letters";
import CoursesPage from "./pages/universities/CoursesPage";
import DepartmentsPage from "./pages/universities/DepartmentsPage";
import FacultiesPage from "./pages/universities/FacultiesPage";
import UniversitiesPage from "./pages/universities/UniversitiesPage";
import ReportsPage from "./pages/reports";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./components/common/ProtectedRoute";
import ForbiddenPage from "./pages/auth/ForbiddenPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="/forbidden" element={<ForbiddenPage />} />

      {/* Routes under ProtectedRoutes require logged in users */}
      <Route element={<ProtectedRoutes />}>
        {/* Routes under AppLayout have the same structure (sidebar + header) */}
        <Route element={<AppLayout />}>
          {/* Polymorphic Routes */}
          <Route path="/" element={<DashboardPage />} />

          {/* Shared Routes */}
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/letters" element={<LettersPage />} />
          <Route path="/reports" element={<ReportsPage />} />

          {/* Dedicated Routes Level 1 (MINISTRY_ADMIN) */}
          <Route
            element={<ProtectedRoutes allowedRoles={["MINISTRY_ADMIN"]} />}
          >
            <Route path="/universities" element={<UniversitiesPage />} />
          </Route>

          {/* Dedicated Routes Level 2 (MINSITRY_ADMIN & UNIVERSITY_ADMIN) */}
          <Route
            element={
              <ProtectedRoutes
                allowedRoles={["MINISTRY_ADMIN", "UNIVERSITY_ADMIN"]}
              />
            }
          >
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
          </Route>

          {/* Dedicated Routes Level 3 (MINSITRY_ADMIN & UNIVERSITY_ADMIN & Dean) */}
          <Route
            element={
              <ProtectedRoutes
                allowedRoles={["MINISTRY_ADMIN", "UNIVERSITY_ADMIN", "DEAN"]}
              />
            }
          >
            <Route
              path="/universities/:universityId/faculties/:facultyId/departments"
              element={<DepartmentsPage />}
            />
            <Route
              path="/universities/:universityId/faculties/:facultyId/departments/:departmentId/courses"
              element={<CoursesPage />}
            />
          </Route>

          {/* Dedicated Routes Level 4 (... & DEPARTMENT HEAD) */}
          <Route
            element={
              <ProtectedRoutes
                allowedRoles={[
                  "MINISTRY_ADMIN",
                  "UNIVERSITY_ADMIN",
                  "DEAN",
                  "DEPARTMENT_HEAD",
                ]}
              />
            }
          >
            <Route
              path="/universities/:universityId/faculties/:facultyId/departments/:departmentId/courses"
              element={<CoursesPage />}
            />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
