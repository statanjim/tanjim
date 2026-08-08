import React, { useState } from 'react';
import { Shield, Key, Download, Upload, RotateCcw, LogOut, Check, AlertTriangle, Eye, EyeOff } from 'lucide-react';

export default function SettingsModule({ store, auth, onLogout }) {
  const { data, updateData, exportJSON, importJSON, resetData } = store;
  const { creds, updateCreds } = auth;

  // Creds form state
  const [email, setEmail] = useState(creds.email || '');
  const [password, setPassword] = useState(creds.password || '');
  const [showPassword, setShowPassword] = useState(false);
  const [credsSaved, setCredsSaved] = useState(false);

  // Secret key form state
  const [secretKey, setSecretKey] = useState(data.secretKey || 'tanjim123');
  const [secretSaved, setSecretSaved] = useState(false);

  // Status feedback
  const [importStatus, setImportStatus] = useState('');

  const handleSaveCreds = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    updateCreds({ email, password });
    setCredsSaved(true);
    setTimeout(() => setCredsSaved(false), 2000);
  };

  const handleSaveSecretKey = (e) => {
    e.preventDefault();
    if (!secretKey.trim()) return;
    updateData({ secretKey: secretKey.trim() });
    setSecretSaved(true);
    setTimeout(() => setSecretSaved(false), 2000);
  };

  const handleFileImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const res = importJSON(event.target.result);
      if (res.success) {
        setImportStatus('JSON Imported and Store Updated Successfully!');
        setTimeout(() => setImportStatus(''), 3000);
      } else {
        alert('Failed to import JSON: ' + res.error);
      }
    };
    reader.readAsText(file);
  };

  const handleResetToDefault = () => {
    if (confirm('Are you sure you want to reset all portfolio content to default demo data? Custom changes will be overwritten.')) {
      resetData();
      setSecretKey('tanjim123');
      alert('Portfolio reset to default data.');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
        <div>
          <h3 className="text-lg font-bold text-white">System & Security Settings</h3>
          <p className="text-xs text-neutral-400">Manage login credentials, secret key, JSON export/import backup, and store reset.</p>
        </div>
      </div>

      {importStatus && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{importStatus}</span>
        </div>
      )}

      {/* 1. Change Admin Email & Password */}
      <div className="glass-card rounded-2xl p-6 border border-neutral-800 space-y-4">
        <h4 className="text-sm font-semibold text-white flex items-center gap-2">
          <Shield className="w-4 h-4 text-purple-400" />
          <span>1. Change Admin Login Credentials</span>
        </h4>

        <form onSubmit={handleSaveCreds} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1">Admin Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-purple-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1">Admin Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-purple-500 font-mono pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 transition-colors flex items-center gap-2 cursor-pointer"
          >
            {credsSaved ? <Check className="w-4 h-4 text-emerald-300" /> : <Shield className="w-4 h-4" />}
            <span>{credsSaved ? 'Credentials Saved!' : 'Update Admin Credentials'}</span>
          </button>
        </form>
      </div>

      {/* 2. Secret Key Configuration */}
      <div className="glass-card rounded-2xl p-6 border border-neutral-800 space-y-4">
        <h4 className="text-sm font-semibold text-white flex items-center gap-2">
          <Key className="w-4 h-4 text-purple-400" />
          <span>2. Secret Access URL Key</span>
        </h4>

        <p className="text-xs text-neutral-400">
          The key used in the URL parameter to open the hidden admin overlay (<code className="text-purple-300 font-mono">/?admin=SECRET_KEY</code>).
        </p>

        <form onSubmit={handleSaveSecretKey} className="flex gap-3 max-w-md">
          <input
            type="text"
            required
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-purple-500 font-mono"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
          >
            {secretSaved ? <Check className="w-4 h-4 text-emerald-300" /> : <Key className="w-4 h-4" />}
            <span>{secretSaved ? 'Saved!' : 'Update Key'}</span>
          </button>
        </form>
      </div>

      {/* 3 & 4. Backup Export & Import JSON */}
      <div className="glass-card rounded-2xl p-6 border border-neutral-800 space-y-4">
        <h4 className="text-sm font-semibold text-white flex items-center gap-2">
          <Download className="w-4 h-4 text-purple-400" />
          <span>3 & 4. CMS Backup & Data Sync (Export / Import)</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-3">
            <span className="text-xs font-mono text-purple-300 font-semibold block">Export Backup JSON</span>
            <p className="text-xs text-neutral-400">
              Download your entire portfolio store (<code className="text-amber-300 font-mono">tanjim_final_data</code>) as a JSON file.
            </p>
            <button
              onClick={exportJSON}
              className="w-full py-2.5 rounded-xl text-xs font-semibold text-white bg-neutral-800 hover:bg-neutral-700 transition-colors flex items-center justify-center gap-2 cursor-pointer border border-neutral-700"
            >
              <Download className="w-4 h-4" />
              <span>Export Portfolio JSON</span>
            </button>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-3">
            <span className="text-xs font-mono text-purple-300 font-semibold block">Import Backup JSON</span>
            <p className="text-xs text-neutral-400">
              Upload a previously exported JSON backup to restore or sync content across browsers.
            </p>
            <label className="w-full py-2.5 rounded-xl text-xs font-semibold text-white bg-neutral-800 hover:bg-neutral-700 transition-colors flex items-center justify-center gap-2 cursor-pointer border border-neutral-700">
              <Upload className="w-4 h-4" />
              <span>Select JSON File to Import</span>
              <input
                type="file"
                accept=".json,application/json"
                onChange={handleFileImport}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* 5 & 6. Reset & Logout */}
      <div className="glass-card rounded-2xl p-6 border border-neutral-800 space-y-4">
        <h4 className="text-sm font-semibold text-white flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-400" />
          <span>5 & 6. Reset Data & Session Logout</span>
        </h4>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            onClick={handleResetToDefault}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-rose-300 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Store to Default Demo Data</span>
          </button>

          <button
            onClick={onLogout}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-neutral-300 bg-neutral-800 hover:bg-neutral-700 transition-colors flex items-center gap-2 cursor-pointer border border-neutral-700"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout of CMS Admin</span>
          </button>
        </div>
      </div>

    </div>
  );
}
