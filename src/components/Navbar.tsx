import React, { useState } from 'react';
import { usePrompts } from '../context/PromptContext';
import { 
  Sparkles, Home, Image, Video, Flame, Wand2, Grid, Heart, Shield, Menu, X, Search, LogOut, Download 
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentView, setCurrentView, favorites, isAdminLoggedIn, adminLogout } = usePrompts();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'features', label: 'Features', icon: Sparkles },
    { id: 'download', label: 'Download App', icon: Download },
    { id: 'photo', label: 'AI Photo', icon: Image },
    { id: 'video', label: 'AI Video', icon: Video },
    { id: 'trending', label: 'Trending', icon: Flame },
    { id: 'editing', label: 'Video Editing', icon: Wand2 },
    { id: 'effects', label: 'AI Effects', icon: Sparkles },
    { id: 'categories', label: 'Categories', icon: Grid },
    { id: 'favorites', label: `Favorites (${favorites.length})`, icon: Heart },
    { id: 'about', label: 'About', icon: null },
    { id: 'contact', label: 'Contact', icon: null },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentView('search', searchQuery.trim());
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0D0D18]/90 backdrop-blur-md border-b border-[#242438]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setCurrentView('home')} 
          className="flex items-center gap-3 cursor-group shrink-0 whitespace-nowrap"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#9B75FF] to-[#4DDCF5] p-0.5 shadow-lg shadow-[#9B75FF]/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#151525] rounded-[10px] flex items-center justify-center">
              <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-[#9B75FF] to-[#4DDCF5] bg-clip-text text-transparent">E</span>
            </div>
          </div>
          <div>
            <span className="text-base sm:text-xl font-bold tracking-tight text-white block">
              Emam <span className="bg-gradient-to-r from-[#9B75FF] to-[#4DDCF5] bg-clip-text text-transparent">Prompt Studio</span>
            </span>
            <span className="text-[10px] sm:text-xs text-gray-400 font-medium tracking-wide block">Create. Imagine. Go Viral.</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navItems.slice(0, 8).map(item => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-[#9B75FF]/20 text-[#4DDCF5] border border-[#9B75FF]/40 shadow-sm' 
                    : 'text-gray-300 hover:text-white hover:bg-[#151525]'
                }`}
              >
                {Icon && <Icon className={`w-4 h-4 ${isActive ? 'text-[#4DDCF5]' : 'text-gray-400'}`} />}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Search & Admin Button */}
        <div className="hidden md:flex items-center gap-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48 lg:w-60 bg-[#151525] border border-[#242438] rounded-full px-4 py-2 pl-9 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#9B75FF] transition-all"
            />
            <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-2.5" />
          </form>

          {isAdminLoggedIn ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentView('admin-dashboard')}
                className="bg-gradient-to-r from-[#9B75FF] to-[#8050ff] text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-md shadow-[#9B75FF]/20 hover:opacity-90 transition-all flex items-center gap-2"
              >
                <Shield className="w-3.5 h-3.5" /> Dashboard
              </button>
              <button
                onClick={adminLogout}
                title="Logout"
                className="p-2 bg-[#151525] border border-[#242438] text-gray-400 hover:text-red-400 rounded-xl transition-all"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setCurrentView('admin-login')}
              className="bg-gradient-to-r from-[#9B75FF] to-[#4DDCF5] text-[#0D0D18] px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-[#4DDCF5]/20 hover:opacity-90 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" /> Admin
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-2">
          {isAdminLoggedIn ? (
            <button
              onClick={() => setCurrentView('admin-dashboard')}
              className="p-2 bg-[#9B75FF]/20 text-[#4DDCF5] rounded-xl border border-[#9B75FF]/40"
            >
              <Shield className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => setCurrentView('admin-login')}
              className="p-2 bg-[#151525] text-gray-300 rounded-xl border border-[#242438]"
            >
              <Sparkles className="w-5 h-5" />
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 bg-[#151525] text-gray-300 rounded-xl border border-[#242438]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#151525] border-b border-[#242438] px-4 py-5 space-y-2">
          <form onSubmit={handleSearchSubmit} className="relative mb-4">
            <input
              type="text"
              placeholder="Search prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0D0D18] border border-[#242438] rounded-xl px-4 py-2.5 pl-10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#9B75FF]"
            />
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
          </form>

          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-[#9B75FF]/20 text-[#4DDCF5] border border-[#9B75FF]/40' 
                    : 'text-gray-300 hover:bg-[#0D0D18]'
                }`}
              >
                {Icon && <Icon className={`w-5 h-5 ${isActive ? 'text-[#4DDCF5]' : 'text-gray-400'}`} />}
                {item.label}
              </button>
            );
          })}

          {isAdminLoggedIn && (
            <button
              onClick={() => {
                adminLogout();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-[#0D0D18]"
            >
              <LogOut className="w-5 h-5" /> Admin Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
};
