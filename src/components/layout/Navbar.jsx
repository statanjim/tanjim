import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Code2 } from 'lucide-react';

export default function Navbar({ headerData, accentColor }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoText = headerData?.logo || "Tanjim";
  const navLinks = headerData?.navLinks || [];
  const cta = headerData?.cta || { text: "Get in Touch", href: "#contact", show: true };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo - STRICT REQUIREMENT: ONLY "Tanjim" - never tanjim.dev */}
          <a 
            href="#" 
            className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-white group"
            id="nav-logo"
          >
            <div 
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: accentColor }}
            >
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <span className="group-hover:text-neutral-200 transition-colors">
              {logoText}
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.id || link.label}
                href={link.href}
                className="text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            {cta.show && (
              <a
                href={cta.href}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 shadow-md hover:shadow-lg hover:opacity-90 active:scale-95"
                style={{ backgroundColor: accentColor }}
                id="nav-cta-btn"
              >
                <span>{cta.text}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800/60 transition-colors"
            aria-label="Toggle Navigation Menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-card border-x-0 border-b border-neutral-800/80 px-4 pt-3 pb-6 space-y-3 mt-2 animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a
              key={link.id || link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-neutral-300 hover:text-white hover:bg-neutral-800/50 transition-colors"
            >
              {link.label}
            </a>
          ))}
          {cta.show && (
            <a
              href={cta.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full mt-4 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
              style={{ backgroundColor: accentColor }}
            >
              <span>{cta.text}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
        </div>
      )}
    </header>
  );
}
