import AdminLayout from "./pages/adminPages/components/AdminLayout";
import DepartmentPage from "./pages/adminPages/DepartmentPage";
import UserPage from "./pages/adminPages/UserPage";
import HomePage from "./pages/HomePage"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CompanyPage from "./pages/adminPages/CompanyPage";
import api from "./api/axios";
import { useEffect } from "react";



function App() {

  useEffect(() => {
      api.get("/csrf/");
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<CompanyPage />} />
          <Route path="departments" element={<DepartmentPage />} />
          <Route path="users" element={<UserPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App
