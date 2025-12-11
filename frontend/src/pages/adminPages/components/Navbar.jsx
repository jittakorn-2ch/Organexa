import { useNavigate } from "react-router-dom";


function Navbar({ section, setSection }) {
    const navigate = useNavigate();

    const features = [
        {
            group: "Organizations",
            items: [
                { key: "companies", label: "companies", path: "/admin" },
                { key: "departments", label: "Departments", path: "/admin/departments" },
                { key: "users", label: "Users", path: "/admin/users" },
            ],
        },
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
            <h1
                className="text-xl font-bold mb-4 cursor-pointer"
                onClick={() => navigate("")}
            >
                Admin Panel
            </h1>

            <nav className="flex flex-col gap-4">
                {features.map((f, index) => (
                    <div key={index}>
                        <p className="text-xs text-white bg-gray-700 rounded-md px-2 py-1 mb-2">{f.group}</p>
                        <div className="flex flex-col gap-1">
                            {f.items.map((item) => (
                                <button
                                    key={item.key}
                                    onClick={() => {
                                        setSection(item.key);
                                        navigate(item.path);
                                    }}
                                    className={`text-left px-3 py-2 rounded-md text-sm cursor-pointer hover:bg-gray-100
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