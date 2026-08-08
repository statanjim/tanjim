import { useState, useEffect } from 'react';
import { defaultData } from '../data/defaultData';

const STORAGE_KEY = 'tanjim_final_data';
const LISTEN_EVENT = 'tanjim_portfolio_data_update';

function getStoredData() {
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    if (!item) return defaultData;
    const parsed = JSON.parse(item);
    // If stored avatar is the previous default female unsplash photo, update to new male default
    if (parsed?.about?.avatar && parsed.about.avatar.includes('photo-1534528741775-53994a69daeb')) {
      parsed.about.avatar = defaultData.about.avatar;
    }
    // Deep merge with defaultData to ensure new schema fields exist if missing
    return {
      ...defaultData,
      ...parsed,
      header: { ...defaultData.header, ...(parsed.header || {}) },
      hero: { ...defaultData.hero, ...(parsed.hero || {}) },
      about: { 
        ...defaultData.about, 
        ...(parsed.about || {}),
        avatar: (!parsed.about?.avatar || parsed.about.avatar.includes('photo-1534528741775-53994a69daeb')) 
          ? defaultData.about.avatar 
          : parsed.about.avatar 
      },
      footer: { ...defaultData.footer, ...(parsed.footer || {}) },
      appearance: { ...defaultData.appearance, ...(parsed.appearance || {}) },
      projects: parsed.projects || defaultData.projects,
      skills: parsed.skills || defaultData.skills,
      media: parsed.media || defaultData.media,
    };
  } catch (error) {
    console.error('Failed to parse portfolio store data:', error);
    return defaultData;
  }
}

export function usePortfolioStore() {
  const [data, setData] = useState(getStoredData);

  useEffect(() => {
    const handleUpdate = () => {
      setData(getStoredData());
    };

    window.addEventListener('storage', handleUpdate);
    window.addEventListener(LISTEN_EVENT, handleUpdate);

    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener(LISTEN_EVENT, handleUpdate);
    };
  }, []);

  const updateData = (updater) => {
    setData((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        window.dispatchEvent(new Event(LISTEN_EVENT));
      } catch (err) {
        console.error('Failed to save to localStorage:', err);
      }
      return next;
    });
  };

  const resetData = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
      setData(defaultData);
      window.dispatchEvent(new Event(LISTEN_EVENT));
    } catch (err) {
      console.error('Failed to reset localStorage data:', err);
    }
  };

  const exportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `tanjim_portfolio_data_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importJSON = (jsonData) => {
    try {
      const parsed = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
      updateData(parsed);
      return { success: true };
    } catch (err) {
      console.error('Invalid JSON file:', err);
      return { success: false, error: err.message };
    }
  };

  return {
    data,
    updateData,
    resetData,
    exportJSON,
    importJSON
  };
}
