import { useState } from "react";
import Navbar from "../../../components/Navbar";
import { Outlet, useParams } from "react-router-dom";


function CompanyLayout() {
    const { companyCode } = useParams();

    const features = [
        {
            items: [
                { key: "departments", label: "Departments", path: `/admin/companies/${companyCode}/departments` },
                { key: "employees", label: "Employees", path: `/admin/companies/${companyCode}/employees` },
            ],
        },
    ];

    const [section, setSection] = useState("departments");

    return (
        <div className="flex h-screen font-sans text-gray-800 bg-gray-50">
            <Navbar features={features} section={section} setSection={setSection} />
            <main className="flex-1 p-6 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}

export default CompanyLayout;