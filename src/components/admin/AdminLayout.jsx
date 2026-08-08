import React, { useState } from 'react';
import { 
  LayoutDashboard, Layout, Sparkles, User, FolderGit2, Cpu, 
  PanelBottom, Palette, Image, Settings, ExternalLink, LogOut, 
  Menu, X, Code2, ShieldCheck, Check
} from 'lucide-react';

import DashboardModule from './modules/DashboardModule';
import HeaderModule from './modules/HeaderModule';
import HeroModule from './modules/HeroModule';
import AboutModule from './modules/AboutModule';
import ProjectsModule from './modules/ProjectsModule';
import SkillsModule from './modules/SkillsModule';
import FooterModule from './modules/FooterModule';
import AppearanceModule from './modules/AppearanceModule';
import MediaModule from './modules/MediaModule';
import SettingsModule from './modules/SettingsModule';

const NAV_MODULES = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'header', label: 'Header & Nav', icon: Layout },
  { id: 'hero', label: 'Hero Section', icon: Sparkles },
  { id: 'about', label: 'About Section', icon: User },
  { id: 'projects', label: 'Projects (CRUD)', icon: FolderGit2 },
  { id: 'skills', label: 'Skills & Tech', icon: Cpu },
  { id: 'footer', label: 'Footer Section', icon: PanelBottom },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'media', label: 'Media Library', icon: Image },
  { id: 'settings', label: 'Settings & Security', icon: Settings },
];

export default function AdminLayout({ store, auth, onClose }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    auth.logout();
    onClose();
  };

  const renderModule = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardModule store={store} auth={auth} setActiveTab={setActiveTab} />;
      case 'header':
        return <HeaderModule store={store} />;
      case 'hero':
        return <HeroModule store={store} />;
      case 'about':
        return <AboutModule store={store} />;
      case 'projects':
        return <ProjectsModule store={store} />;
      case 'skills':
        return <SkillsModule store={store} />;
      case 'footer':
        return <FooterModule store={store} />;
      case 'appearance':
        return <AppearanceModule store={store} />;
      case 'media':
        return <MediaModule store={store} />;
      case 'settings':
        return <SettingsModule store={store} auth={auth} onLogout={handleLogout} />;
      default:
        return <DashboardModule store={store} auth={auth} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0a] text-neutral-100 flex flex-col md:flex-row overflow-hidden font-sans">
      
      {/* Sidebar for Desktop */}
      <aside className={`w-full md:w-64 bg-neutral-950 border-r border-neutral-800 flex flex-col shrink-0 ${
        sidebarOpen ? 'block' : 'hidden md:flex'
      }`}>
        
        {/* Sidebar Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center text-white">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-bold text-white block">Tanjim CMS</span>
              <span className="text-[10px] font-mono text-purple-400 block">v2.5 Headless Admin</span>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1.5 rounded-lg text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {NAV_MODULES.map((module) => {
            const Icon = module.icon;
            const isActive = activeTab === module.id;
            return (
              <button
                key={module.id}
                onClick={() => {
                  setActiveTab(module.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-purple-600 text-white font-semibold shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
                <span>{module.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer Controls */}
        <div className="p-3 border-t border-neutral-800 space-y-1">
          <button
            onClick={onClose}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 transition-colors cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Public Site</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>

      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#0d0d0d]">
        
        {/* Top Bar */}
        <header className="h-16 border-b border-neutral-800 bg-neutral-950/80 px-4 sm:px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <h2 className="text-sm font-bold text-white capitalize">
                {NAV_MODULES.find(m => m.id === activeTab)?.label || 'Dashboard'}
              </h2>
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Saved to LocalStorage (tanjim_final_data)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-neutral-300 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
              <span>Preview Portfolio</span>
            </button>

            <div className="text-xs font-mono text-neutral-400 px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800">
              Admin: {auth.creds?.email || 'Logged In'}
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full">
          {renderModule()}
        </main>

      </div>

    </div>
  );
}
