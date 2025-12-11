import { useState } from "react";

function CompanyPage() {
    const [companies, setCompanies] = useState([
        { id: 1, name: "Acme Corp", industry: "Biotech", location: "San Diego, CA", employees: 120 },
        { id: 2, name: "Vertex Solutions", industry: "Software", location: "Austin, TX", employees: 48 },
        { id: 3, name: "GreenHarvest", industry: "AgriTech", location: "Des Moines, IA", employees: 75 },
    ]);

    const [modalOpen, setModalOpen] = useState(false);
    const [editingCompany, setEditingCompany] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        industry: "",
        location: "",
        employees: "",
    });

    const openAddModal = () => {
        setEditingCompany(null);
        setFormData({
            name: "",
            industry: "",
            location: "",
            employees: "",
        });
        setModalOpen(true);
    };

    const openEditModal = (company) => {
        setEditingCompany(company);
        setFormData(company);
        setModalOpen(true);
    };

    const handleSave = () => {
        if (editingCompany) {
            // EDIT MODE
            setCompanies((prev) =>
                prev.map((c) =>
                    c.id === editingCompany.id ? { ...editingCompany, ...formData } : c
                )
            );
        } else {
            // CREATE MODE
            const newCompany = {
                ...formData,
                id: Date.now(),
                employees: Number(formData.employees),
            };
            setCompanies((prev) => [...prev, newCompany]);
        }

        setModalOpen(false);
    };

    const handleDelete = (id) => {
        setCompanies((prev) => prev.filter((c) => c.id !== id));
    };

    return (
        <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Companies</h2>
                <button
                    onClick={openAddModal}
                    className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                    + Add Company
                </button>
            </div>

            {/* Company Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {companies.map((company) => (
                    <div
                        key={company.id}
                        className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-lg font-semibold">{company.name}</h3>
                                <p className="text-sm text-gray-500">
                                    {company.industry} • {company.location}
                                </p>
                            </div>
                            <span className="text-sm text-gray-600">
                                {company.employees} emp
                            </span>
                        </div>

                        <div className="mt-4 flex gap-2">
                            <button
                                className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
                                onClick={() => openEditModal(company)}
                            >
                                Edit
                            </button>
                            <button
                                className="px-3 py-1 border border-red-300 text-red-600 text-sm rounded hover:bg-red-100"
                                onClick={() => handleDelete(company.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4">
                    <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">
                            {editingCompany ? "Edit Company" : "Add New Company"}
                        </h3>

                        <div className="flex flex-col gap-3">
                            <input
                                type="text"
                                placeholder="Company Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="border p-2 rounded"
                            />

                            <input
                                type="text"
                                placeholder="Industry"
                                value={formData.industry}
                                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                className="border p-2 rounded"
                            />

                            <input
                                type="text"
                                placeholder="Location"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                className="border p-2 rounded"
                            />

                            <input
                                type="number"
                                placeholder="Employees"
                                value={formData.employees}
                                onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                                className="border p-2 rounded"
                            />
                        </div>

                        <div className="flex justify-end gap-2 mt-6">
                            <button
                                className="px-3 py-1 border rounded"
                                onClick={() => setModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


export default CompanyPage;