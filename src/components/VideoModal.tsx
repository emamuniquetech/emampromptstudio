import React from 'react';
import { usePrompts } from '../context/PromptContext';
import { X, Play, Film, Wrench } from 'lucide-react';

export const VideoModal: React.FC = () => {
  const { selectedVideoUrl, selectedVideoMeta, closeVideoDemo } = usePrompts();

  if (!selectedVideoUrl) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#151525] border border-[#242438] rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#242438]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#9B75FF]/20 text-[#4DDCF5] rounded-xl border border-[#9B75FF]/40">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{selectedVideoMeta?.title || 'AI Video Demo'}</h3>
              <p className="text-xs text-[#4DDCF5] flex items-center gap-1 font-medium">
                <Wrench className="w-3 h-3" /> Tool: {selectedVideoMeta?.tool || 'AI Video Generator'}
              </p>
            </div>
          </div>
          <button
            onClick={closeVideoDemo}
            className="p-2 rounded-xl bg-[#0D0D18] text-gray-400 hover:text-white border border-[#242438] transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video w-full bg-black">
          <video
            src={selectedVideoUrl}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain"
          />
        </div>

        {/* Description Footer */}
        {selectedVideoMeta?.description && (
          <div className="p-5 bg-[#0D0D18] border-t border-[#242438]">
            <p className="text-xs text-gray-300 leading-relaxed">
              {selectedVideoMeta.description}
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
