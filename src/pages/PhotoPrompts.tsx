import React, { useState } from 'react';
import { usePrompts } from '../context/PromptContext';
import { PromptCard } from '../components/PromptCard';
import { Image as ImageIcon, Search, Filter } from 'lucide-react';

export const PhotoPrompts: React.FC = () => {
  const { prompts } = usePrompts();
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('All');
  const [search, setSearch] = useState('');

  const photoPrompts = prompts.filter(p => p.contentType === 'photo' && p.isPublished);

  const subCategories = ['All', 'Cinematic Portrait', 'Viral Couple Portrait', 'Professional Studio Portrait', 'Luxury Fashion Photography', 'Traditional Bengali Fashion', 'Neon Cyberpunk Portrait'];

  const filtered = photoPrompts.filter(p => {
    const matchesSub = selectedSubCategory === 'All' || p.category === selectedSubCategory;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.fullPrompt.toLowerCase().includes(search.toLowerCase());
    return matchesSub && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#151525] border border-[#242438] p-8 rounded-3xl">
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#4DDCF5] uppercase tracking-wider flex items-center gap-1.5">
            <ImageIcon className="w-4 h-4" /> AI Photo Generation
          </span>
          <h1 className="text-3xl font-black text-white">AI Photo Prompts Collection</h1>
          <p className="text-xs text-gray-400 max-w-xl">
            High-end master prompts designed for Midjourney v6, Stable Diffusion XL, and portrait consistency.
          </p>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search photo prompts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#0D0D18] border border-[#242438] rounded-xl px-4 py-2.5 pl-9 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#9B75FF] w-full md:w-64"
          />
          <Search className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
        </div>
      </div>

      {/* Subcategory Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {subCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedSubCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedSubCategory === cat 
                ? 'bg-[#9B75FF] text-white shadow-md shadow-[#9B75FF]/30' 
                : 'bg-[#151525] text-gray-400 hover:text-white border border-[#242438]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map(prompt => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#151525] border border-[#242438] rounded-3xl">
          <p className="text-sm text-gray-400">No photo prompts found matching your search.</p>
        </div>
      )}

    </div>
  );
};
