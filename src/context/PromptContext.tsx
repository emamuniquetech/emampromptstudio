import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PromptItem, AdSettings } from '../types';
import { STARTER_PROMPTS } from '../data/starterPrompts';

// Google Publisher Tag (GPT) types
declare global {
  interface Window {
    googletag: any;
  }
}

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
  adStatus: 'idle' | 'requesting' | 'ready' | 'playing' | 'granted' | 'error' | 'not-available';
  adCountdown: number;
  
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
  playRewardedAd: () => void;
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
    return saved ? JSON.parse(saved) : { 
      enabled: true, 
      provider: 'Google Ad Manager', 
      rewardDurationSeconds: 5,
      adManagerNetworkId: '',
      adManagerAdUnitPath: '/21775744923/example/rewarded',
      testMode: true,
      disabledCategories: []
    };
  });

  const [rewardedAdModalOpen, setRewardedAdModalOpen] = useState(false);
  const [pendingCopyPrompt, setPendingCopyPrompt] = useState<string | null>(null);
  const [adStatus, setAdStatus] = useState<'idle' | 'requesting' | 'ready' | 'playing' | 'granted' | 'error' | 'not-available'>('idle');
  const [adCountdown, setAdCountdown] = useState<number>(5);
  const timerRef = React.useRef<any>(null);
  const requestTimeoutRef = React.useRef<any>(null);
  const gptRewardEventRef = React.useRef<any>(null);

  const clearAdTimers = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (requestTimeoutRef.current) {
      clearTimeout(requestTimeoutRef.current);
      requestTimeoutRef.current = null;
    }
  };

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

  // Rewarded Ad Management via GPT or Instant Simulation
  const requestRewardedAd = useCallback(() => {
    clearAdTimers();

    // 1. If Test Mode is enabled (or while waiting for AdSense review to finish):
    if (adSettings.testMode) {
      setAdStatus('requesting');
      // Realistic brief preparation then ready
      requestTimeoutRef.current = setTimeout(() => {
        setAdStatus('ready');
      }, 700);
      return;
    }

    // 2. Live Google Ad Manager via GPT
    if (!window.googletag) {
      setAdStatus('not-available');
      return;
    }

    setAdStatus('requesting');
    const { googletag } = window;

    // Safety timeout: If Google doesn't return an ad within 4.5 seconds (e.g. ad unit pending or no inventory):
    requestTimeoutRef.current = setTimeout(() => {
      console.warn('Ad request timed out from Google ad network (account may be under review)');
      setAdStatus('not-available');
    }, 4500);

    googletag.cmd.push(() => {
      try {
        googletag.destroySlots();

        const rewardedSlot = googletag.defineOutOfPageSlot(
          adSettings.adManagerAdUnitPath,
          googletag.enums.OutOfPageFormat.REWARDED
        );

        if (rewardedSlot) {
          rewardedSlot.addService(googletag.pubads());
          
          googletag.pubads().addEventListener('rewardedSlotReady', (event: any) => {
            clearTimeout(requestTimeoutRef.current);
            gptRewardEventRef.current = event;
            setAdStatus('ready');
          });

          googletag.pubads().addEventListener('rewardedSlotGranted', (event: any) => {
            clearTimeout(requestTimeoutRef.current);
            setAdStatus('granted');
            if (pendingCopyPrompt) {
              navigator.clipboard.writeText(pendingCopyPrompt);
            }
          });

          googletag.pubads().addEventListener('rewardedSlotClosed', (event: any) => {
            clearTimeout(requestTimeoutRef.current);
            setAdStatus(prev => prev === 'granted' ? 'granted' : 'idle');
          });

          googletag.enableServices();
          googletag.display(rewardedSlot);
        } else {
          clearTimeout(requestTimeoutRef.current);
          setAdStatus('not-available');
        }
      } catch (err) {
        console.error('GPT error', err);
        clearTimeout(requestTimeoutRef.current);
        setAdStatus('not-available');
      }
    });
  }, [adSettings.testMode, adSettings.adManagerAdUnitPath, pendingCopyPrompt]);

  const playRewardedAd = () => {
    clearAdTimers();

    // In Test Mode or when GPT event is simulated/not available:
    if (adSettings.testMode || !gptRewardEventRef.current) {
      setAdStatus('playing');
      const duration = adSettings.rewardDurationSeconds || 5;
      setAdCountdown(duration);

      let current = duration;
      timerRef.current = setInterval(() => {
        current -= 1;
        setAdCountdown(current);
        if (current <= 0) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          setAdStatus('granted');
          if (pendingCopyPrompt) {
            navigator.clipboard.writeText(pendingCopyPrompt);
          }
        }
      }, 1000);
      return;
    }

    // Live Google Publisher Tag rewarded ad
    if (gptRewardEventRef.current && typeof gptRewardEventRef.current.makeRewardedVisible === 'function') {
      setAdStatus('playing');
      gptRewardEventRef.current.makeRewardedVisible();
    } else if (window.googletag) {
      setAdStatus('playing');
      window.googletag.pubads().getSlots().forEach((slot: any) => {
        if (slot.getOutOfPageVariant() === window.googletag.enums.OutOfPageFormat.REWARDED) {
          window.googletag.pubads().refresh([slot]);
        }
      });
    }
  };

  const requestCopyPrompt = (promptText: string) => {
    setPendingCopyPrompt(promptText);
    if (adSettings.enabled) {
      setRewardedAdModalOpen(true);
      setAdStatus('idle');
      requestRewardedAd();
    } else {
      if (promptText) {
        navigator.clipboard.writeText(promptText);
      }
    }
  };

  const executeCopy = () => {
    clearAdTimers();
    if (pendingCopyPrompt) {
      navigator.clipboard.writeText(pendingCopyPrompt);
    }
    setRewardedAdModalOpen(false);
    setPendingCopyPrompt(null);
    setAdStatus('idle');
  };

  const closeRewardedAdModal = () => {
    clearAdTimers();
    setRewardedAdModalOpen(false);
    setPendingCopyPrompt(null);
    setAdStatus('idle');
    if (window.googletag) {
      window.googletag.cmd.push(() => {
        window.googletag.destroySlots();
      });
    }
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
      adStatus,
      adCountdown,
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
      playRewardedAd,
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
