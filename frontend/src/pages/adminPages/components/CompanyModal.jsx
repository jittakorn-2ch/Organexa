import { useEffect, useState } from "react";
import ImageUploader from "../../../components/ImageUploader";
import ModalTemplate from "../../../components/ModalTemplate";
import { validateDecimal, validateNumber } from "../../../utils/inputValidation";


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

    const to2Digit = (val) =>
        val !== null && val !== undefined
            ? Number(val).toFixed(2)
            : null;

    // Load initial data when editing
    useEffect(() => {
        if (initialData) {
            setForm({
                code: initialData.code,
                name: initialData.name,
                description: initialData.description,
                address: {
                    fullAddress: initialData.address?.fullAddress ?? "",
                    latitude: to2Digit(initialData.address?.latitude),
                    longitude: to2Digit(initialData.address?.longitude),
                    radius: to2Digit(initialData.address?.radius),
                },
                isActive: initialData.isActive ?? true,
                image: null,
                imagePreview: initialData.imageUrl || null,
            });
        } else {
            setForm(emptyForm);
        }
        setErrors({});
    }, [initialData, open]);

    if (!open) return null;

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: null }));
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

        const data = new FormData();
        data.append("code", form.code);
        data.append("name", form.name);
        data.append("description", form.description || "");
        data.append("is_active", form.isActive);

        if (form.image && form.image.file) {
            data.append("image", form.image.file);
        } else if (!form.imagePreview) {
            data.append("image", ""); 
        }

        const hasAddressData = form.address && form.address.fullAddress && form.address.fullAddress.trim() !== "";
        if (hasAddressData) {
            const addressObj = {
                full_address: form.address.fullAddress,
                latitude: form.address.latitude,
                longitude: form.address.longitude,
                radius: form.address.radius
            };
            data.append("address", JSON.stringify(addressObj));
        } else {
            data.append("address", null); 
        }

        for (var pair of data.entries()) {
            console.log(pair[0] + ', ' + pair[1]); 
        }

        onSave(data);
    };

    return (
        <ModalTemplate
            onClose={onClose}
            header={
                <p className="text-2xl font-bold uppercase">
                    {form.id ? "Edit Company" : "Add New Company"}
                </p>
            }
        >
            <div className="flex flex-col gap-4 items-center">
                <div className="w-full flex gap-4">
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

                    <div className="flex-1 flex flex-col gap-4">
                        {/* Code */}
                        <div className="input-container">
                            <input
                                type="text"
                                placeholder=" "
                                value={form.code}
                                onChange={(e) =>
                                    handleChange("code", e.target.value)
                                }
                                className={`${errors.code ? "border-red" : ""}`}
                            />
                            <label className="required">Company Code</label>
                        </div>

                        {/* Name */}
                        <div className="input-container">
                            <input
                                type="text"
                                placeholder=" "
                                value={form.name}
                                onChange={(e) =>
                                    handleChange("name", e.target.value)
                                }
                                className={`${errors.name ? "border-red" : ""}`}
                            />
                            <label className="required">Company Name</label>
                        </div>

                        {/* Active Toggle */}
                        <div className="flex justify-end">
                            <div className="input-container">
                                <button
                                    type="button"
                                    className={`w-12 h-6 p-1 transition-colors cursor-pointer ${
                                        form.isActive ? "bg-gray-700" : "bg-gray-300"
                                    }`}
                                    onClick={() =>
                                        handleChange("isActive", !form.isActive)
                                    }
                                >
                                    <span
                                        className={`block w-4 h-4 bg-white shadow transform transition-transform ${
                                            form.isActive
                                                ? "translate-x-6"
                                                : "translate-x-0"
                                        }`}
                                    />
                                </button>
                                <label className="floated-label">Is active?</label>
                            </div>                            
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="input-container w-full">
                    <textarea
                        placeholder=" "
                        rows="3"
                        value={form.description}
                        onChange={(e) =>
                            handleChange("description", e.target.value)
                        }
                    />
                    <label>Description</label>              
                </div>

                {/* Address & Coordinates */}
                <div className="w-full flex flex-col gap-4">
                    <p className="font-bold">Address</p>

                    {/* Full Address */}
                    <div className="input-container">
                        <textarea
                            placeholder=" "
                            rows={3}
                            value={form.address.fullAddress}
                            onChange={(e) =>
                                handleAddressChange("fullAddress", e.target.value)
                            }
                        />
                        <label>Full Address</label>
                    </div>

                    {/* Latitude */}
                    <div className="input-container">
                        <input
                            type="number"
                            step="0.000001"
                            onInput={(e) =>
                                validateDecimal(e.target, {minVal: -90, maxVal: 90})
                            }
                            placeholder=" "
                            value={form.address.latitude ?? ""}
                            onChange={(e) =>
                                handleAddressChange("latitude", e.target.value)
                            }
                        />
                        <label>Latitude</label>
                    </div>

                    {/* Longitude */}
                    <div className="input-container">
                        <input
                            type="number"
                            step="0.000001"
                            onInput={(e) =>
                                validateDecimal(e.target, {minVal: -180, maxVal: 180})
                            }
                            placeholder=" "
                            value={form.address.longitude ?? ""}
                            onChange={(e) =>
                                handleAddressChange("longitude", e.target.value)
                            }
                        />
                        <label>Longitude</label>
                    </div>

                    {/* Radius */}
                    <div className="input-container">
                        <input
                            type="number"
                            onInput={(e) =>
                                validateNumber(e.target, {minVal: 0})
                            }
                            placeholder=" "
                            value={form.address.radius ?? ""}
                            onChange={(e) =>
                                handleAddressChange("radius", e.target.value)
                            }
                        />
                        <label>Radius (meters)</label>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
                <button
                    className="px-5 py-1 bg-gray-700 hover:bg-gray-800 text-white cursor-pointer shadow-lg hover:shadow-xl"
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>
        </ModalTemplate>
    );
}

export default CompanyModal;
