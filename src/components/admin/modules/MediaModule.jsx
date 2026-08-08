import React, { useState } from 'react';
import { Upload, Image as ImageIcon, Copy, Check, Trash2, AlertTriangle, HardDrive } from 'lucide-react';

export default function MediaModule({ store }) {
  const { data, updateData } = store;
  const mediaList = data.media || [];

  const [copiedId, setCopiedId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setUploading(true);

    let newMediaItems = [];
    let processed = 0;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newMediaItems.push({
          id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          name: file.name,
          dataUrl: reader.result,
          size: `${(file.size / 1024).toFixed(1)} KB`,
          date: new Date().toLocaleDateString()
        });

        processed++;
        if (processed === files.length) {
          updateData({ media: [...newMediaItems, ...mediaList] });
          setUploading(false);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleCopyUrl = (item) => {
    navigator.clipboard.writeText(item.dataUrl);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteMedia = (id) => {
    if (confirm('Delete this image from Media Library?')) {
      const updated = mediaList.filter(m => m.id !== id);
      updateData({ media: updated });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
        <div>
          <h3 className="text-lg font-bold text-white">Media Library Module</h3>
          <p className="text-xs text-neutral-400">Upload base64 image assets, preview images, and copy image Data URLs for project covers.</p>
        </div>
      </div>

      {/* Storage Limit Warning */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 shrink-0 text-amber-400 mt-0.5" />
        <div className="space-y-1">
          <span className="font-semibold block font-mono">LocalStorage Capacity Note (~5MB total)</span>
          <p className="text-amber-200/80 leading-relaxed">
            Base64 images are stored in browser LocalStorage. For best performance and Netlify hosting efficiency, upload small optimized images or use external URLs (Unsplash, Imgur, Cloudinary).
          </p>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="glass-card rounded-2xl p-8 border-2 border-dashed border-neutral-800 hover:border-purple-500/50 transition-colors text-center relative group">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileUpload}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />
        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
          <Upload className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-bold text-white">
          {uploading ? 'Processing Image Upload...' : 'Click or Drag & Drop Images Here'}
        </h4>
        <p className="text-xs text-neutral-500 mt-1 font-mono">
          Supports PNG, JPG, WEBP, SVG
        </p>
      </div>

      {/* Media Grid */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-white flex items-center justify-between">
          <span>Uploaded Assets ({mediaList.length})</span>
        </h4>

        {mediaList.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {mediaList.map((item) => (
              <div
                key={item.id}
                className="glass-card rounded-xl overflow-hidden border border-neutral-800 hover:border-neutral-700 transition-all group flex flex-col justify-between"
              >
                <div className="relative h-32 bg-neutral-900 overflow-hidden">
                  <img
                    src={item.dataUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <button
                    onClick={() => handleDeleteMedia(item.id)}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-neutral-950/80 text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-500/20"
                    title="Delete Image"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-3 bg-neutral-950/80 text-xs space-y-2">
                  <div className="truncate font-mono text-neutral-300 font-medium" title={item.name}>
                    {item.name}
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-neutral-500 font-mono">
                    <span>{item.size || 'Base64'}</span>
                    <button
                      onClick={() => handleCopyUrl(item)}
                      className="text-purple-400 hover:text-purple-300 flex items-center gap-1 font-semibold"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy URL</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-2xl p-10 text-center text-neutral-500 font-mono text-xs border border-neutral-800">
            No images uploaded to media library yet. Upload an image above!
          </div>
        )}
      </div>

    </div>
  );
}
