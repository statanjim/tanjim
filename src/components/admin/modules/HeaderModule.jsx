import React, { useState } from 'react';
import { Plus, Trash2, Save, MoveUp, MoveDown, Check } from 'lucide-react';

export default function HeaderModule({ store }) {
  const { data, updateData } = store;
  const [header, setHeader] = useState(data.header || {
    logo: "Tanjim",
    navLinks: [],
    cta: { text: "Get in Touch", href: "#contact", show: true }
  });
  const [saved, setSaved] = useState(false);

  const handleLogoChange = (e) => {
    setHeader(prev => ({ ...prev, logo: e.target.value }));
  };

  const handleNavLinkChange = (index, field, value) => {
    setHeader(prev => {
      const updatedLinks = [...prev.navLinks];
      updatedLinks[index] = { ...updatedLinks[index], [field]: value };
      return { ...prev, navLinks: updatedLinks };
    });
  };

  const handleAddNavLink = () => {
    setHeader(prev => ({
      ...prev,
      navLinks: [
        ...prev.navLinks,
        { id: Date.now().toString(), label: "New Link", href: "#" }
      ]
    }));
  };

  const handleDeleteNavLink = (index) => {
    setHeader(prev => ({
      ...prev,
      navLinks: prev.navLinks.filter((_, i) => i !== index)
    }));
  };

  const handleCtaChange = (field, value) => {
    setHeader(prev => ({
      ...prev,
      cta: { ...prev.cta, [field]: value }
    }));
  };

  const handleSave = () => {
    updateData({ header });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
        <div>
          <h3 className="text-lg font-bold text-white">Header & Navigation Module</h3>
          <p className="text-xs text-neutral-400">Manage brand logo, navigation menu links, and header CTA button.</p>
        </div>
        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
        >
          {saved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
          <span>{saved ? 'Saved!' : 'Save Header Changes'}</span>
        </button>
      </div>

      {/* Brand Logo */}
      <div className="glass-card rounded-2xl p-6 border border-neutral-800 space-y-4">
        <h4 className="text-sm font-semibold text-white">Brand Logo Text</h4>
        <input
          type="text"
          value={header.logo}
          onChange={handleLogoChange}
          placeholder="Tanjim"
          className="w-full max-w-md px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-purple-500 font-mono"
        />
        <p className="text-xs text-neutral-500">Logo text will be rendered in the top header.</p>
      </div>

      {/* Navigation Links */}
      <div className="glass-card rounded-2xl p-6 border border-neutral-800 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-white">Navigation Links</h4>
          <button
            onClick={handleAddNavLink}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-purple-300 bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Link</span>
          </button>
        </div>

        <div className="space-y-3">
          {header.navLinks.map((link, idx) => (
            <div key={link.id || idx} className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900/80 border border-neutral-800">
              <input
                type="text"
                value={link.label}
                onChange={(e) => handleNavLinkChange(idx, 'label', e.target.value)}
                placeholder="Label (e.g. About)"
                className="w-1/3 px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-purple-500"
              />
              <input
                type="text"
                value={link.href}
                onChange={(e) => handleNavLinkChange(idx, 'href', e.target.value)}
                placeholder="Href (e.g. #about)"
                className="w-1/2 px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
              />
              <button
                onClick={() => handleDeleteNavLink(idx)}
                className="p-2 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                title="Delete link"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="glass-card rounded-2xl p-6 border border-neutral-800 space-y-4">
        <h4 className="text-sm font-semibold text-white">Header CTA Button</h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Button Text</label>
            <input
              type="text"
              value={header.cta?.text || ''}
              onChange={(e) => handleCtaChange('text', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Button Target Link (href)</label>
            <input
              type="text"
              value={header.cta?.href || ''}
              onChange={(e) => handleCtaChange('href', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-purple-500 font-mono"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <input
            type="checkbox"
            id="showCta"
            checked={header.cta?.show ?? true}
            onChange={(e) => handleCtaChange('show', e.target.checked)}
            className="w-4 h-4 accent-purple-600 rounded"
          />
          <label htmlFor="showCta" className="text-xs text-neutral-300 cursor-pointer">
            Display Header CTA Button on desktop and mobile drawer
          </label>
        </div>
      </div>

    </div>
  );
}
