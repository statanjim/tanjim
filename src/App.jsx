import React, { useEffect, useState } from 'react';
import { usePortfolioStore } from './store/usePortfolioStore';
import { useAuthStore } from './store/useAuthStore';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Contact from './components/sections/Contact';

import AdminLogin from './components/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';

export default function App() {
  const store = usePortfolioStore();
  const auth = useAuthStore();
  const { data } = store;

  const [isAdminMode, setIsAdminMode] = useState(false);

  // Secret Key Check logic
  useEffect(() => {
    const checkAdminTrigger = () => {
      const search = window.location.search || '';
      const hash = window.location.hash || '';
      const currentSecretKey = data?.secretKey || 'tanjim123';

      // Check if URL contains ?admin= or ?admin or hash #admin
      if (
        search.includes('?admin') ||
        search.includes('&admin') ||
        hash.includes('admin')
      ) {
        setIsAdminMode(true);
      }
    };

    checkAdminTrigger();
    window.addEventListener('popstate', checkAdminTrigger);
    return () => window.removeEventListener('popstate', checkAdminTrigger);
  }, [data?.secretKey]);

  // Apply CSS Variables dynamically
  useEffect(() => {
    const accent = data?.appearance?.accentColor || '#8b5cf6';
    const bg = data?.appearance?.bgColor || '#0a0a0a';

    document.documentElement.style.setProperty('--accent', accent);
    document.documentElement.style.setProperty('--bg-color', bg);
  }, [data?.appearance]);

  const handleCloseAdmin = () => {
    setIsAdminMode(false);
    // Clean URL parameter without page reload
    const url = new URL(window.location.href);
    url.searchParams.delete('admin');
    window.history.replaceState({}, '', url.pathname + url.search + url.hash);
  };

  const accentColor = data?.appearance?.accentColor || '#8b5cf6';
  const showGrid = data?.appearance?.showGrid ?? true;

  return (
    <div className={`min-h-screen relative font-sans text-neutral-100 ${showGrid ? 'bg-grid-pattern' : ''}`}>
      
      {/* PUBLIC PORTFOLIO WEBSITE */}
      <Navbar headerData={data.header} accentColor={accentColor} />

      <main>
        <Hero heroData={data.hero} accentColor={accentColor} />
        <About aboutData={data.about} accentColor={accentColor} />
        <Projects projectsData={data.projects} accentColor={accentColor} />
        <Skills skillsData={data.skills} accentColor={accentColor} />
        <Contact footerData={data.footer} accentColor={accentColor} />
      </main>

      <Footer footerData={data.footer} accentColor={accentColor} />

      {/* SECRET CMS ADMIN SYSTEM (NO PUBLIC LINK - ONLY VIA URL PARAM ?admin=tanjim123) */}
      {isAdminMode && (
        !auth.isAuthenticated ? (
          <AdminLogin
            auth={auth}
            onClose={handleCloseAdmin}
          />
        ) : (
          <AdminLayout
            store={store}
            auth={auth}
            onClose={handleCloseAdmin}
          />
        )
      )}

    </div>
  );
}
