import React, { useEffect } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { FiHome, FiFolder, FiMessageSquare, FiBarChart2, FiFileText, FiLogOut } from "react-icons/fi";

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            navigate("/admin");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        navigate("/admin");
    };

    const navItems = [
        { path: "/admin/dashboard", icon: <FiBarChart2 />, label: "Dashboard" },
        { path: "/admin/projects", icon: <FiFolder />, label: "Projects" },
        { path: "/admin/resume", icon: <FiFileText />, label: "Resume" },
        { path: "/admin/messages", icon: <FiMessageSquare />, label: "Messages" }
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white flex">
            {/* Sidebar */}
            <aside className="w-64 bg-black/60 border-r border-white/10 flex flex-col fixed h-full z-20">
                <div className="p-6 border-b border-white/10">
                    <h2 className="text-xl font-bold tracking-wider">MANU<span className="text-green">FOLIO</span></h2>
                    <span className="text-xs uppercase opacity-50 tracking-widest font-mono mt-1 block">CMS Backend</span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                        ? "bg-green/10 text-green border border-green/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                                        : "text-white/70 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                {item.icon}
                                <span className="font-medium text-sm">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-400/10 transition-all font-medium text-sm"
                    >
                        <FiLogOut />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Content */}
            <main className="flex-1 ml-64 min-h-screen p-8 relative">
                {/* Global Glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green/5 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="relative z-10 w-full max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
