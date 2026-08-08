import React, { useState } from 'react';
import { Plus, Trash2, Save, Check, Sparkles, Cpu } from 'lucide-react';

const PRESET_SKILLS = [
  "TypeScript", "Next.js", "Express.js", "PostgreSQL", "MongoDB",
  "Docker", "GraphQL", "Redux Toolkit", "Framer Motion", "Tailwind CSS",
  "Firebase", "Git", "Jest", "Vite", "Gemini API"
];

export default function SkillsModule({ store }) {
  const { data, updateData } = store;
  const [skills, setSkills] = useState(data.skills || []);
  const [newSkill, setNewSkill] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateData({ skills });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (!skills.includes(newSkill.trim())) {
      setSkills(prev => [...prev, newSkill.trim()]);
    }
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(prev => prev.filter(s => s !== skillToRemove));
  };

  const handleAddPreset = (preset) => {
    if (!skills.includes(preset)) {
      setSkills(prev => [...prev, preset]);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
        <div>
          <h3 className="text-lg font-bold text-white">Skills & Tech Stack Module</h3>
          <p className="text-xs text-neutral-400">Add, delete, or organize technical skill tags displayed on your portfolio.</p>
        </div>
        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
        >
          {saved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
          <span>{saved ? 'Saved!' : 'Save Skills Changes'}</span>
        </button>
      </div>

      {/* Add Skill Input */}
      <div className="glass-card rounded-2xl p-6 border border-neutral-800 space-y-4">
        <h4 className="text-sm font-semibold text-white">Add New Skill Tag</h4>
        <form onSubmit={handleAddSkill} className="flex gap-3">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="e.g. TypeScript or Gemini API"
            className="flex-1 px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-purple-500 font-mono"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Skill</span>
          </button>
        </form>

        {/* Presets */}
        <div className="pt-2">
          <span className="text-xs font-mono text-neutral-400 block mb-2">Quick Presets:</span>
          <div className="flex flex-wrap gap-2">
            {PRESET_SKILLS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => handleAddPreset(preset)}
                disabled={skills.includes(preset)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${
                  skills.includes(preset)
                    ? 'bg-neutral-900 text-neutral-600 cursor-not-allowed border border-neutral-800'
                    : 'bg-neutral-800/80 text-purple-300 hover:bg-purple-500/20 border border-purple-500/20 cursor-pointer'
                }`}
              >
                + {preset}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Skills Pill Grid */}
      <div className="glass-card rounded-2xl p-6 border border-neutral-800 space-y-4">
        <h4 className="text-sm font-semibold text-white flex items-center justify-between">
          <span>Active Skill Pills ({skills.length})</span>
          <span className="text-xs font-mono text-neutral-500">Click X to delete</span>
        </h4>

        <div className="flex flex-wrap gap-2.5">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-900/90 border border-neutral-800 text-xs font-mono text-neutral-200 group hover:border-neutral-700"
            >
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="text-neutral-500 hover:text-rose-400 p-0.5 rounded transition-colors"
                title="Remove skill"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {skills.length === 0 && (
          <p className="text-xs text-neutral-500 font-mono py-4 text-center">
            No skills added yet. Add skills above.
          </p>
        )}
      </div>

    </div>
  );
}
