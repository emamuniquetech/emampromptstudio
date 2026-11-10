/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PromptProvider, usePrompts } from './context/PromptContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { VideoModal } from './components/VideoModal';
import { RewardedAdModal } from './components/RewardedAdModal';
import { MobileBottomNav } from './components/MobileBottomNav';

import { Home } from './pages/Home';
import { Features } from './pages/Features';
import { PhotoPrompts } from './pages/PhotoPrompts';
import { VideoPrompts } from './pages/VideoPrompts';
import { TrendingPrompts } from './pages/TrendingPrompts';
import { EditingPrompts } from './pages/EditingPrompts';
import { EffectsPrompts } from './pages/EffectsPrompts';
import { Categories } from './pages/Categories';
import { Favorites } from './pages/Favorites';
import { PromptDetailModal } from './components/PromptDetailModal';
import { SearchResults } from './pages/SearchResults';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Terms } from './pages/Terms';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';

const AppContent: React.FC = () => {
  const { currentView } = usePrompts();

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home />;
      case 'features':
        return <Features />;
      case 'photo':
        return <PhotoPrompts />;
      case 'video':
        return <VideoPrompts />;
      case 'trending':
        return <TrendingPrompts />;
      case 'editing':
        return <EditingPrompts />;
      case 'effects':
        return <EffectsPrompts />;
      case 'categories':
        return <Categories />;
      case 'favorites':
        return <Favorites />;
      case 'detail':
        return <PromptDetailModal />;
      case 'search':
        return <SearchResults />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'privacy':
        return <PrivacyPolicy />;
      case 'terms':
        return <Terms />;
      case 'admin-login':
        return <AdminLogin />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-[#070719] text-white flex flex-col font-sans selection:bg-[#9B75FF] selection:text-white">
      <Navbar />
      <main className="flex-1">
        {renderView()}
      </main>
      <Footer />
      <VideoModal />
      <RewardedAdModal />
      <MobileBottomNav />
    </div>
  );
};

export default function App() {
  return (
    <PromptProvider>
      <AppContent />
    </PromptProvider>
  );
}
