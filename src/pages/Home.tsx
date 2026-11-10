import React, { useState } from 'react';
import { usePrompts } from '../context/PromptContext';
import { PromptCard } from '../components/PromptCard';
import { InstallPwaBanner } from '../components/InstallPwaBanner';
import { 
  Sparkles, Search, ArrowRight, Flame, Film, Image as ImageIcon, Wand2, Play, Star, Heart, Grid, Download, Shield, Zap, Smartphone, CheckCircle2, Cloud, TrendingUp 
} from 'lucide-react';

export const Home: React.FC = () => {
  const { prompts, setCurrentView, openVideoDemo, requestCopyPrompt } = usePrompts();
  const [heroSearch, setHeroSearch] = useState('');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      setCurrentView('search', heroSearch.trim());
    }
  };

  const trendingCategories = [
    { id: 'viral', label: 'Viral Video', icon: '👑', count: '45+ Prompts' },
    { id: 'fantasy', label: 'Fantasy', icon: '✨', count: '38+ Prompts' },
    { id: 'horror', label: 'Horror', icon: '👻', count: '22+ Prompts' },
    { id: 'couple', label: 'Couple', icon: '❤️', count: '24+ Prompts' },
    { id: 'gaming', label: 'Gaming', icon: '🎮', count: '31+ Prompts' },
    { id: 'art', label: 'Art & Design', icon: '🎨', count: '40+ Prompts' },
  ];

  const featuredPrompts = prompts.filter(p => p.isFeatured && p.isPublished).slice(0, 4);
  const videoPromptsWithDemos = prompts.filter(p => p.videoUrl && p.isPublished).slice(0, 4);

  const masterPromptText = "Build a complete AI Prompt website and Android app named 'Emam Prompt Studio' with a premium dark theme like the reference image. Include AI Photo & AI Video sections, real video demo player, copy prompt with rewarded ads, trending categories, search, and a secure admin panel. Use modern UI, PWA support, cloud storage for videos/images, and keep data safe. Make it fully responsive and SEO optimized.";

  return (
    <div className="space-y-16 pb-24">
      
      {/* Install Banner */}
      <InstallPwaBanner />

      {/* Hero Section matching reference desktop design */}
      <section className="relative overflow-hidden pt-8 pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-[#9B75FF]/20 via-transparent to-[#4DDCF5]/20 rounded-3xl blur-3xl pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 bg-[#151525] border border-[#9B75FF]/40 px-4 py-1.5 rounded-full text-xs font-bold text-[#4DDCF5] shadow-lg">
              <Sparkles className="w-4 h-4 text-[#9B75FF]" /> AI CREATIVE PLATFORM
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              Create. Imagine. <span className="bg-gradient-to-r from-[#9B75FF] to-[#4DDCF5] bg-clip-text text-transparent">Go Viral.</span>
            </h1>

            <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Discover the best AI Photo & Video Prompts with stunning previews, playable demos, and copy-paste prompts optimized for Midjourney, Runway, Kling, and CapCut.
            </p>

            {/* Hero Search Bar */}
            <form onSubmit={handleHeroSearch} className="flex items-center max-w-lg mx-auto lg:mx-0 bg-[#151525] border border-[#242438] rounded-2xl p-2.5 shadow-2xl focus-within:border-[#9B75FF] transition-all">
              <Search className="w-5 h-5 text-gray-400 ml-3" />
              <input
                type="text"
                placeholder="Search any prompt..."
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                className="w-full bg-transparent border-none px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-[#9B75FF] to-[#4DDCF5] text-[#0D0D18] px-6 py-3 rounded-xl font-extrabold text-xs shadow-lg hover:opacity-90 transition-all whitespace-nowrap cursor-pointer"
              >
                Search
              </button>
            </form>

            {/* Stats Bar */}
            <div className="grid grid-cols-4 gap-4 pt-6 border-t border-[#242438] max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
              <div>
                <span className="block text-lg sm:text-2xl font-black text-white flex items-center justify-center lg:justify-start gap-1">
                  <Zap className="w-4 h-4 text-amber-400 fill-amber-400" /> 10K+
                </span>
                <span className="text-[11px] text-gray-400 font-medium">Prompts</span>
              </div>
              <div>
                <span className="block text-lg sm:text-2xl font-black text-white flex items-center justify-center lg:justify-start gap-1">
                  <Film className="w-4 h-4 text-[#4DDCF5]" /> 5K+
                </span>
                <span className="text-[11px] text-gray-400 font-medium">Videos</span>
              </div>
              <div>
                <span className="block text-lg sm:text-2xl font-black text-white flex items-center justify-center lg:justify-start gap-1">
                  <UsersIcon className="w-4 h-4 text-[#9B75FF]" /> 1M+
                </span>
                <span className="text-[11px] text-gray-400 font-medium">Creators</span>
              </div>
              <div>
                <span className="block text-lg sm:text-2xl font-black text-white flex items-center justify-center lg:justify-start gap-1">
                  4.9 <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                </span>
                <span className="text-[11px] text-gray-400 font-medium">Rating</span>
              </div>
            </div>

          </div>

          {/* Right Hero Cyberpunk AI Creator Image */}
          <div className="lg:col-span-5 relative">
            <div className="bg-[#151525] border-2 border-[#9B75FF]/40 rounded-3xl p-3 shadow-2xl relative overflow-hidden group">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop" 
                  alt="Cyberpunk AI Creator" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D18] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div>
                    <span className="text-[10px] text-[#4DDCF5] uppercase tracking-wider font-extrabold">Featured AI Studio</span>
                    <h3 className="text-sm font-bold">Neon Cyberpunk Headset Creator</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main AI Photo & Video Category Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div 
            onClick={() => setCurrentView('photo')}
            className="bg-gradient-to-br from-[#9B75FF]/30 via-[#151525] to-[#151525] border-2 border-[#9B75FF]/50 rounded-3xl p-8 cursor-pointer hover:border-[#9B75FF] transition-all group shadow-xl flex items-center justify-between"
          >
            <div className="space-y-3">
              <div className="w-14 h-14 bg-[#9B75FF]/20 rounded-2xl flex items-center justify-center text-[#9B75FF] border border-[#9B75FF]/40">
                <ImageIcon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-extrabold text-white group-hover:text-[#4DDCF5] transition-colors">AI Photo Prompts</h3>
              <p className="text-xs text-gray-300">Portrait, Fashion, Couple, Editing, Traditional Jamdani & Cinematic Lighting.</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#0D0D18] border border-[#242438] flex items-center justify-center text-white group-hover:translate-x-1.5 transition-transform">
              <ArrowRight className="w-6 h-6 text-[#4DDCF5]" />
            </div>
          </div>

          <div 
            onClick={() => setCurrentView('video')}
            className="bg-gradient-to-br from-[#4DDCF5]/30 via-[#151525] to-[#151525] border-2 border-[#4DDCF5]/50 rounded-3xl p-8 cursor-pointer hover:border-[#4DDCF5] transition-all group shadow-xl flex items-center justify-between"
          >
            <div className="space-y-3">
              <div className="w-14 h-14 bg-[#4DDCF5]/20 rounded-2xl flex items-center justify-center text-[#4DDCF5] border border-[#4DDCF5]/40">
                <Film className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-extrabold text-white group-hover:text-[#4DDCF5] transition-colors">AI Video Prompts</h3>
              <p className="text-xs text-gray-300">Text-to-Video, Image-to-Video, Runway Gen-3, Kling AI & Cinematic Motion.</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#0D0D18] border border-[#242438] flex items-center justify-center text-white group-hover:translate-x-1.5 transition-transform">
              <ArrowRight className="w-6 h-6 text-[#9B75FF]" />
            </div>
          </div>

        </div>
      </section>

      {/* Trending Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h2 className="text-xl font-bold text-white">Trending Categories</h2>
          </div>
          <button 
            onClick={() => setCurrentView('categories')}
            className="text-xs text-[#4DDCF5] font-semibold hover:underline flex items-center gap-1"
          >
            View All <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {trendingCategories.map(cat => (
            <div
              key={cat.id}
              onClick={() => setCurrentView('search', cat.label)}
              className="bg-[#151525] border border-[#242438] hover:border-[#9B75FF]/60 rounded-2xl p-5 text-center cursor-pointer transition-all group shadow-md"
            >
              <span className="text-3xl mb-2.5 block group-hover:scale-110 transition-transform">{cat.icon}</span>
              <h4 className="text-xs font-bold text-white mb-1 group-hover:text-[#4DDCF5] transition-colors">{cat.label}</h4>
              <span className="text-[10px] text-gray-400 font-medium">{cat.count}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Video Prompts Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-[#4DDCF5]" />
            <h2 className="text-xl font-bold text-white">Trending Video Prompts</h2>
          </div>
          <button 
            onClick={() => setCurrentView('trending')}
            className="text-xs text-[#4DDCF5] font-semibold hover:underline flex items-center gap-1"
          >
            View All <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPrompts.map(prompt => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      </section>

      {/* Bottom Feature Badges Row (matching the 5 blue/purple glowing cards in reference image) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          
          <div className="bg-gradient-to-br from-[#151525] to-[#1c1233] border border-[#9B75FF]/40 rounded-2xl p-5 text-center space-y-2 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-[#9B75FF]/20 text-[#9B75FF] flex items-center justify-center mx-auto border border-[#9B75FF]/40">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-white">Super Fast Loading</h4>
            <span className="text-[10px] text-gray-400 block">Optimized PWA architecture</span>
          </div>

          <div className="bg-gradient-to-br from-[#151525] to-[#122433] border border-[#4DDCF5]/40 rounded-2xl p-5 text-center space-y-2 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-[#4DDCF5]/20 text-[#4DDCF5] flex items-center justify-center mx-auto border border-[#4DDCF5]/40">
              <Smartphone className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-white">PWA App Install</h4>
            <span className="text-[10px] text-gray-400 block">Android & iOS ready</span>
          </div>

          <div className="bg-gradient-to-br from-[#151525] to-[#123322] border border-emerald-500/40 rounded-2xl p-5 text-center space-y-2 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-white">Secure & Reliable</h4>
            <span className="text-[10px] text-gray-400 block">Encrypted data storage</span>
          </div>

          <div className="bg-gradient-to-br from-[#151525] to-[#122233] border border-[#4DDCF5]/40 rounded-2xl p-5 text-center space-y-2 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-[#4DDCF5]/20 text-[#4DDCF5] flex items-center justify-center mx-auto border border-[#4DDCF5]/40">
              <Cloud className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-white">Free Hosting</h4>
            <span className="text-[10px] text-gray-400 block">Netlify & Vercel compatible</span>
          </div>

          <div className="bg-gradient-to-br from-[#151525] to-[#332212] border border-amber-500/40 rounded-2xl p-5 text-center space-y-2 shadow-lg col-span-2 sm:col-span-1">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/40">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-white">Earn with Ads</h4>
            <span className="text-[10px] text-gray-400 block">Rewarded ad monetization</span>
          </div>

        </div>
      </section>

      {/* Master Prompt (Copy & Use in AI Builder) Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#151525] via-[#1c1233] to-[#151525] border-2 border-[#9B75FF]/60 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#9B75FF] to-[#4DDCF5] rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-[#9B75FF]/30">
              <Sparkles className="w-6 h-6 text-[#0D0D18]" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-extrabold text-white">Master Prompt (Use This in AI Builder)</h3>
              <p className="text-xs text-gray-300 font-mono leading-relaxed line-clamp-2">
                &ldquo;{masterPromptText}&rdquo;
              </p>
            </div>
          </div>
          <button
            onClick={() => requestCopyPrompt(masterPromptText)}
            className="bg-gradient-to-r from-[#9B75FF] to-[#4DDCF5] text-[#0D0D18] hover:opacity-95 px-6 py-3.5 rounded-2xl font-extrabold text-xs shadow-lg shadow-[#4DDCF5]/20 flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" /> Copy Prompt
          </button>
        </div>
      </section>

    </div>
  );
};

function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
