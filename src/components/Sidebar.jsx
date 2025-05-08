import { NavLink, useLocation } from "react-router-dom";
import { routes } from "../utils/constant";
import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function Sidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1024);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const handleResize = () => {
            const isSmall = window.innerWidth < 1024;
            setIsSmallScreen(isSmall);
            if (isSmall) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (isSmallScreen) {
            setSidebarOpen(false);
        }
    }, [location, isSmallScreen]);

    const toggleDropdown = (index) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    return (
        <>
            {isSmallScreen && !sidebarOpen && (
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="fixed top-4 -left-2 z-50 bg-blue-600 text-white p-2 rounded-full shadow-lg"
                >
                    <FiChevronRight />
                </button>
            )}

            <nav
                className={`h-screen fixed lg:static top-0 left-0 z-40 bg-white border-r border-gray-200 shadow transition-all duration-300 
                ${sidebarOpen ? "w-64" : "w-0 lg:w-18"} overflow-hidden`}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    {sidebarOpen && <h1 className="text-lg font-bold">Dashboard</h1>}
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-xl">
                        {sidebarOpen ? <FiChevronLeft /> : <FiChevronRight />}
                    </button>
                </div>

                <div className="mt-4 flex flex-col space-y-2">
                    {routes.map((route, index) => (
                        <div key={index}>
                            {/* ✅ Parent Link */}
                            {route.dropDown?.length > 0 ? (
                                <div
                                    onClick={() => toggleDropdown(index)}
                                    className="flex items-center justify-between px-4 py-2 mx-2 rounded-md cursor-pointer transition-colors
                                        text-gray-700 hover:bg-gray-100"
                                >
                                    <div className="flex items-center space-x-3">
                                        <span className="text-xl">{route.icon}</span>
                                        {sidebarOpen && <span>{route.name}</span>}
                                    </div>
                                    {sidebarOpen && (
                                        activeDropdown === index ? <FiChevronUp /> : <FiChevronDown />
                                    )}
                                </div>
                            ) : (
                                // ✅ Direct link for routes without dropdown (like Home, Settings)
                                <NavLink
                                    to={`/${route.path}`} // jaise: "/", "settings"
                                    className={({ isActive }) =>
                                        `flex items-center space-x-3 px-4 py-2 mx-2 rounded-md transition-colors 
                                        ${isActive ? "bg-blue-200 text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-100"}`
                                    }
                                >
                                    <span className="text-xl">{route.icon}</span>
                                    {sidebarOpen && <span>{route.name}</span>}
                                </NavLink>
                            )}

                            {/* Dropdown Items */}
                            {sidebarOpen && activeDropdown === index && route.dropDown?.length > 0 && (
                                <div className="ml-8 flex flex-col space-y-1">
                                    {route.dropDown.map((subRoute, subIndex) => (
                                        <NavLink
                                            key={subIndex}
                                            to={`/${subRoute.path}`}
                                            className={({ isActive }) =>
                                                `text-sm px-4 py-1 rounded-md 
                                            ${isActive ? "bg-blue-200 text-blue-600 font-medium" : "text-gray-600 hover:bg-gray-50"}`
                                            }
                                        >
                                            {subRoute.name}
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </nav>
        </>
    );
}
