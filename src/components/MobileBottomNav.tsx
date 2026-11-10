import React from 'react';
import { usePrompts } from '../context/PromptContext';
import { Home, Grid, Heart, Flame, MoreHorizontal } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { currentView, setCurrentView, favorites } = usePrompts();

  const navs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'categories', label: 'Categories', icon: Grid },
    { id: 'favorites', label: `Favorites (${favorites.length})`, icon: Heart },
    { id: 'trending', label: 'Trending', icon: Flame },
    { id: 'about', label: 'More', icon: MoreHorizontal },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0D0D18]/95 backdrop-blur-lg border-t border-[#242438] px-2 py-2 flex items-center justify-around shadow-2xl">
      {navs.map(item => {
        const Icon = item.icon;
        const isActive = currentView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
              isActive ? 'text-[#4DDCF5]' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
