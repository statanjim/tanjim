import React, { useState } from 'react';
import { FolderGit2, ExternalLink, Github, Search, Code, Sparkles } from 'lucide-react';

export default function Projects({ projectsData, accentColor }) {
  const [selectedTag, setSelectedTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const projects = projectsData || [];

  // Extract unique tags
  const allTags = ['All', ...new Set(projects.flatMap(p => p.tags || []))];

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesTag = selectedTag === 'All' || (project.tags && project.tags.includes(selectedTag));
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.tags && project.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesTag && matchesSearch;
  });

  return (
    <section className="py-20 relative border-t border-neutral-800/60" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-400 mb-2">
              <FolderGit2 className="w-3.5 h-3.5 text-blue-400" />
              <span>02 // PORTFOLIO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Featured Projects
            </h2>
            <p className="text-sm text-neutral-400 mt-1 max-w-xl">
              Real projects built with modern frontend tools, interactive UI design, and AI automation.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-neutral-900/90 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition-colors"
            />
          </div>
        </div>

        {/* Tag Filters */}
        {allTags.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium font-mono whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  selectedTag === tag
                    ? 'text-white shadow-md'
                    : 'bg-neutral-900/60 text-neutral-400 border border-neutral-800/80 hover:text-white hover:border-neutral-700'
                }`}
                style={selectedTag === tag ? { backgroundColor: accentColor } : {}}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id || project.title}
                className="glass-card rounded-2xl overflow-hidden border border-neutral-800/80 hover:border-neutral-700 transition-all duration-300 flex flex-col group hover:-translate-y-1"
              >
                {/* Project Image */}
                <div className="relative h-52 sm:h-60 overflow-hidden bg-neutral-900">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-neutral-900 text-neutral-600">
                      <Code className="w-12 h-12" />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-80" />

                  {/* Top Links floating */}
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-neutral-900/90 backdrop-blur-md text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-600 transition-all"
                        title="View Code on GitHub"
                        aria-label="GitHub Code"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl text-white backdrop-blur-md transition-all shadow-md"
                        style={{ backgroundColor: accentColor }}
                        title="Live Demo"
                        aria-label="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-800/60">
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-2xl p-12 text-center text-neutral-400 border border-neutral-800">
            <p className="text-base">No projects match your filter criteria.</p>
            <button
              onClick={() => { setSelectedTag('All'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-neutral-800 hover:bg-neutral-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
