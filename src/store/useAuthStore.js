import { useState, useEffect } from 'react';

const AUTH_STORAGE_KEY = 'tanjim_admin_final_creds';
const SESSION_KEY = 'tanjim_admin_authenticated';
const AUTH_EVENT = 'tanjim_auth_update';

const DEFAULT_CREDS = {
  email: "sarkartanjimahmed2011@gmail.com",
  password: "@#porttanjimpro2011#@"
};

function getStoredCreds() {
  try {
    const item = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!item) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(DEFAULT_CREDS));
      return DEFAULT_CREDS;
    }
    return JSON.parse(item);
  } catch (error) {
    console.error('Failed to parse auth creds:', error);
    return DEFAULT_CREDS;
  }
}

function getStoredAuthSession() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === 'true';
  } catch {
    return false;
  }
}

export function useAuthStore() {
  const [creds, setCreds] = useState(getStoredCreds);
  const [isAuthenticated, setIsAuthenticated] = useState(getStoredAuthSession);

  useEffect(() => {
    const handleUpdate = () => {
      setCreds(getStoredCreds());
      setIsAuthenticated(getStoredAuthSession());
    };

    window.addEventListener('storage', handleUpdate);
    window.addEventListener(AUTH_EVENT, handleUpdate);

    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener(AUTH_EVENT, handleUpdate);
    };
  }, []);

  const login = (email, password) => {
    const currentCreds = getStoredCreds();
    if (
      email.trim().toLowerCase() === currentCreds.email.trim().toLowerCase() &&
      password.trim() === currentCreds.password.trim()
    ) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setIsAuthenticated(true);
      window.dispatchEvent(new Event(AUTH_EVENT));
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password.' };
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
    window.dispatchEvent(new Event(AUTH_EVENT));
  };

  const updateCreds = (newCreds) => {
    try {
      const updated = {
        email: newCreds.email || creds.email,
        password: newCreds.password || creds.password
      };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));
      setCreds(updated);
      window.dispatchEvent(new Event(AUTH_EVENT));
      return { success: true };
    } catch (err) {
      console.error('Failed to update credentials:', err);
      return { success: false, error: err.message };
    }
  };

  return {
    creds,
    isAuthenticated,
    login,
    logout,
    updateCreds
  };
}
