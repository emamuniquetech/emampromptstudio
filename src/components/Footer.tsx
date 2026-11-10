import React from 'react';
import { usePrompts } from '../context/PromptContext';
import { Sparkles, Heart, Youtube, Facebook, Twitter, Instagram, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView } = usePrompts();

  return (
    <footer className="bg-[#0D0D18] border-t border-[#242438] pt-16 pb-24 lg:pb-16 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#9B75FF] to-[#4DDCF5] p-0.5">
                <div className="w-full h-full bg-[#151525] rounded-[10px] flex items-center justify-center">
                  <span className="text-xl font-black bg-gradient-to-r from-[#9B75FF] to-[#4DDCF5] bg-clip-text text-transparent">E</span>
                </div>
              </div>
              <span className="text-lg font-bold text-white">Emam Prompt Studio</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Dream Bigger. Create Better. The ultimate production-ready platform for AI Photo, AI Video, and Viral Video Editing prompts.
            </p>
            <div className="flex items-center gap-3 text-gray-400">
              <a href="#youtube" className="p-2 bg-[#151525] rounded-xl hover:text-[#4DDCF5] hover:border-[#4DDCF5]/40 border border-[#242438] transition-all"><Youtube className="w-4 h-4" /></a>
              <a href="#facebook" className="p-2 bg-[#151525] rounded-xl hover:text-[#4DDCF5] hover:border-[#4DDCF5]/40 border border-[#242438] transition-all"><Facebook className="w-4 h-4" /></a>
              <a href="#twitter" className="p-2 bg-[#151525] rounded-xl hover:text-[#4DDCF5] hover:border-[#4DDCF5]/40 border border-[#242438] transition-all"><Twitter className="w-4 h-4" /></a>
              <a href="#instagram" className="p-2 bg-[#151525] rounded-xl hover:text-[#4DDCF5] hover:border-[#4DDCF5]/40 border border-[#242438] transition-all"><Instagram className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Explore Studio</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><button onClick={() => setCurrentView('photo')} className="hover:text-[#4DDCF5] transition-colors">AI Photo Prompts</button></li>
              <li><button onClick={() => setCurrentView('video')} className="hover:text-[#4DDCF5] transition-colors">AI Video Prompts</button></li>
              <li><button onClick={() => setCurrentView('trending')} className="hover:text-[#4DDCF5] transition-colors">Trending Prompts</button></li>
              <li><button onClick={() => setCurrentView('editing')} className="hover:text-[#4DDCF5] transition-colors">Viral Video Editing</button></li>
              <li><button onClick={() => setCurrentView('effects')} className="hover:text-[#4DDCF5] transition-colors">Creative Effects</button></li>
            </ul>
          </div>

          {/* Col 3: Legal & Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Legal & Info</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><button onClick={() => setCurrentView('about')} className="hover:text-[#4DDCF5] transition-colors">About Emam Studio</button></li>
              <li><button onClick={() => setCurrentView('contact')} className="hover:text-[#4DDCF5] transition-colors">Contact Support</button></li>
              <li><button onClick={() => setCurrentView('privacy')} className="hover:text-[#4DDCF5] transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => setCurrentView('terms')} className="hover:text-[#4DDCF5] transition-colors">Terms & Conditions</button></li>
              <li><button onClick={() => setCurrentView('admin-login')} className="hover:text-[#4DDCF5] transition-colors flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-[#9B75FF]" /> Admin Portal</button></li>
            </ul>
          </div>

          {/* Col 4: Platform Badge */}
          <div className="space-y-3 bg-[#151525] p-5 rounded-2xl border border-[#242438]">
            <div className="flex items-center gap-2 text-xs font-bold text-[#4DDCF5]">
              <Sparkles className="w-4 h-4" /> Production Ready PWA
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Fully optimized for Netlify hosting, persistent cloud database storage, and seamless offline PWA mobile installation.
            </p>
            <div className="text-[11px] text-gray-500 pt-2 border-t border-[#242438]">
              Netlify & Supabase Compatible
            </div>
          </div>

        </div>

        <div className="border-t border-[#242438] pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>&copy; {new Date().getFullYear()} Emam Prompt Studio. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for AI Creators & Video Editors
          </p>
        </div>
      </div>
    </footer>
  );
};
