import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import AppRoutes from './router';
import gsap from 'gsap';
import ScrollToTop from './components/utils/ScrollToTop';
import CursorFollower from './components/animations/CursorFollower';
import PageLoader from './components/animations/PageLoader';
import ParticleBackground from './components/animations/ParticleBackground';
import './utils/animations.gsap';

function App() {
    const location = useLocation();
    const isAdminMode = location.pathname.startsWith('/admin');
    // Cursor Glow Init
    React.useEffect(() => {
        const glow = document.createElement("div");
        glow.className = "cursor-glow";
        document.body.appendChild(glow);

        const moveGlow = (e) => {
            gsap.to(glow, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.25,
                ease: "power3.out",
            });
        };

        window.addEventListener("mousemove", moveGlow);

        return () => {
            window.removeEventListener("mousemove", moveGlow);
            glow.remove();
        };
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 overflow-x-hidden cursor-none md:cursor-auto">
            <PageLoader />
            <CursorFollower />
            <ScrollToTop />
            <ParticleBackground />
            {isAdminMode ? null : <Navbar />}
            <main className={`flex-grow min-h-screen ${isAdminMode ? 'pt-0' : 'pt-24'}`}>
                <AppRoutes />
            </main>
            {isAdminMode ? null : <Footer />}
        </div>
    );
}

export default App;
