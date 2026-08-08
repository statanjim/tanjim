import React, { useState } from 'react';
import { Save, Plus, Trash2, Check, Upload, Image as ImageIcon } from 'lucide-react';

export default function AboutModule({ store }) {
  const { data, updateData } = store;
  const [about, setAbout] = useState(data.about || {
    longText: "",
    stats: [],
    location: "Bangladesh",
    avatar: ""
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateData({ about });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAbout(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStatChange = (index, field, value) => {
    setAbout(prev => {
      const updatedStats = [...prev.stats];
      updatedStats[index] = { ...updatedStats[index], [field]: value };
      return { ...prev, stats: updatedStats };
    });
  };

  const handleAddStat = () => {
    setAbout(prev => ({
      ...prev,
      stats: [
        ...prev.stats,
        { id: Date.now().toString(), label: "New Metric", value: "100+" }
      ]
    }));
  };

  const handleDeleteStat = (index) => {
    setAbout(prev => ({
      ...prev,
      stats: prev.stats.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
        <div>
          <h3 className="text-lg font-bold text-white">About Section Module</h3>
          <p className="text-xs text-neutral-400">Edit biography text, profile picture, location, and key statistics badges.</p>
        </div>
        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
        >
          {saved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
          <span>{saved ? 'Saved!' : 'Save About Changes'}</span>
        </button>
      </div>

      {/* Long Bio */}
      <div className="glass-card rounded-2xl p-6 border border-neutral-800 space-y-4">
        <label className="block text-xs font-mono text-neutral-400">Biography Paragraphs</label>
        <textarea
          rows={6}
          value={about.longText}
          onChange={(e) => setAbout({ ...about, longText: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-purple-500 leading-relaxed resize-y"
        />
      </div>

      {/* Profile Image & Location */}
      <div className="glass-card rounded-2xl p-6 border border-neutral-800 space-y-4">
        <h4 className="text-sm font-semibold text-white">Avatar & Location</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Location Badge</label>
            <input
              type="text"
              value={about.location}
              onChange={(e) => setAbout({ ...about, location: e.target.value })}
              placeholder="Bangladesh 🇧🇩"
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Avatar Image (Upload or URL)</label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={about.avatar}
                onChange={(e) => setAbout({ ...about, avatar: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-purple-500 font-mono truncate"
              />
              <label className="px-3 py-2.5 rounded-xl bg-purple-600/20 text-purple-300 border border-purple-500/30 hover:bg-purple-600/30 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer shrink-0">
                <Upload className="w-4 h-4" />
                <span>Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {about.avatar && (
          <div className="pt-2 flex items-center gap-4">
            <img src={about.avatar} alt="Avatar preview" className="w-16 h-16 rounded-xl object-cover border border-neutral-800" />
            <button
              onClick={() => setAbout({ ...about, avatar: '' })}
              className="text-xs text-rose-400 hover:underline"
            >
              Remove Avatar Image
            </button>
          </div>
        )}
      </div>

      {/* Stats Badges CRUD */}
      <div className="glass-card rounded-2xl p-6 border border-neutral-800 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-white">Key Statistics Badges</h4>
          <button
            onClick={handleAddStat}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-purple-300 bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Metric</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {about.stats?.map((stat, idx) => (
            <div key={stat.id || idx} className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-center gap-3">
              <input
                type="text"
                value={stat.value}
                onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
                placeholder="Value (e.g. 15+)"
                className="w-1/3 px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-purple-300 font-mono font-bold focus:outline-none focus:border-purple-500"
              />
              <input
                type="text"
                value={stat.label}
                onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
                placeholder="Label (e.g. Projects)"
                className="flex-1 px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={() => handleDeleteStat(idx)}
                className="p-2 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                title="Delete stat"
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
