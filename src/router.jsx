import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/animations/PageTransition';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Downloads from './pages/Downloads';
import Certifications from './pages/Certifications';
import Contact from './pages/ContactPage';

import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';

const AppRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/about" element={<PageTransition><About /></PageTransition>} />
                <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
                <Route path="/downloads" element={<PageTransition><Downloads /></PageTransition>} />
                <Route path="/certifications" element={<PageTransition><Certifications /></PageTransition>} />
                <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />

                {/* Admin CMS Routes */}
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    {/* Placeholder for future admin sub-pages */}
                </Route>
            </Routes>
        </AnimatePresence>
    );
};

export default AppRoutes;
