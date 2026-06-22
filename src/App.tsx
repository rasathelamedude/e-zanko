import AppLayout from "./layouts/AppLayout";
import LoginPage from "./pages/auth/LoginPage";
import DashboardPage from "./pages/dashboard"; // Automatically imports index.tsx
import FacultiesPage from "./pages/universities/FacultiesPage";
import UniversitiesPage from "./pages/universities/UniversitiesPage";
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
      </Route>
    </Routes>
  );
}

export default App;
