import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLock, FiLogOut } from "react-icons/fi";
import gsap from "gsap";
import ThemeToggle from "../../components/navbar/ThemeToggle";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("adminToken", data.token);

                // Fancy exit animation before redirect
                gsap.to(".login-container", {
                    opacity: 0,
                    scale: 0.9,
                    duration: 0.4,
                    onComplete: () => {
                        navigate("/admin/dashboard");
                    }
                });
            } else {
                setError(data.message || "Invalid credentials");
                gsap.fromTo(".login-box",
                    { x: -10 },
                    { x: 10, duration: 0.1, yoyo: true, repeat: 5, onComplete: () => gsap.to(".login-box", { x: 0 }) }
                );
            }
        } catch (err) {
            setError("Server error");
        }
    };

    return (
        <div className="login-container min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-6 text-[var(--text-primary)] overflow-hidden relative transition-colors duration-300">
            {/* Theme Toggle Top Right */}
            <div className="absolute top-6 right-6 z-50">
                <ThemeToggle />
            </div>

            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="login-box w-full max-w-md bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] p-8 rounded-2xl shadow-2xl relative z-10">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-green/10 text-green rounded-full flex items-center justify-center mx-auto mb-4 border border-green/30">
                        <FiLock className="text-2xl" />
                    </div>
                    <h2 className="text-3xl font-bold">Admin <span className="text-green">CMS</span></h2>
                    <p className="text-sm opacity-60 mt-2">Restricted Area. Authorized Access Only.</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-3 rounded-lg text-sm mb-6 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-xs uppercase opacity-70 mb-2 tracking-wider">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-[var(--bg-primary)] border border-[var(--input-border)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-green focus:bg-transparent transition-all"
                            placeholder="username"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs uppercase opacity-70 mb-2 tracking-wider">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[var(--bg-primary)] border border-[var(--input-border)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-green focus:bg-transparent transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green text-black font-bold py-3 rounded-xl hover:bg-green/90 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                    >
                        Secure Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
