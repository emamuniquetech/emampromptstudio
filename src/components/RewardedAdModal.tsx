import React from 'react';
import { usePrompts } from '../context/PromptContext';
import { Gift, Play, CheckCircle2, X, Sparkles, AlertCircle, Loader2 } from 'lucide-react';

export const RewardedAdModal: React.FC = () => {
  const { 
    rewardedAdModalOpen, 
    closeRewardedAdModal, 
    executeCopy, 
    adStatus, 
    playRewardedAd 
  } = usePrompts();

  if (!rewardedAdModalOpen) return null;

  const renderAdState = () => {
    switch (adStatus) {
      case 'requesting':
        return (
          <div className="z-10 space-y-3">
            <Loader2 className="w-12 h-12 text-[#4DDCF5] animate-spin mx-auto" />
            <p className="text-xs text-gray-300 font-medium">Requesting Rewarded Ad...</p>
          </div>
        );
      case 'ready':
        return (
          <div className="z-10 space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
              <Play className="w-6 h-6 fill-current" />
            </div>
            <p className="text-sm font-bold text-white">Ad Ready to Play</p>
            <button
              onClick={playRewardedAd}
              className="bg-gradient-to-r from-[#9B75FF] to-[#4DDCF5] text-[#0D0D18] px-6 py-2 rounded-xl text-xs font-bold shadow-lg"
            >
              Watch Ad & Unlock
            </button>
          </div>
        );
      case 'playing':
        return (
          <div className="z-10 space-y-3 text-center">
            <div className="w-12 h-12 rounded-full bg-[#151525] border border-[#9B75FF]/40 flex items-center justify-center mx-auto text-[#4DDCF5] font-mono font-bold text-lg animate-pulse">
              Ad
            </div>
            <p className="text-xs text-gray-300 font-medium">Ad Playing... Please wait.</p>
          </div>
        );
      case 'granted':
        return (
          <div className="z-10 space-y-2 text-center animate-in fade-in duration-300">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <p className="text-sm font-bold text-white">Reward Unlocked!</p>
            <p className="text-[11px] text-gray-400">The prompt is ready for you.</p>
          </div>
        );
      case 'not-available':
      case 'error':
        return (
          <div className="z-10 space-y-3 text-center">
            <AlertCircle className="w-12 h-12 text-amber-400 mx-auto" />
            <p className="text-sm font-bold text-white">Ad Not Available</p>
            <p className="text-[11px] text-gray-400 px-4">Sorry, we couldn't load an ad right now. You can copy the prompt directly.</p>
            <button
              onClick={executeCopy}
              className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-xl text-xs font-bold"
            >
              Copy Directly
            </button>
          </div>
        );
      default:
        return (
          <div className="z-10 space-y-3">
            <Loader2 className="w-12 h-12 text-gray-600 animate-spin mx-auto" />
            <p className="text-xs text-gray-500 font-medium">Preparing system...</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#151525] border border-[#242438] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative space-y-6 text-center animate-in fade-in zoom-in duration-200">
        
        <button
          onClick={closeRewardedAdModal}
          className="absolute top-4 right-4 p-2 rounded-xl bg-[#0D0D18] text-gray-400 hover:text-white border border-[#242438]"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-16 h-16 bg-gradient-to-br from-[#9B75FF] to-[#4DDCF5] rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-[#9B75FF]/30">
          <Gift className="w-8 h-8 text-[#0D0D18]" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white">Unlock Full Master Prompt</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Watch a short video advertisement to support the studio and unlock the clipboard copy reward.
          </p>
        </div>

        <div className="bg-[#0D0D18] border border-[#242438] rounded-2xl p-6 relative overflow-hidden flex flex-col items-center justify-center aspect-video">
          <div className="absolute inset-0 bg-gradient-to-br from-[#9B75FF]/10 to-[#4DDCF5]/10 animate-pulse" />
          {renderAdState()}
        </div>

        <div className="space-y-2">
          <button
            onClick={executeCopy}
            disabled={adStatus !== 'granted'}
            className={`w-full py-3.5 px-4 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
              adStatus === 'granted' 
                ? 'bg-gradient-to-r from-[#9B75FF] to-[#4DDCF5] text-[#0D0D18] shadow-[#4DDCF5]/20 hover:opacity-90 cursor-pointer' 
                : 'bg-[#242438] text-gray-500 cursor-not-allowed border border-[#30304a]'
            }`}
          >
            <Sparkles className="w-4 h-4" /> Finalize Copy to Clipboard
          </button>

          {adStatus !== 'granted' && adStatus !== 'requesting' && (
            <button
              onClick={executeCopy}
              className="w-full py-2 text-xs text-gray-500 hover:text-white transition-colors"
            >
              Skip Support & Copy Anyway
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
