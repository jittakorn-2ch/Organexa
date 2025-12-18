import { useEffect, useState, useCallback } from "react";
import CompanyModal from "./components/CompanyModal.jsx";
import { addCompany, getCompanies, updateCompany } from "../../api/company.api.js";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";


function CompanyListPage() {
    const [companies, setCompanies] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingData, setEditingData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const fetchCompanies = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const companies = await getCompanies();
            setCompanies(companies);
        } catch (err) {
            console.error("Failed to fetch companies", err);
            setError("Error loading companies. Please check the API server.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCompanies();
    }, [fetchCompanies]);


    const openAdd = () => {
        setEditingData(null);
        setModalOpen(true);
    };

    const openEdit = (company) => {
        setEditingData(company);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditingData(null); 
    };

    const saveCompany = async (data) => {
        try {
            let res;

            console.log("Saving company data:", editingData);

            if (editingData) {
                res = await updateCompany(data.code, data);

                setCompanies((prev) =>
                    prev.map((c) =>
                        c.code === data.code ? res.data : c
                    )
                );
            } else {
                res = await addCompany(data);

                setCompanies((prev) => [
                    res.data,
                    ...prev,
                ]);
            }

            closeModal();
        } catch (error) {
            console.error("Save company failed:", error);
            alert("ไม่สามารถบันทึกข้อมูลได้");
        }
    };

    if (loading) {
        return <div className="p-6 text-center text-indigo-600">Loading companies...</div>;
    }

    if (error) {
        return <div className="p-6 text-center text-red-600 border border-red-300 bg-red-50 rounded-lg">{error}</div>;
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header and Add Button */}
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-3xl font-bold text-gray-800">🏢 Company Management</h2>
                <button
                    onClick={openAdd}
                    className="cursor-pointer px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white font-medium shadow-md transition duration-150 ease-in-out"
                >
                    + Add New Company
                </button>
            </div>

            {/* Company Cards Grid */}
            {companies.length === 0 ? (
                <div className="text-center p-10 border-gray-300 text-gray-500">
                    <p className="text-lg mb-2">No companies found.</p>
                    <p>Click "Add New Company" to get started.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {companies.map((company) => (
                        <div
                            key={company.code}
                            className="group relative cursor-pointer bg-white border border-gray-100 p-5 shadow-lg hover:shadow-xl transition duration-300 flex flex-col min-h-[250px]"
                            onClick={() => navigate(`/admin/companies/${company.code}/departments`)}
                        >
                            {/* ปุ่ม Edit แบบ Icon - มุมขวาบน */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation(); // หยุดการ Navigate เมื่อกดปุ่มแก้ไข
                                    openEdit(company);
                                }}
                                className="absolute top-4 right-4 p-2.5 text-gray-500 hover:text-gray-700 hover:scale-125 active:scale-95 transition-all duration-200 z-1 cursor-pointer"
                                title="Edit Company"
                            >
                                <FiEdit size={18} />
                            </button>

                            {/* Company Image/Logo */}
                            {company.imageUrl && (
                                <img
                                    src={company.imageUrl}
                                    alt={`${company.name} logo`}
                                    className="w-full h-32 object-contain bg-gray-50 rounded-lg mb-4"
                                />
                            )}

                            <div className="pr-10"> {/* เว้นระยะขวาไว้กันชื่อทับ Icon */}
                                <h3 className="text-xl font-bold text-gray-900 truncate">
                                    {company.name}
                                </h3>
                                <p className="text-sm text-orange-500 font-semibold mb-2">
                                    Code: {company.code || 'N/A'}
                                </p>
                            </div>

                            <p className="text-sm text-gray-600 grow mb-4 line-clamp-2">
                                {company.description || 'No description provided.'}
                            </p>

                            <div className="flex items-center text-xs text-gray-400 pt-3 border-t border-gray-50">
                                <span className="mr-1.5">📍</span>
                                <span className="truncate">{company.address?.fullAddress || 'Address not listed'}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}


            {/* Modal Component */}
            <CompanyModal
                open={modalOpen}
                initialData={editingData}
                onSave={saveCompany} // This handles both create and update
                onClose={closeModal}
            />
        </div>
    );
}

export default CompanyListPage;