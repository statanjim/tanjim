import React from 'react';
import { ArrowUp, Github, Linkedin, Twitter, Mail, Globe, MessageSquare } from 'lucide-react';

const SOCIAL_ICON_MAP = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  x: Twitter,
  email: Mail,
  mail: Mail,
  website: Globe,
  discord: MessageSquare
};

export default function Footer({ footerData, accentColor }) {
  const copyright = footerData?.copyright || "© 2026 Tanjim. All rights reserved.";
  const socials = footerData?.socials || [];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSocialIcon = (platform) => {
    const key = (platform || '').toLowerCase();
    for (const [k, Icon] of Object.entries(SOCIAL_ICON_MAP)) {
      if (key.includes(k)) return Icon;
    }
    return Globe;
  };

  return (
    <footer className="border-t border-neutral-800/80 bg-neutral-950/80 pt-12 pb-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-neutral-800/50">
          
          {/* Left Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-xl font-bold tracking-tight text-white">Tanjim</span>
            <p className="text-sm text-neutral-400 mt-1 max-w-md">
              Programmer & AI Builder focused on crafting clean, high-performance web applications.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3 flex-wrap justify-center">
            {socials.map((social) => {
              const IconComp = getSocialIcon(social.platform);
              return (
                <a
                  key={social.id || social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl glass-card text-neutral-400 hover:text-white hover:border-neutral-600 transition-all duration-200 hover:-translate-y-0.5"
                  title={social.platform}
                  aria-label={social.platform}
                >
                  <IconComp className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>{copyright}</p>
          
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg glass-card hover:text-white hover:border-neutral-700 transition-colors cursor-pointer"
            id="scroll-to-top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-neutral-400" />
          </button>
        </div>
      </div>
    </footer>
  );
}
