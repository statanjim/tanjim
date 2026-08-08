import React, { useState } from 'react';
import { Save, Plus, Trash2, Check, Share2 } from 'lucide-react';

export default function FooterModule({ store }) {
  const { data, updateData } = store;
  const [footer, setFooter] = useState(data.footer || {
    copyright: "© 2026 Tanjim. All rights reserved.",
    socials: []
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateData({ footer });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleSocialChange = (index, field, value) => {
    setFooter(prev => {
      const updatedSocials = [...prev.socials];
      updatedSocials[index] = { ...updatedSocials[index], [field]: value };
      return { ...prev, socials: updatedSocials };
    });
  };

  const handleAddSocial = () => {
    setFooter(prev => ({
      ...prev,
      socials: [
        ...prev.socials,
        { id: Date.now().toString(), platform: "GitHub", url: "https://github.com" }
      ]
    }));
  };

  const handleDeleteSocial = (index) => {
    setFooter(prev => ({
      ...prev,
      socials: prev.socials.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
        <div>
          <h3 className="text-lg font-bold text-white">Footer Module</h3>
          <p className="text-xs text-neutral-400">Manage copyright notice and social network links.</p>
        </div>
        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
        >
          {saved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
          <span>{saved ? 'Saved!' : 'Save Footer Changes'}</span>
        </button>
      </div>

      {/* Copyright */}
      <div className="glass-card rounded-2xl p-6 border border-neutral-800 space-y-4">
        <label className="block text-xs font-mono text-neutral-400">Copyright Statement</label>
        <input
          type="text"
          value={footer.copyright}
          onChange={(e) => setFooter({ ...footer, copyright: e.target.value })}
          placeholder="© 2026 Tanjim. All rights reserved."
          className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-purple-500"
        />
      </div>

      {/* Social Links CRUD */}
      <div className="glass-card rounded-2xl p-6 border border-neutral-800 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-white">Social Media Links</h4>
          <button
            onClick={handleAddSocial}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-purple-300 bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Social Link</span>
          </button>
        </div>

        <div className="space-y-3">
          {footer.socials?.map((social, idx) => (
            <div key={social.id || idx} className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-center gap-3">
              <input
                type="text"
                value={social.platform}
                onChange={(e) => handleSocialChange(idx, 'platform', e.target.value)}
                placeholder="Platform (e.g. GitHub)"
                className="w-1/3 px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-purple-500"
              />
              <input
                type="text"
                value={social.url}
                onChange={(e) => handleSocialChange(idx, 'url', e.target.value)}
                placeholder="URL (e.g. https://github.com/... or mailto:...)"
                className="flex-1 px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
              />
              <button
                onClick={() => handleDeleteSocial(idx)}
                className="p-2 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                title="Delete social"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
