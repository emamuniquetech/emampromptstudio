import React from 'react';
import { usePrompts } from '../context/PromptContext';
import { PromptCard } from '../components/PromptCard';
import { Search, ArrowLeft } from 'lucide-react';

export const SearchResults: React.FC = () => {
  const { prompts, selectedPromptId: query, setCurrentView } = usePrompts();

  const searchQuery = (query || '').toLowerCase();
  const filtered = prompts.filter(p => 
    p.title.toLowerCase().includes(searchQuery) ||
    p.category.toLowerCase().includes(searchQuery) ||
    p.fullPrompt.toLowerCase().includes(searchQuery) ||
    p.description.toLowerCase().includes(searchQuery) ||
    p.recommendedTool.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="flex items-center justify-between bg-[#151525] border border-[#242438] p-8 rounded-3xl">
        <div className="space-y-2">
          <button 
            onClick={() => setCurrentView('home')}
            className="mb-2 flex items-center gap-1.5 text-xs text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </button>
          <span className="text-xs font-bold text-[#4DDCF5] uppercase tracking-wider flex items-center gap-1.5">
            <Search className="w-4 h-4" /> Search Results
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Results for &ldquo;{query}&rdquo;</h1>
          <p className="text-xs text-gray-400">Found {filtered.length} matching prompts in studio database.</p>
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map(prompt => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#151525] border border-[#242438] rounded-3xl space-y-3">
          <p className="text-sm text-gray-400">No prompts found matching your search query.</p>
          <button
            onClick={() => setCurrentView('home')}
            className="px-4 py-2 bg-[#9B75FF] text-white rounded-xl text-xs font-bold"
          >
            Back to Home
          </button>
        </div>
      )}

    </div>
  );
};
