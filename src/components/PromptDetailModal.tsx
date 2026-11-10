import React from 'react';
import { usePrompts } from '../context/PromptContext';
import { 
  ArrowLeft, Copy, Heart, Play, Wrench, Sparkles, CheckCircle2, ShieldAlert, Share2 
} from 'lucide-react';

export const PromptDetailModal: React.FC = () => {
  const { 
    prompts, 
    selectedPromptId, 
    setCurrentView, 
    isFavorite, 
    toggleFavorite, 
    requestCopyPrompt, 
    openVideoDemo 
  } = usePrompts();

  const prompt = prompts.find(p => p.id === selectedPromptId) || prompts[0];

  if (!prompt) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-white">
        <p>Prompt not found.</p>
        <button onClick={() => setCurrentView('home')} className="mt-4 px-4 py-2 bg-[#9B75FF] text-white rounded-xl">
          Back to Home
        </button>
      </div>
    );
  }

  const favorited = isFavorite(prompt.id);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Back Button */}
      <button 
        onClick={() => setCurrentView('home')}
        className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white bg-[#151525] border border-[#242438] px-4 py-2 rounded-xl text-xs font-semibold transition-all"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Explore
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-[#151525] border border-[#242438] rounded-3xl p-6 sm:p-8 shadow-2xl">
        
        {/* Left: Preview Image & Video Demo Trigger */}
        <div className="space-y-4">
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#0D0D18] border border-[#242438]">
            <img 
              src={prompt.previewImage} 
              alt={prompt.title}
              className="w-full h-full object-cover"
            />
            {prompt.videoUrl && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                <button
                  onClick={() => openVideoDemo(prompt.videoUrl!, prompt.title, prompt.recommendedTool, prompt.description)}
                  className="bg-[#9B75FF] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 font-bold text-sm px-6"
                >
                  <Play className="w-5 h-5 fill-white" /> Watch Playable Demo
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-[#0D0D18] p-3 rounded-xl border border-[#242438]">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Aspect Ratio</span>
              <span className="text-sm font-bold text-[#4DDCF5] font-mono">{prompt.aspectRatio}</span>
            </div>
            <div className="bg-[#0D0D18] p-3 rounded-xl border border-[#242438]">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider block">AI Tool</span>
              <span className="text-sm font-bold text-[#9B75FF]">{prompt.recommendedTool}</span>
            </div>
            <div className="bg-[#0D0D18] p-3 rounded-xl border border-[#242438]">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Category</span>
              <span className="text-sm font-bold text-white">{prompt.category}</span>
            </div>
          </div>
        </div>

        {/* Right: Full Prompt & Details */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-[#9B75FF]/20 text-[#9B75FF] border border-[#9B75FF]/30 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> {prompt.contentType.toUpperCase()} PROMPT
              </span>
              <button
                onClick={() => toggleFavorite(prompt.id)}
                className={`p-2.5 rounded-xl border transition-all ${
                  favorited 
                    ? 'bg-red-500/20 text-red-400 border-red-500/40' 
                    : 'bg-[#0D0D18] text-gray-400 hover:text-white border-[#242438]'
                }`}
              >
                <Heart className={`w-5 h-5 ${favorited ? 'fill-red-400' : ''}`} />
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {prompt.title}
            </h1>

            <p className="text-sm text-gray-300 leading-relaxed">
              {prompt.description}
            </p>

            {/* Prompt Box */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
                <span>Full Master Prompt</span>
                <span className="text-[#4DDCF5] text-[10px]">Optimized for {prompt.recommendedTool}</span>
              </label>
              <div className="bg-[#0D0D18] p-4 rounded-xl border border-[#242438] text-xs text-gray-200 font-mono leading-relaxed relative group">
                <p className="selection:bg-[#9B75FF] selection:text-white">{prompt.fullPrompt}</p>
              </div>
            </div>

            {/* Negative Prompt if exists */}
            {prompt.negativePrompt && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" /> Negative Prompt
                </label>
                <div className="bg-[#0D0D18] p-3 rounded-xl border border-red-500/20 text-xs text-gray-400 font-mono">
                  {prompt.negativePrompt}
                </div>
              </div>
            )}
          </div>

          {/* Copy Action Button */}
          <div className="pt-4 border-t border-[#242438] flex items-center gap-3">
            <button
              onClick={() => requestCopyPrompt(prompt.fullPrompt)}
              className="flex-1 bg-gradient-to-r from-[#9B75FF] to-[#4DDCF5] text-[#0D0D18] py-3.5 px-6 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#9B75FF]/30 hover:opacity-95 transition-all"
            >
              <Copy className="w-4 h-4" /> Copy Master Prompt
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
