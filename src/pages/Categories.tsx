import React from 'react';
import { usePrompts } from '../context/PromptContext';
import { Grid, ArrowRight } from 'lucide-react';

export const Categories: React.FC = () => {
  const { prompts, setCurrentView } = usePrompts();

  const categoryList = Array.from(new Set(prompts.map(p => p.category))).map(cat => {
    const count = prompts.filter(p => p.category === cat).length;
    const sample = prompts.find(p => p.category === cat);
    return { name: cat, count, image: sample?.previewImage || '' };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="bg-[#151525] border border-[#242438] p-8 rounded-3xl flex items-center justify-between">
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#4DDCF5] uppercase tracking-wider flex items-center gap-1.5">
            <Grid className="w-4 h-4" /> Studio Categories
          </span>
          <h1 className="text-3xl font-black text-white">Explore All Categories</h1>
          <p className="text-xs text-gray-400 max-w-xl">
            Browse through specialized AI prompt categories for photos, videos, and viral editing.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryList.map(cat => (
          <div
            key={cat.name}
            onClick={() => setCurrentView('search', cat.name)}
            className="bg-[#151525] border border-[#242438] hover:border-[#9B75FF] rounded-3xl overflow-hidden cursor-pointer transition-all group shadow-xl flex flex-col justify-between"
          >
            <div className="aspect-video relative overflow-hidden bg-[#0D0D18]">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#151525] via-transparent to-transparent" />
            </div>
            <div className="p-6 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white group-hover:text-[#4DDCF5] transition-colors">{cat.name}</h3>
                <span className="text-xs text-gray-400 font-mono bg-[#0D0D18] px-2.5 py-1 rounded-full border border-[#242438]">{cat.count} prompts</span>
              </div>
              <div className="pt-2 flex items-center gap-1 text-xs text-[#9B75FF] font-semibold">
                Explore Category <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
