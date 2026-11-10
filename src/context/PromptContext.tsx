import React, { createContext, useContext, useState, useEffect } from 'react';
import { PromptItem, AdSettings } from '../types';
import { STARTER_PROMPTS } from '../data/starterPrompts';

interface PromptContextType {
  prompts: PromptItem[];
  favorites: string[];
  isAdminLoggedIn: boolean;
  currentView: string;
  selectedPromptId: string | null;
  selectedVideoUrl: string | null;
  selectedVideoMeta: { title: string; tool: string; description: string } | null;
  adSettings: AdSettings;
  rewardedAdModalOpen: boolean;
  pendingCopyPrompt: string | null;
  
  setCurrentView: (view: string, promptId?: string | null) => void;
  openVideoDemo: (url: string, title: string, tool: string, description: string) => void;
  closeVideoDemo: () => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  
  adminLogin: (pass: string) => boolean;
  adminLogout: () => void;
  
  addPrompt: (prompt: Omit<PromptItem, 'id' | 'createdAt'>) => void;
  updatePrompt: (id: string, prompt: Partial<PromptItem>) => void;
  deletePrompt: (id: string) => void;
  togglePublish: (id: string) => void;
  toggleTrending: (id: string) => void;
  toggleFeatured: (id: string) => void;
  
  updateAdSettings: (settings: AdSettings) => void;
  requestCopyPrompt: (promptText: string) => void;
  executeCopy: () => void;
  closeRewardedAdModal: () => void;
  
  exportDatabase: () => void;
  importDatabase: (jsonData: string) => boolean;
  resetToDefault: () => void;
}

const PromptContext = createContext<PromptContextType | undefined>(undefined);

export const PromptProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [prompts, setPrompts] = useState<PromptItem[]>(() => {
    const saved = localStorage.getItem('emam_prompts_db');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved prompts', e);
      }
    }
    return STARTER_PROMPTS;
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('emam_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('emam_admin_auth') === 'true';
  });

  const [currentView, setCurrentViewState] = useState<string>('home');
  const [selectedPromptId, setSelectedPromptId] = useState<string | null>(null);
  
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);
  const [selectedVideoMeta, setSelectedVideoMeta] = useState<{ title: string; tool: string; description: string } | null>(null);

  const [adSettings, setAdSettings] = useState<AdSettings>(() => {
    const saved = localStorage.getItem('emam_ad_settings');
    return saved ? JSON.parse(saved) : { enabled: true, provider: 'Google AdSense / Rewarded', rewardDurationSeconds: 5 };
  });

  const [rewardedAdModalOpen, setRewardedAdModalOpen] = useState(false);
  const [pendingCopyPrompt, setPendingCopyPrompt] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('emam_prompts_db', JSON.stringify(prompts));
  }, [prompts]);

  useEffect(() => {
    localStorage.setItem('emam_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('emam_ad_settings', JSON.stringify(adSettings));
  }, [adSettings]);

  const setCurrentView = (view: string, promptId: string | null = null) => {
    setCurrentViewState(view);
    setSelectedPromptId(promptId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openVideoDemo = (url: string, title: string, tool: string, description: string) => {
    setSelectedVideoUrl(url);
    setSelectedVideoMeta({ title, tool, description });
  };

  const closeVideoDemo = () => {
    setSelectedVideoUrl(null);
    setSelectedVideoMeta(null);
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const adminLogin = (pass: string) => {
    if (pass === 'admin123' || pass === 'emam2026') {
      setIsAdminLoggedIn(true);
      localStorage.setItem('emam_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('emam_admin_auth');
    setCurrentView('home');
  };

  const addPrompt = (newPromptData: Omit<PromptItem, 'id' | 'createdAt'>) => {
    const newPrompt: PromptItem = {
      ...newPromptData,
      id: `custom-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setPrompts(prev => [newPrompt, ...prev]);
  };

  const updatePrompt = (id: string, updatedData: Partial<PromptItem>) => {
    setPrompts(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
  };

  const deletePrompt = (id: string) => {
    setPrompts(prev => prev.filter(p => p.id !== id));
  };

  const togglePublish = (id: string) => {
    setPrompts(prev => prev.map(p => p.id === id ? { ...p, isPublished: !p.isPublished } : p));
  };

  const toggleTrending = (id: string) => {
    setPrompts(prev => prev.map(p => p.id === id ? { ...p, isTrending: !p.isTrending } : p));
  };

  const toggleFeatured = (id: string) => {
    setPrompts(prev => prev.map(p => p.id === id ? { ...p, isFeatured: !p.isFeatured } : p));
  };

  const updateAdSettings = (settings: AdSettings) => {
    setAdSettings(settings);
  };

  const requestCopyPrompt = (promptText: string) => {
    setPendingCopyPrompt(promptText);
    if (adSettings.enabled) {
      setRewardedAdModalOpen(true);
    } else {
      executeCopy();
    }
  };

  const executeCopy = () => {
    if (pendingCopyPrompt) {
      navigator.clipboard.writeText(pendingCopyPrompt);
    }
    setRewardedAdModalOpen(false);
    setPendingCopyPrompt(null);
  };

  const closeRewardedAdModal = () => {
    setRewardedAdModalOpen(false);
    setPendingCopyPrompt(null);
  };

  const exportDatabase = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(prompts, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `emam_prompt_studio_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importDatabase = (jsonData: string) => {
    try {
      const parsed = JSON.parse(jsonData);
      if (Array.isArray(parsed)) {
        setPrompts(parsed);
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON backup', e);
    }
    return false;
  };

  const resetToDefault = () => {
    setPrompts(STARTER_PROMPTS);
    localStorage.removeItem('emam_prompts_db');
  };

  return (
    <PromptContext.Provider value={{
      prompts,
      favorites,
      isAdminLoggedIn,
      currentView,
      selectedPromptId,
      selectedVideoUrl,
      selectedVideoMeta,
      adSettings,
      rewardedAdModalOpen,
      pendingCopyPrompt,
      setCurrentView,
      openVideoDemo,
      closeVideoDemo,
      toggleFavorite,
      isFavorite,
      adminLogin,
      adminLogout,
      addPrompt,
      updatePrompt,
      deletePrompt,
      togglePublish,
      toggleTrending,
      toggleFeatured,
      updateAdSettings,
      requestCopyPrompt,
      executeCopy,
      closeRewardedAdModal,
      exportDatabase,
      importDatabase,
      resetToDefault,
    }}>
      {children}
    </PromptContext.Provider>
  );
};

export const usePrompts = () => {
  const context = useContext(PromptContext);
  if (!context) {
    throw new Error('usePrompts must be used within a PromptProvider');
  }
  return context;
};
