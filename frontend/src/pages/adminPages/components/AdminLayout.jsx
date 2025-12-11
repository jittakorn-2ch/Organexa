import { useState } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
    const [section, setSection] = useState("companies");

    return (
        <div className="flex h-screen font-sans text-gray-800 bg-gray-50">
            <Navbar section={section} setSection={setSection} />
            <main className="flex-1 p-6 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}

export default AdminLayout;