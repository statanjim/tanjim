import React, { useState } from 'react';
import { Save, Plus, Trash2, Check, Code } from 'lucide-react';

export default function HeroModule({ store }) {
  const { data, updateData } = store;
  const [hero, setHero] = useState(data.hero || {
    title: "I am Tanjim — Programmer.",
    subtitle: "A beginner programmer from Bangladesh building real projects and using AI for better results, faster and cleaner.",
    primaryBtn: { text: "View Projects", link: "#projects" },
    secondaryBtn: { text: "Contact Me", link: "#contact" },
    codeBlock: []
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateData({ hero });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCodeLineChange = (index, value) => {
    setHero(prev => {
      const updatedCode = [...prev.codeBlock];
      updatedCode[index] = value;
      return { ...prev, codeBlock: updatedCode };
    });
  };

  const handleAddCodeLine = () => {
    setHero(prev => ({
      ...prev,
      codeBlock: [...prev.codeBlock, '  // New code line']
    }));
  };

  const handleDeleteCodeLine = (index) => {
    setHero(prev => ({
      ...prev,
      codeBlock: prev.codeBlock.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
        <div>
          <h3 className="text-lg font-bold text-white">Hero Section Module</h3>
          <p className="text-xs text-neutral-400">Edit headline, tagline, call-to-action buttons, and code window lines.</p>
        </div>
        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
        >
          {saved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
          <span>{saved ? 'Saved!' : 'Save Hero Changes'}</span>
        </button>
      </div>

      {/* Main Headline & Subtitle */}
      <div className="glass-card rounded-2xl p-6 border border-neutral-800 space-y-4">
        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-1">Hero Title / Headline</label>
          <input
            type="text"
            value={hero.title}
            onChange={(e) => setHero({ ...hero, title: e.target.value })}
            placeholder="I am Tanjim — Programmer."
            className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-purple-500 font-semibold"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-1">Hero Subtitle</label>
          <textarea
            rows={3}
            value={hero.subtitle}
            onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
            placeholder="A beginner programmer from Bangladesh..."
            className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-purple-500 resize-none"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="glass-card rounded-2xl p-6 border border-neutral-800 space-y-4">
        <h4 className="text-sm font-semibold text-white">Call-to-Action Buttons</h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-3 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <span className="text-xs font-mono text-purple-400 font-semibold block">Primary Button</span>
            <div>
              <label className="block text-[11px] font-mono text-neutral-400 mb-1">Text</label>
              <input
                type="text"
                value={hero.primaryBtn?.text || ''}
                onChange={(e) => setHero({ ...hero, primaryBtn: { ...hero.primaryBtn, text: e.target.value } })}
                className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-neutral-400 mb-1">Target Link</label>
              <input
                type="text"
                value={hero.primaryBtn?.link || ''}
                onChange={(e) => setHero({ ...hero, primaryBtn: { ...hero.primaryBtn, link: e.target.value } })}
                className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
              />
            </div>
          </div>

          <div className="space-y-3 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <span className="text-xs font-mono text-neutral-400 font-semibold block">Secondary Button</span>
            <div>
              <label className="block text-[11px] font-mono text-neutral-400 mb-1">Text</label>
              <input
                type="text"
                value={hero.secondaryBtn?.text || ''}
                onChange={(e) => setHero({ ...hero, secondaryBtn: { ...hero.secondaryBtn, text: e.target.value } })}
                className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-neutral-400 mb-1">Target Link</label>
              <input
                type="text"
                value={hero.secondaryBtn?.link || ''}
                onChange={(e) => setHero({ ...hero, secondaryBtn: { ...hero.secondaryBtn, link: e.target.value } })}
                className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Code Block Lines Editor */}
      <div className="glass-card rounded-2xl p-6 border border-neutral-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-purple-400" />
            <h4 className="text-sm font-semibold text-white">Interactive Code Window Lines</h4>
          </div>
          <button
            onClick={handleAddCodeLine}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-purple-300 bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Line</span>
          </button>
        </div>

        <div className="space-y-2 bg-neutral-950 p-4 rounded-xl border border-neutral-800 font-mono text-xs">
          {hero.codeBlock?.map((line, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="text-neutral-600 select-none w-6 text-right font-mono">{idx + 1}</span>
              <input
                type="text"
                value={line}
                onChange={(e) => handleCodeLineChange(idx, e.target.value)}
                className="flex-1 px-3 py-1.5 rounded bg-neutral-900 border border-neutral-800 text-xs text-neutral-200 focus:outline-none focus:border-purple-500 font-mono"
              />
              <button
                onClick={() => handleDeleteCodeLine(idx)}
                className="p-1.5 rounded text-rose-400 hover:bg-rose-500/10 transition-colors"
                title="Delete line"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
