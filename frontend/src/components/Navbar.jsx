import { useNavigate } from "react-router-dom";


function Navbar({ features = [], section, setSection }) {
    const navigate = useNavigate();

    return (
        <aside className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col pt-4">
            <h1
                className="text-xl font-bold mb-4 cursor-pointer px-4"
                onClick={() => navigate("/admin")}
            >
                Admin Panel
            </h1>

            <nav className="flex flex-col gap-4">
                {features.map((feature, index) => (
                    <div key={index}>
                        {feature.group && (
                            <p className="text-xs text-white bg-gray-700 px-2 py-1">
                                {feature.group}
                            </p>
                        )}

                        <div className="flex flex-col">
                            {feature.items.map((item) => (
                                <button
                                    key={item.key}
                                    onClick={() => {
                                        setSection?.(item.key);
                                        navigate(item.path);
                                    }}
                                    className={`text-left px-3 py-2 text-sm cursor-pointer hover:bg-gray-200 border-b border-gray-300
                                        ${section === item.key ? "bg-gray-200 font-semibold" : ""}
                                    `}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </nav>
        </aside>
    );
}

export default Navbar;