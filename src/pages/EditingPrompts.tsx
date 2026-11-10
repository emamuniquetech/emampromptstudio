import React from 'react';
import { usePrompts } from '../context/PromptContext';
import { PromptCard } from '../components/PromptCard';
import { Wand2, ShieldAlert } from 'lucide-react';

export const EditingPrompts: React.FC = () => {
  const { prompts } = usePrompts();
  const editingPrompts = prompts.filter(p => p.contentType === 'editing' && p.isPublished);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="bg-[#151525] border border-[#242438] p-8 rounded-3xl space-y-3">
        <span className="text-xs font-bold text-[#9B75FF] uppercase tracking-wider flex items-center gap-1.5">
          <Wand2 className="w-4 h-4" /> CapCut & Premiere Pro Tutorials
        </span>
        <h1 className="text-3xl font-black text-white">Viral Video Editing Workflows</h1>
        <p className="text-xs text-gray-400 max-w-2xl leading-relaxed">
          Professional video editing instructions for CapCut, Premiere Pro, and DaVinci Resolve. Distinguishing practical editing steps from AI text generators.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {editingPrompts.map(prompt => (
          <PromptCard key={prompt.id} prompt={prompt} />
        ))}
      </div>

    </div>
  );
};
