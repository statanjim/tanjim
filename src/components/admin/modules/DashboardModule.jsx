import React, { useState } from 'react';
import { Link2, Copy, Check, Layout, FolderGit2, Cpu, Image, Sparkles, ExternalLink, ShieldAlert } from 'lucide-react';

export default function DashboardModule({ store, auth, setActiveTab }) {
  const { data } = store;
  const [copied, setCopied] = useState(false);

  const secretKey = data?.secretKey || 'tanjim123';
  const liveSecretUrl = `${window.location.origin}/?admin=${secretKey}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(liveSecretUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const projectCount = data?.projects?.length || 0;
  const skillCount = data?.skills?.length || 0;
  const mediaCount = data?.media?.length || 0;

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* Top Banner - Live Secret Link */}
      <div className="glass-card rounded-2xl p-6 border border-purple-500/30 bg-purple-950/20 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-300">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>YOUR SECRET CMS ADMIN LINK</span>
            </div>
            <h3 className="text-xl font-bold text-white">Share or Bookmark Your Secret URL</h3>
            <p className="text-xs text-neutral-400">
              Anyone with this link and your secret key can trigger the CMS login overlay.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300 max-w-xs truncate">
              {liveSecretUrl}
            </div>
            <button
              onClick={handleCopyLink}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Secret URL</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        <div 
          onClick={() => setActiveTab('projects')}
          className="glass-card rounded-2xl p-6 border border-neutral-800 hover:border-neutral-700 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-400">Total Projects</span>
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
              <FolderGit2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white mt-4 font-mono">{projectCount}</div>
          <p className="text-xs text-neutral-500 mt-2">Click to manage projects</p>
        </div>

        <div 
          onClick={() => setActiveTab('skills')}
          className="glass-card rounded-2xl p-6 border border-neutral-800 hover:border-neutral-700 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-400">Skill Tags</span>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white mt-4 font-mono">{skillCount}</div>
          <p className="text-xs text-neutral-500 mt-2">Click to edit tech stack</p>
        </div>

        <div 
          onClick={() => setActiveTab('media')}
          className="glass-card rounded-2xl p-6 border border-neutral-800 hover:border-neutral-700 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-400">Uploaded Media</span>
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
              <Image className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white mt-4 font-mono">{mediaCount}</div>
          <p className="text-xs text-neutral-500 mt-2">Click to open Media Library</p>
        </div>

      </div>

      {/* Guide & Netlify Instructions */}
      <div className="glass-card rounded-2xl p-6 border border-neutral-800 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span>🚀 Netlify Free Deployment Guide</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-neutral-300 font-sans">
          <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-2">
            <div className="font-semibold text-purple-400 font-mono">1. Instant Save to LocalStorage</div>
            <p>
              Every edit you make in this admin dashboard saves instantly to your browser's <code className="text-amber-300">tanjim_final_data</code> LocalStorage key. Your live site reads from this key.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-2">
            <div className="font-semibold text-purple-400 font-mono">2. Deploying on Netlify (Free)</div>
            <p>
              Push this repository to GitHub, link it on Netlify with build command <code className="text-amber-300">npm run build</code> and publish directory <code className="text-amber-300">dist</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-2">
            <div className="font-semibold text-purple-400 font-mono">3. Backup & Sync Across Devices</div>
            <p>
              Go to <strong className="text-white">Settings</strong> to export your customized content as a <code className="text-amber-300">.json</code> backup, or import it on another device anytime!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-2">
            <div className="font-semibold text-purple-400 font-mono">4. Secret Key Protection</div>
            <p>
              The public site has no admin buttons or links. Only adding <code className="text-amber-300">?admin={secretKey}</code> to the URL triggers the admin panel login screen.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
