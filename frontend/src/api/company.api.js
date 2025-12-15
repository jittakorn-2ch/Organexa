import api from "./axios";

export const getCompanies = async () => {
    const res = await api.get("/org/companies/");
    return res.data;
};

export const addCompany = async (data) => {
    return api.post("/org/companies/", data);
};

export const updateCompany = async (code, data) => {
    console.log("API Call - addCompany", data);
    
    return api.patch(`/org/companies/${code}/`, data);
};