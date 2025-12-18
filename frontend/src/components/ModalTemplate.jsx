import { FaXmark } from "react-icons/fa6";

function ModalTemplate({ onClose, header, children }) {
    return (
        <div
            className="fixed inset-0 bg-black/40 flex justify-end items-center h-full z-50"
        >
            <div
                className="bg-white w-full max-w-xl h-full shadow-lg flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sticky text-2xl text-gray-700 top-0 z-20 px-6 py-4">
                    {header}
                    <FaXmark
                        size={32}
                        className="cursor-pointer absolute right-4 top-4 text-gray-700 transition-transform duration-200 hover:scale-125 active:scale-95"
                        onClick={onClose}
                    />
                </div>
                <div className="p-6 overflow-y-auto custom-scroll flex-1">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ModalTemplate;
