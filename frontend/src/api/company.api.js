import api from "./axios";

export const getCompanies = async () => {
    const res = await api.get("/api/org/companies/");
    return res.data;
};

export const addCompany = async (data) => {
    return api.post("/api/org/companies/", data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const updateCompany = async (code, data) => {
    return api.patch(`/api/org/companies/${code}/`, data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};