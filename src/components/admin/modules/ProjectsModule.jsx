import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Save, Copy, ArrowUp, ArrowDown, Image as ImageIcon, Upload, ExternalLink, Github, Check, X } from 'lucide-react';

export default function ProjectsModule({ store }) {
  const { data, updateData } = store;
  const projects = data.projects || [];

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    tags: '',
    liveUrl: '',
    githubUrl: ''
  });
  const [isNew, setIsNew] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');

  const showSaved = (msg) => {
    setSavedMsg(msg);
    setTimeout(() => setSavedMsg(''), 2000);
  };

  const handleOpenAddForm = () => {
    setFormData({
      title: '',
      description: '',
      image: '',
      tags: 'React, Tailwind, JavaScript',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/tanjim'
    });
    setIsNew(true);
    setEditingId('new');
  };

  const handleOpenEditForm = (project) => {
    setFormData({
      title: project.title || '',
      description: project.description || '',
      image: project.image || '',
      tags: (project.tags || []).join(', '),
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || ''
    });
    setIsNew(false);
    setEditingId(project.id);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProject = (e) => {
    e.preventDefault();
    if (!formData.title) return;

    const tagsArray = formData.tags
      ? formData.tags.split(',').map(t => t.trim()).filter(Boolean)
      : [];

    let updatedProjects = [...projects];

    if (isNew) {
      const newProject = {
        id: `proj-${Date.now()}`,
        title: formData.title,
        description: formData.description,
        image: formData.image,
        tags: tagsArray,
        liveUrl: formData.liveUrl,
        githubUrl: formData.githubUrl
      };
      updatedProjects = [newProject, ...updatedProjects];
    } else {
      updatedProjects = updatedProjects.map(p => {
        if (p.id === editingId) {
          return {
            ...p,
            title: formData.title,
            description: formData.description,
            image: formData.image,
            tags: tagsArray,
            liveUrl: formData.liveUrl,
            githubUrl: formData.githubUrl
          };
        }
        return p;
      });
    }

    updateData({ projects: updatedProjects });
    setEditingId(null);
    showSaved('Project saved successfully!');
  };

  const handleDeleteProject = (id) => {
    if (confirm('Are you sure you want to delete this project?')) {

      const updated = projects.filter(p => p.id !== id);
      updateData({ projects: updated });
      showSaved('Project deleted.');
    }
  };

  const handleDuplicateProject = (project) => {
    const duplicated = {
      ...project,
      id: `proj-${Date.now()}`,
      title: `${project.title} (Copy)`
    };
    const updated = [duplicated, ...projects];
    updateData({ projects: updated });
    showSaved('Project duplicated.');
  };

  const handleMove = (index, direction) => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= projects.length) return;

    const reordered = [...projects];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(newIndex, 0, moved);

    updateData({ projects: reordered });
    showSaved('Projects reordered.');
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
        <div>
          <h3 className="text-lg font-bold text-white">Projects Management Module</h3>
          <p className="text-xs text-neutral-400">Full CRUD for your portfolio project cards, images, tags, and code links.</p>
        </div>
        <button
          onClick={handleOpenAddForm}
          className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {savedMsg && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4" />
          <span>{savedMsg}</span>
        </div>
      )}

      {/* Edit Modal / Form */}
      {editingId && (
        <div className="glass-card rounded-2xl p-6 border border-purple-500/30 bg-purple-950/10 space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
            <h4 className="text-sm font-bold text-white">
              {isNew ? 'Create New Project' : 'Edit Project'}
            </h4>
            <button
              onClick={() => setEditingId(null)}
              className="p-1 rounded-lg text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSaveProject} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. AI Assistant Dashboard"
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-purple-500 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1">Tags (Comma Separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="React, AI, Tailwind, Vite"
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-300 mb-1">Description</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief summary of what this project does and key features built..."
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-purple-500 resize-none"
              />
            </div>

            {/* Image URL & Upload */}
            <div>
              <label className="block text-xs font-mono text-neutral-300 mb-1">Project Cover Image (URL or File Upload)</label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/... or base64"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-purple-500 font-mono truncate"
                />
                <label className="px-3.5 py-2.5 rounded-xl bg-purple-600/20 text-purple-300 border border-purple-500/30 hover:bg-purple-600/30 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer shrink-0">
                  <Upload className="w-4 h-4" />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {formData.image && (
                <div className="mt-3 relative w-32 h-20 rounded-xl overflow-hidden border border-neutral-800">
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1">Live Demo URL</label>
                <input
                  type="text"
                  value={formData.liveUrl}
                  onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                  placeholder="https://example.com/demo"
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1">GitHub Repo URL</label>
                <input
                  type="text"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  placeholder="https://github.com/tanjim/repo"
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setEditingId(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 transition-colors shadow-md"
              >
                Save Project
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects List Table / Cards */}
      <div className="space-y-3">
        {projects.map((project, index) => (
          <div
            key={project.id || index}
            className="glass-card rounded-2xl p-4 border border-neutral-800/80 hover:border-neutral-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4 min-w-0">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 border border-neutral-800"
                />
              ) : (
                <div className="w-16 h-16 rounded-xl bg-neutral-900 flex items-center justify-center text-neutral-600 shrink-0 border border-neutral-800">
                  <ImageIcon className="w-6 h-6" />
                </div>
              )}

              <div className="min-w-0">
                <h4 className="text-sm font-bold text-white truncate">{project.title}</h4>
                <p className="text-xs text-neutral-400 truncate max-w-md mt-0.5">{project.description}</p>
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {project.tags.map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-900 text-neutral-300 border border-neutral-800">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex items-center gap-1.5 shrink-0 justify-end pt-2 md:pt-0 border-t md:border-t-0 border-neutral-800">
              <button
                onClick={() => handleMove(index, 'up')}
                disabled={index === 0}
                className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 disabled:opacity-30 transition-colors"
                title="Move Up"
              >
                <ArrowUp className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleMove(index, 'down')}
                disabled={index === projects.length - 1}
                className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 disabled:opacity-30 transition-colors"
                title="Move Down"
              >
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleDuplicateProject(project)}
                className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                title="Duplicate Project"
              >
                <Copy className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleOpenEditForm(project)}
                className="p-2 rounded-lg text-purple-300 hover:bg-purple-500/10 transition-colors"
                title="Edit Project"
              >
                <Edit3 className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleDeleteProject(project.id)}
                className="p-2 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                title="Delete Project"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

          </div>
        ))}

        {projects.length === 0 && (
          <div className="glass-card rounded-2xl p-8 text-center text-neutral-500 font-mono text-sm border border-neutral-800">
            No projects found. Click "Add New Project" above to create one.
          </div>
        )}
      </div>

    </div>
  );
}
