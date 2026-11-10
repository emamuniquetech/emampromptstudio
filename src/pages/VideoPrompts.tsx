import React, { useState } from 'react';
import { usePrompts } from '../context/PromptContext';
import { PromptCard } from '../components/PromptCard';
import { Film, Search } from 'lucide-react';

export const VideoPrompts: React.FC = () => {
  const { prompts } = usePrompts();
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('All');
  const [search, setSearch] = useState('');

  const videoPrompts = prompts.filter(p => p.contentType === 'video' && p.isPublished);

  const subCategories = ['All', 'Text to Video', 'Fantasy Scene', 'Cinematic Car Scene', 'Product Commercial', 'Transformation Video', 'AI Character Animation', 'Nature & Landscape'];

  const filtered = videoPrompts.filter(p => {
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
            <Film className="w-4 h-4" /> AI Video Generation
          </span>
          <h1 className="text-3xl font-black text-white">AI Video Prompts & Demos</h1>
          <p className="text-xs text-gray-400 max-w-xl">
            Cinematic motion prompts optimized for Runway Gen-3 Alpha, Kling AI, and Luma Dream Machine with real video demos.
          </p>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search video prompts..."
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
                ? 'bg-[#4DDCF5] text-[#0D0D18] shadow-md shadow-[#4DDCF5]/30' 
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
          <p className="text-sm text-gray-400">No video prompts found matching your search.</p>
        </div>
      )}

    </div>
  );
};
