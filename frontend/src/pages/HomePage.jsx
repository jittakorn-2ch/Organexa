import React, { useState } from "react";

/**
 * User Home Page (React + TailwindCSS)
 * File: /D:/Dev/Organexa/frontend/src/pages/HomePage.jsx
 *
 * Self-contained components and sample data. TailwindCSS must be configured in the project.
 */

function IconSearch(props) {
    return (
        <svg
            {...props}
            className={(props.className || "") + " w-5 h-5 text-gray-400"}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            aria-hidden="true"
        >
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
            <circle cx="11" cy="11" r="6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function IconBell(props) {
    return (
        <svg
            {...props}
            className={(props.className || "") + " w-6 h-6 text-gray-600"}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            aria-hidden="true"
        >
            <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 11-6 0" />
        </svg>
    );
}

function Avatar({ name = "User", size = 40 }) {
    // Simple initials avatar
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
    return (
        <div
            className="flex items-center justify-center bg-indigo-500 text-white font-medium rounded-full"
            style={{ width: size, height: size }}
            aria-hidden="true"
        >
            {initials}
        </div>
    );
}

export default function HomePage() {
    const [query, setQuery] = useState("");
    const user = { name: "Alex Morgan", role: "Product Manager" };

    const stats = [
        { id: 1, label: "Projects", value: 12, change: "+2" },
        { id: 2, label: "Tasks", value: 134, change: "-3" },
        { id: 3, label: "Messages", value: 8, change: "+1" },
    ];

    // Simple sub-navigation inserted below the existing header.
    const navItems = [
        { id: "overview", label: "Overview", url: "/overview" },
        { id: "projects", label: "Projects", url: "/projects" },
        { id: "tasks", label: "Tasks", url: "/tasks" },
        { id: "calendar", label: "Calendar", url: "/calendar" },
        { id: "admin", label: "Admin", url: "/admin" },
    ];

    React.useEffect(() => {
        // Find the main header and insert a lightweight navbar right after it.
        const header = document.querySelector("header.border-b") || document.querySelector("header");
        if (!header) return;

        const nav = document.createElement("nav");
        nav.className = "bg-white border-b";
        const itemsHtml = navItems
            .map((item, idx) => {
                const activeClass = idx === 0 ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-600 hover:text-indigo-600";
                return `<a href="${item.url}" data-id="${item.id}" class="px-3 py-3 -mb-px ${activeClass} text-sm font-medium">${item.label}</a>`;
            })
            .join("");

        nav.innerHTML = `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center space-x-6">
                    ${itemsHtml}
                </div>
            </div>
        `;

        header.after(nav);

        // cleanup on unmount
        return () => {
            nav.remove();
        };
    }, []);

    const recent = [
        { id: 1, title: "Q4 Roadmap Review", meta: "Oct 20 · Meeting notes" },
        { id: 2, title: "Inventory Sync", meta: "Oct 18 · Automation" },
        { id: 3, title: "Onboarding Plan", meta: "Oct 15 · HR" },
    ];

    const actions = [
        { id: 1, title: "New Project", subtitle: "Start from template" },
        { id: 2, title: "Create Task", subtitle: "Assign to team" },
        { id: 3, title: "Upload File", subtitle: "Attach to project" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            <header className="border-b bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <a href="#" className="text-xl font-semibold text-indigo-600">
                                Organexa
                            </a>

                            <div className="relative">
                                <label htmlFor="search" className="sr-only">
                                    Search
                                </label>
                                <div className="flex items-center bg-gray-100 rounded-md px-2 py-1">
                                    <IconSearch />
                                    <input
                                        id="search"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        className="bg-transparent focus:outline-none text-sm px-2"
                                        placeholder="Search projects, tasks..."
                                        aria-label="Search"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button
                                type="button"
                                className="relative p-2 rounded-md hover:bg-gray-100"
                                aria-label="Notifications"
                                title="Notifications"
                            >
                                <IconBell />
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-medium leading-none text-white bg-red-500 rounded-full transform translate-x-1/2 -translate-y-1/2">
                                    3
                                </span>
                            </button>

                            <div className="flex items-center space-x-3">
                                <div className="text-right mr-2 hidden sm:block">
                                    <div className="text-sm font-medium">{user.name}</div>
                                    <div className="text-xs text-gray-500">{user.role}</div>
                                </div>
                                <button
                                    className="focus:outline-none"
                                    aria-label="Open user menu"
                                    title="User menu"
                                >
                                    <Avatar name={user.name} size={44} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Greeting + Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <section className="lg:col-span-2 bg-white rounded-lg shadow p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-2xl font-semibold">Good morning, {user.name} 👋</h1>
                                <p className="mt-1 text-sm text-gray-600">
                                    Here's what's happening with your workspace today.
                                </p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-md text-sm font-medium hover:bg-indigo-100">
                                    View dashboard
                                </button>
                                <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200">
                                    Help
                                </button>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {stats.map((s) => (
                                <div key={s.id} className="p-4 bg-gray-50 rounded-lg border">
                                    <div className="text-sm text-gray-500">{s.label}</div>
                                    <div className="mt-2 flex items-baseline justify-between">
                                        <div className="text-2xl font-semibold">{s.value}</div>
                                        <div className="text-sm text-green-600">{s.change}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Recent activity */}
                        <div className="mt-6">
                            <h2 className="text-sm font-medium text-gray-700">Recent activity</h2>
                            <ul className="mt-3 divide-y">
                                {recent.map((r) => (
                                    <li key={r.id} className="py-3">
                                        <a href="#" className="flex items-center justify-between hover:bg-gray-50 rounded-md p-2">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{r.title}</div>
                                                <div className="text-xs text-gray-500">{r.meta}</div>
                                            </div>
                                            <div className="text-xs text-indigo-600">Open</div>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* Right column: Quick actions */}
                    <aside className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-sm font-medium text-gray-700">Quick actions</h3>
                        <p className="text-xs text-gray-500 mt-1">Create or jump into common tasks</p>

                        <div className="mt-4 space-y-3">
                            {actions.map((a) => (
                                <button
                                    key={a.id}
                                    className="w-full text-left p-3 bg-gray-50 rounded-md hover:bg-gray-100 flex items-center justify-between"
                                    type="button"
                                >
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">{a.title}</div>
                                        <div className="text-xs text-gray-500">{a.subtitle}</div>
                                    </div>
                                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            ))}
                        </div>

                        <div className="mt-6 border-t pt-4 text-xs text-gray-500">
                            Tips: Use the search above or keyboard shortcut "/" to quickly find things.
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}



