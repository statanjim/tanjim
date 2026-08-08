import React, { useState } from 'react';
import { Cpu, CheckCircle2, Sparkles, Terminal } from 'lucide-react';

export default function Skills({ skillsData, accentColor }) {
  const [filter, setFilter] = useState('');
  const skills = skillsData || [];

  const filteredSkills = skills.filter(s => s.toLowerCase().includes(filter.toLowerCase()));

  return (
    <section className="py-20 relative border-t border-neutral-800/60" id="skills">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-400 mb-2">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>03 // SKILLS & TECH</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Tech Stack & Tooling
            </h2>
            <p className="text-sm text-neutral-400 mt-1 max-w-xl">
              Technologies, frameworks, and programming tools I use to build fast, high-quality projects.
            </p>
          </div>

          <div className="w-full md:w-64">
            <input
              type="text"
              placeholder="Filter skills..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-neutral-900/90 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 font-mono"
            />
          </div>
        </div>

        {/* Skills Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredSkills.map((skill, index) => (
            <div
              key={index}
              className="glass-card rounded-xl px-4 py-3 border border-neutral-800/80 hover:border-neutral-700 transition-all duration-200 flex items-center gap-2.5 group hover:-translate-y-0.5 cursor-default"
            >
              <div 
                className="w-2 h-2 rounded-full transition-transform group-hover:scale-150"
                style={{ backgroundColor: accentColor }}
              />
              <span className="text-sm font-medium text-neutral-200 group-hover:text-white font-mono truncate">
                {skill}
              </span>
            </div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-10 text-neutral-500 font-mono text-sm">
            No skills match "{filter}".
          </div>
        )}

      </div>
    </section>
  );
}
