import DepartmentPage from "./pages/adminPages/DepartmentPage";
import HomePage from "./pages/HomePage"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import api from "./api/axios";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CompanyListPage from "./pages/adminPages/CompanyListPage";
import AdminLayout from "./pages/adminPages/components/AdminLayout";
import CompanyLayout from "./pages/adminPages/components/CompanyLayout";
import EmployeePage from "./pages/adminPages/EmployeePage";



function App() {

  useEffect(() => {
      api.get("/api/csrf/");
  }, []);

  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />

      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<CompanyListPage />} />
        </Route>

        <Route path="/admin/companies" element={<CompanyLayout />}>
          <Route index path=":companyCode/departments" element={<DepartmentPage />} />
          <Route path=":companyCode/employees" element={<EmployeePage />} />
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App
