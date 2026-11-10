import React from 'react';
import { usePrompts } from '../context/PromptContext';
import { PromptCard } from '../components/PromptCard';
import { Flame } from 'lucide-react';

export const TrendingPrompts: React.FC = () => {
  const { prompts } = usePrompts();
  const trending = prompts.filter(p => p.isTrending && p.isPublished);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="bg-[#151525] border border-[#242438] p-8 rounded-3xl flex items-center justify-between">
        <div className="space-y-2">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <Flame className="w-4 h-4 fill-amber-400 text-amber-400" /> Viral Creative Ideas
          </span>
          <h1 className="text-3xl font-black text-white">Trending Creative Prompts</h1>
          <p className="text-xs text-gray-400 max-w-xl">
            Most popular prompts and viral editing workflows currently dominating social media feeds.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {trending.map(prompt => (
          <PromptCard key={prompt.id} prompt={prompt} />
        ))}
      </div>

    </div>
  );
};
