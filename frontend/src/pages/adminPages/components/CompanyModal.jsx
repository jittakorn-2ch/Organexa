import { useEffect, useState } from "react";
import ImageUploader from "../../../components/ImageUploader";
import ModalTemplate from "../../../components/ModalTemplate";


function CompanyModal({ open, initialData, onSave, onClose }) {
    const emptyForm = {
        code: "",
        name: "",
        description: "",
        address: {
            fullAddress: "",
            latitude: null,
            longitude: null,
            radius: null,
        },
        isActive: true,
        image: null,
        imagePreview: null,
    };

    const [form, setForm] = useState(emptyForm);
    const [errors, setErrors] = useState({});

    // Load initial data when editing
    useEffect(() => {
        if (initialData) {
            setForm({
                code: initialData.code,
                name: initialData.name,
                description: initialData.description,
                address: {
                    fullAddress: initialData.address?.fullAddress ?? "",
                    latitude: initialData.address?.latitude ?? null,
                    longitude: initialData.address?.longitude ?? null,
                    radius: initialData.address?.radius ?? null,
                },
                isActive: initialData.isActive ?? true,
                image: null,
                imagePreview: initialData.imageUrl ?? null,
            });
        } else {
            setForm(emptyForm);
        }
        setErrors({});
    }, [initialData]);

    const normalizeForm = (form) => {
        const hasAddress =
            form.address?.fullAddress ||
            form.address?.latitude ||
            form.address?.longitude ||
            form.address?.radius;

        return {
            code: form.code,
            name: form.name,
            description: form.description || null,
            isActive: form.isActive,

            address: hasAddress
                ? {
                    fullAddress: form.address.fullAddress || null,
                    latitude: form.address.latitude
                        ? Number(form.address.latitude)
                        : null,
                    longitude: form.address.longitude
                        ? Number(form.address.longitude)
                        : null,
                    radius: form.address.radius
                        ? Number(form.address.radius)
                        : null,
                }
                : null,
        };
    };

    if (!open) return null;

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: null })); // clear error
    };

    const handleAddressChange = (field, value) => {
        setForm((prev) => ({
            ...prev,
            address: {
                ...prev.address,
                [field]: value,
            },
        }));
    };

    const validate = () => {
        const newErrors = {};

        if (!form.code.trim()) newErrors.code = "Company code is required.";
        if (!form.name.trim()) newErrors.name = "Company name is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (!validate()) return;

        const data = normalizeForm({ ...form, image: form.image });
        onSave(data);
    };

    return (
        <ModalTemplate
            onClose={onClose}
            header={
                <p className="text-lg font-semibold text-white">
                    {form.id ? "Edit Company" : "Add New Company"}
                </p>
            }
        >
            <div className="flex flex-col gap-3 items-center">
                <ImageUploader
                    image={form.image}
                    imagePreview={form.imagePreview}
                    setImage={(file, preview) =>
                        setForm({
                            ...form,
                            image: file,
                            imagePreview: preview,
                        })
                    }
                />

                {/* Code */}
                <div className="w-full">
                    <input
                        type="text"
                        placeholder="Company Code"
                        value={form.code}
                        onChange={(e) =>
                            handleChange("code", e.target.value)
                        }
                        className={`border p-2 rounded w-full ${
                            errors.code ? "border-red-500" : ""
                        }`}
                    />
                    {errors.code && (
                        <p className="text-red-600 text-sm">{errors.code}</p>
                    )}
                </div>

                {/* Name */}
                <div className="w-full">
                    <input
                        type="text"
                        placeholder="Company Name"
                        value={form.name}
                        onChange={(e) =>
                            handleChange("name", e.target.value)
                        }
                        className={`border p-2 rounded w-full ${
                            errors.name ? "border-red-500" : ""
                        }`}
                    />
                    {errors.name && (
                        <p className="text-red-600 text-sm">{errors.name}</p>
                    )}
                </div>

                {/* Description */}
                <textarea
                    placeholder="Description"
                    rows="3"
                    value={form.description}
                    onChange={(e) =>
                        handleChange("description", e.target.value)
                    }
                    className="border p-2 rounded w-full"
                />

                {/* Active Toggle */}
                <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <p className="font-bold">Active</p>
                        <p className="text-sm text-gray-500">
                            {form.isActive ? "Yes" : "No"}
                        </p>
                    </div>

                    <button
                        type="button"
                        className={`w-12 h-6 rounded-full p-1 transition-colors ${
                            form.isActive ? "bg-gray-700" : "bg-gray-300"
                        }`}
                        onClick={() =>
                            handleChange("isActive", !form.isActive)
                        }
                    >
                        <span
                            className={`block w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
                                form.isActive
                                    ? "translate-x-6"
                                    : "translate-x-0"
                            }`}
                        />
                    </button>
                </div>

                {/* Address & Coordinates */}
                <div className="w-full flex flex-col gap-3">
                    <p className="font-bold">Address</p>

                    <textarea
                        placeholder="Full Address"
                        rows={3}
                        value={form.address.fullAddress}
                        onChange={(e) =>
                            handleAddressChange("fullAddress", e.target.value)
                        }
                        className="border p-2 rounded w-full"
                    />

                    <input
                        type="number"
                        step="0.000001"
                        placeholder="Latitude"
                        value={form.address.latitude ?? ""}
                        onChange={(e) =>
                            handleAddressChange("latitude", e.target.value)
                        }
                        className="border p-2 rounded w-full"
                    />

                    <input
                        type="number"
                        step="0.000001"
                        placeholder="Longitude"
                        value={form.address.longitude ?? ""}
                        onChange={(e) =>
                            handleAddressChange("longitude", e.target.value)
                        }
                        className="border p-2 rounded w-full"
                    />

                    <input
                        type="number"
                        placeholder="Radius (meters)"
                        value={form.address.radius ?? ""}
                        onChange={(e) =>
                            handleAddressChange("radius", e.target.value)
                        }
                        className="border p-2 rounded w-full"
                    />
                </div>

            </div>

            <div className="flex justify-end gap-2 mt-6">
                <button
                    className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded cursor-pointer"
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>
        </ModalTemplate>
    );
}

export default CompanyModal;
