import { FaTrash, FaPlus  } from "react-icons/fa";

function ImageUploader({ image, imagePreview, setImage }) {

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage({
                file: file,
                preview: URL.createObjectURL(file),
            });
        }
    };

    const removeImage = () => {
        setImage({
            file: null,
            preview: null,
        });
    };

    const getDisplaySource = () => {
        if (image?.preview) return image.preview;
        if (imagePreview) return imagePreview;

        return null;
    };

    const displaySrc = getDisplaySource();

    return (
        <div className="flex flex-col items-center gap-2">
            <input
                id="image-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
            />

            <label
                htmlFor="image-input"
                className="group relative w-32 h-32 bg-gray-100 flex items-center justify-center cursor-pointer overflow-hidden border border-gray-200"
            >
                {displaySrc ? (
                    <>
                        <img
                            src={displaySrc}
                            alt="Uploaded"
                            className="w-full h-full object-cover"
                        />

                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                removeImage();
                            }}
                            className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 transition cursor-pointer"
                        >
                            <FaTrash
                                size={14}
                                className="transition-transform group-hover:scale-125 active:scale-95"
                            />
                        </button>
                    </>
                ) : (
                    <FaPlus
                        size={14}
                        className="text-gray-500 transition-transform group-hover:scale-125 active:scale-95"
                    />
                )}
            </label>
        </div>
    );
}

export default ImageUploader;
