import React from 'react';
import { usePrompts } from '../context/PromptContext';
import { PromptCard } from '../components/PromptCard';
import { Heart } from 'lucide-react';

export const Favorites: React.FC = () => {
  const { prompts, favorites, setCurrentView } = usePrompts();
  const favoritePrompts = prompts.filter(p => favorites.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="bg-[#151525] border border-[#242438] p-8 rounded-3xl flex items-center justify-between">
        <div className="space-y-2">
          <span className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
            <Heart className="w-4 h-4 fill-red-400" /> Saved Collections
          </span>
          <h1 className="text-3xl font-black text-white">Your Saved Favorites</h1>
          <p className="text-xs text-gray-400 max-w-xl">
            Quick access to all your favorite AI photo, video, and editing prompts saved across sessions.
          </p>
        </div>
      </div>

      {favoritePrompts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favoritePrompts.map(prompt => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-[#151525] border border-[#242438] rounded-3xl space-y-4">
          <div className="w-16 h-16 bg-[#0D0D18] rounded-2xl flex items-center justify-center mx-auto text-gray-600">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">No favorites saved yet</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            Click the heart icon on any prompt card to save it here for instant access.
          </p>
          <button
            onClick={() => setCurrentView('home')}
            className="mt-2 px-6 py-2.5 bg-[#9B75FF] text-white text-xs font-bold rounded-xl shadow-lg shadow-[#9B75FF]/30"
          >
            Explore Prompts
          </button>
        </div>
      )}

    </div>
  );
};
