import React from 'react';
import { usePrompts } from '../context/PromptContext';
import { PromptCard } from '../components/PromptCard';
import { Sparkles } from 'lucide-react';

export const EffectsPrompts: React.FC = () => {
  const { prompts } = usePrompts();
  const effectsPrompts = prompts.filter(p => p.contentType === 'effect' && p.isPublished);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="bg-[#151525] border border-[#242438] p-8 rounded-3xl space-y-3">
        <span className="text-xs font-bold text-[#4DDCF5] uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-4 h-4" /> Special Visual Effects
        </span>
        <h1 className="text-3xl font-black text-white">Trending Creative Effects</h1>
        <p className="text-xs text-gray-400 max-w-2xl leading-relaxed">
          Magical transformations, floating zero-gravity objects, giant miniature tilt-shift cityscapes, and superhero style transitions.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {effectsPrompts.map(prompt => (
          <PromptCard key={prompt.id} prompt={prompt} />
        ))}
      </div>

    </div>
  );
};
