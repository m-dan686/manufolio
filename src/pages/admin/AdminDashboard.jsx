import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiEye, FiDownload, FiUsers, FiMessageCircle } from "react-icons/fi";

const AdminDashboard = () => {
    // Simulated data for now until we connect to fresh DB
    const stats = [
        { label: "Total Views", value: "1,245", icon: <FiEye />, color: "text-blue-400", bg: "bg-blue-400/10" },
        { label: "Resume DLs", value: "84", icon: <FiDownload />, color: "text-green-400", bg: "bg-green-400/10" },
        { label: "Unique Visitors", value: "892", icon: <FiUsers />, color: "text-orange-400", bg: "bg-orange-400/10" },
        { label: "New Messages", value: "12", icon: <FiMessageCircle />, color: "text-purple-400", bg: "bg-purple-400/10" }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            <header>
                <h1 className="text-3xl font-bold">Dashboard <span className="text-green">Overview</span></h1>
                <p className="opacity-60 mt-1">Welcome back. Here is what is happening with your portfolio today.</p>
            </header>

            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        key={idx}
                        className="bg-black/40 border border-white/10 rounded-2xl p-6 backdrop-blur-md"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium opacity-60 mb-1">{stat.label}</p>
                                <h3 className="text-3xl font-bold">{stat.value}</h3>
                            </div>
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                {React.cloneElement(stat.icon, { className: "text-xl" })}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions & Recent Activity Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-black/40 border border-white/10 rounded-2xl p-6 backdrop-blur-md min-h-[400px]">
                    <h3 className="text-xl font-bold mb-6">Traffic Analysis</h3>
                    <div className="w-full h-[300px] flex items-center justify-center border border-white/5 rounded-xl bg-white/5">
                        <p className="opacity-40 font-mono text-sm">[Chart Component Will Render Here]</p>
                    </div>
                </div>

                <div className="bg-black/40 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                    <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
                    <div className="space-y-4">
                        {[
                            { action: "Resume Downloaded", time: "10 mins ago", detail: "from IP 192.168.1.1" },
                            { action: "New Message", time: "1 hour ago", detail: "Recruiter tracking inquiry" },
                            { action: "Project Viewed", time: "2 hours ago", detail: "SkillMatch AI viewed" }
                        ].map((act, i) => (
                            <div key={i} className="flex gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                <div className="w-2 h-2 mt-2 rounded-full bg-green flex-shrink-0 shadow-[0_0_8px_#10b981]"></div>
                                <div>
                                    <p className="text-sm font-bold text-white/90">{act.action}</p>
                                    <p className="text-xs text-white/50 mt-1">{act.detail}</p>
                                    <span className="text-[10px] text-orange uppercase font-mono mt-2 block">{act.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AdminDashboard;
