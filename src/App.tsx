import LoginPage from "./pages/auth/LoginPage";
import DashboardPage from "./pages/dashboard"; // Automatically imports index.tsx
import FacultiesPage from "./pages/universities/FacultiesPage"
import UniversitiesPage from "./pages/universities/UniversitiesPage"
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<DashboardPage />} />
      <Route path="/universities" element={<UniversitiesPage />} />
      <Route path="/universities/:universityId/faculties" element={<FacultiesPage />} />
    </Routes>
  );
}

export default App;
