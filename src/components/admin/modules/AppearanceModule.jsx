import React, { useState } from 'react';
import { Save, Check, Palette, Grid } from 'lucide-react';

const ACCENT_PRESETS = [
  { name: 'Violet', color: '#8b5cf6' },
  { name: 'Cyan', color: '#06b6d4' },
  { name: 'Emerald', color: '#10b981' },
  { name: 'Rose', color: '#f43f5e' },
  { name: 'Amber', color: '#f59e0b' },
  { name: 'Indigo', color: '#6366f1' },
];

export default function AppearanceModule({ store }) {
  const { data, updateData } = store;
  const [appearance, setAppearance] = useState(data.appearance || {
    accentColor: "#8b5cf6",
    bgColor: "#0a0a0a",
    showGrid: true
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateData({ appearance });
    // Update CSS variables immediately on page
    document.documentElement.style.setProperty('--accent', appearance.accentColor);
    document.documentElement.style.setProperty('--bg-color', appearance.bgColor);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handlePresetSelect = (hex) => {
    setAppearance(prev => ({ ...prev, accentColor: hex }));
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
        <div>
          <h3 className="text-lg font-bold text-white">Appearance & Theme Module</h3>
          <p className="text-xs text-neutral-400">Customize brand accent colors, background shade, and visual grid patterns.</p>
        </div>
        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
        >
          {saved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
          <span>{saved ? 'Saved!' : 'Save Theme Changes'}</span>
        </button>
      </div>

      {/* Accent Color */}
      <div className="glass-card rounded-2xl p-6 border border-neutral-800 space-y-4">
        <h4 className="text-sm font-semibold text-white flex items-center gap-2">
          <Palette className="w-4 h-4 text-purple-400" />
          <span>Accent Color (--accent)</span>
        </h4>

        <div className="flex items-center gap-4">
          <input
            type="color"
            value={appearance.accentColor}
            onChange={(e) => setAppearance({ ...appearance, accentColor: e.target.value })}
            className="w-12 h-12 rounded-xl bg-transparent border-0 cursor-pointer"
          />
          <input
            type="text"
            value={appearance.accentColor}
            onChange={(e) => setAppearance({ ...appearance, accentColor: e.target.value })}
            className="w-36 px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white font-mono uppercase focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Color Presets */}
        <div>
          <span className="text-xs font-mono text-neutral-400 block mb-2.5">Preset Palette:</span>
          <div className="flex flex-wrap gap-3">
            {ACCENT_PRESETS.map((preset) => (
              <button
                key={preset.color}
                onClick={() => handlePresetSelect(preset.color)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono border transition-all cursor-pointer ${
                  appearance.accentColor.toLowerCase() === preset.color.toLowerCase()
                    ? 'border-white bg-neutral-800 text-white shadow-lg'
                    : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
                }`}
              >
                <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: preset.color }} />
                <span>{preset.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Background Color & Grid */}
      <div className="glass-card rounded-2xl p-6 border border-neutral-800 space-y-4">
        <h4 className="text-sm font-semibold text-white flex items-center gap-2">
          <Grid className="w-4 h-4 text-purple-400" />
          <span>Background & Canvas Grid</span>
        </h4>

        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-1.5">Background Base Hex</label>
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={appearance.bgColor}
              onChange={(e) => setAppearance({ ...appearance, bgColor: e.target.value })}
              className="w-10 h-10 rounded-xl bg-transparent border-0 cursor-pointer"
            />
            <input
              type="text"
              value={appearance.bgColor}
              onChange={(e) => setAppearance({ ...appearance, bgColor: e.target.value })}
              className="w-36 px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white font-mono uppercase focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        <div className="pt-2 flex items-center gap-3">
          <input
            type="checkbox"
            id="showGrid"
            checked={appearance.showGrid ?? true}
            onChange={(e) => setAppearance({ ...appearance, showGrid: e.target.checked })}
            className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
          />
          <label htmlFor="showGrid" className="text-xs text-neutral-300 cursor-pointer">
            Enable subtle background grid overlay
          </label>
        </div>
      </div>

    </div>
  );
}
