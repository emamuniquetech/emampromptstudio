import React from 'react';
import { PromptItem } from '../types';
import { usePrompts } from '../context/PromptContext';
import { Sparkles, Copy, Heart, Play, Film, Image as ImageIcon, Wrench } from 'lucide-react';

interface PromptCardProps {
  prompt: PromptItem;
}

export const PromptCard: React.FC<PromptCardProps> = ({ prompt }) => {
  const { 
    isFavorite, 
    toggleFavorite, 
    requestCopyPrompt, 
    openVideoDemo, 
    setCurrentView 
  } = usePrompts();
  
  const favorited = isFavorite(prompt.id);

  return (
    <div className="bg-[#151525] rounded-2xl border border-[#242438] overflow-hidden hover:border-[#9B75FF]/60 transition-all duration-300 flex flex-col group shadow-lg">
      
      {/* Image Preview Header */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#0D0D18]">
        <img 
          src={prompt.previewImage} 
          alt={prompt.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="bg-[#0D0D18]/80 backdrop-blur-md text-[#4DDCF5] border border-[#4DDCF5]/30 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
            {prompt.contentType === 'photo' && <ImageIcon className="w-3 h-3" />}
            {prompt.contentType === 'video' && <Film className="w-3 h-3" />}
            {prompt.contentType === 'editing' && <Sparkles className="w-3 h-3" />}
            {prompt.category}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(prompt.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all ${
            favorited 
              ? 'bg-red-500/20 text-red-400 border border-red-500/40' 
              : 'bg-[#0D0D18]/80 text-gray-400 hover:text-white border border-[#242438]'
          }`}
        >
          <Heart className={`w-4 h-4 ${favorited ? 'fill-red-400' : ''}`} />
        </button>

        {/* Aspect Ratio Badge */}
        <div className="absolute bottom-3 right-3 bg-[#0D0D18]/80 backdrop-blur-md text-gray-300 text-[10px] px-2 py-0.5 rounded font-mono border border-[#242438]">
          {prompt.aspectRatio}
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span className="flex items-center gap-1 text-[#9B75FF] font-medium">
              <Wrench className="w-3 h-3" /> {prompt.recommendedTool}
            </span>
            <span>{prompt.createdAt}</span>
          </div>

          <h3 
            onClick={() => setCurrentView('detail', prompt.id)}
            className="text-base font-bold text-white hover:text-[#4DDCF5] cursor-pointer transition-colors line-clamp-1"
          >
            {prompt.title}
          </h3>

          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
            {prompt.description}
          </p>
        </div>

        {/* Actions */}
        <div className="pt-3 border-t border-[#242438] flex items-center gap-2">
          {prompt.videoUrl ? (
            <button
              onClick={() => openVideoDemo(prompt.videoUrl!, prompt.title, prompt.recommendedTool, prompt.description)}
              className="flex-1 bg-[#242438] hover:bg-[#9B75FF]/20 text-white hover:text-[#4DDCF5] border border-[#30304a] hover:border-[#9B75FF]/40 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> Watch Demo
            </button>
          ) : (
            <button
              onClick={() => setCurrentView('detail', prompt.id)}
              className="flex-1 bg-[#242438] hover:bg-[#9B75FF]/20 text-white hover:text-[#4DDCF5] border border-[#30304a] hover:border-[#9B75FF]/40 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
            >
              View Details
            </button>
          )}

          <button
            onClick={() => requestCopyPrompt(prompt.fullPrompt)}
            className="bg-gradient-to-r from-[#9B75FF] to-[#4DDCF5] text-[#0D0D18] hover:opacity-90 py-2 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-[#4DDCF5]/10 transition-all"
          >
            <Copy className="w-3.5 h-3.5" /> Copy
          </button>
        </div>

      </div>

    </div>
  );
};
