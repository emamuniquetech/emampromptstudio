import React from 'react';
import { usePrompts } from '../context/PromptContext';
import { Gift, Play, CheckCircle2, X, Sparkles, AlertCircle, Loader2 } from 'lucide-react';

export const RewardedAdModal: React.FC = () => {
  const { 
    rewardedAdModalOpen, 
    closeRewardedAdModal, 
    executeCopy, 
    adStatus, 
    adSettings,
    playRewardedAd 
  } = usePrompts();

  if (!rewardedAdModalOpen) return null;

  const renderAdState = () => {
    switch (adStatus) {
      case 'requesting':
        return (
          <div className="z-10 space-y-3 py-2 text-center">
            <Loader2 className="w-10 h-10 text-[#4DDCF5] animate-spin mx-auto" />
            <p className="text-xs text-white font-bold">Requesting Ad from Network...</p>
            <p className="text-[11px] text-gray-400">Verifying live inventory for rewarded video.</p>
          </div>
        );
      case 'ready':
        return (
          <div className="z-10 space-y-3 py-1 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
              <Play className="w-6 h-6 fill-current ml-0.5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Sponsor Ad Loaded</p>
              <p className="text-[11px] text-gray-400">Watch the video to the end to earn reward.</p>
            </div>
            <button
              onClick={playRewardedAd}
              className="bg-gradient-to-r from-[#9B75FF] to-[#4DDCF5] text-[#0D0D18] px-6 py-2.5 rounded-xl text-xs font-black shadow-lg shadow-[#9B75FF]/25 hover:opacity-95 transition-all"
            >
              Play Advertisement
            </button>
          </div>
        );
      case 'playing':
        return (
          <div className="z-10 space-y-3 py-2 w-full px-4 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9B75FF]/20 border border-[#9B75FF]/40 text-[#4DDCF5] text-[10px] font-mono font-bold tracking-wider uppercase">
              Video Playing
            </div>
            <p className="text-sm font-bold text-white">Ad in progress...</p>
            <p className="text-[11px] text-gray-300">
              Please do not close this window until the reward is granted.
            </p>
          </div>
        );
      case 'granted':
        return (
          <div className="z-10 space-y-2 py-2 text-center animate-in fade-in zoom-in duration-300">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <p className="text-sm font-bold text-white">Reward Granted!</p>
            <p className="text-xs text-emerald-400 font-semibold">The prompt has been copied to your clipboard.</p>
            <button
              onClick={closeRewardedAdModal}
              className="mt-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-xl text-xs font-bold"
            >
              Close Window
            </button>
          </div>
        );
      case 'not-available':
      case 'error':
        return (
          <div className="z-10 space-y-2.5 py-1 text-center">
            <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
            <p className="text-xs font-bold text-white">No Ad Available</p>
            <p className="text-[11px] text-gray-400 px-3">
              The ad network is currently under review or has no inventory for this region.
            </p>
            <div className="pt-2">
               <button
                onClick={executeCopy}
                className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-xl text-xs font-bold border border-white/10"
              >
                Copy Prompt Directly (Fallback)
              </button>
            </div>
          </div>
        );
      default:
        return (
          <div className="z-10 space-y-3 py-2 text-center">
            <Loader2 className="w-10 h-10 text-gray-500 animate-spin mx-auto" />
            <p className="text-xs text-gray-400 font-medium">Initializing...</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#151525] border border-[#242438] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative space-y-5 text-center animate-in fade-in zoom-in duration-200">
        
        <button
          onClick={closeRewardedAdModal}
          className="absolute top-4 right-4 p-2 rounded-xl bg-[#0D0D18] text-gray-400 hover:text-white border border-[#242438] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-14 h-14 bg-gradient-to-br from-[#9B75FF] to-[#4DDCF5] rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-[#9B75FF]/30">
          <Gift className="w-7 h-7 text-[#0D0D18]" />
        </div>

        <div className="space-y-1.5">
          <h3 className="text-xl font-bold text-white">Unlock Full Master Prompt</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Support the creator by watching a rewarded advertisement.
          </p>
        </div>

        {/* Ad Video Card */}
        <div className="bg-[#0D0D18] border border-[#242438] rounded-2xl p-5 relative overflow-hidden flex flex-col items-center justify-center min-h-[160px]">
          {renderAdState()}
        </div>

        {adStatus !== 'granted' && (
          <div className="pt-2 text-[10px] text-gray-500 italic">
            Ads are served by Google. Reward is only granted after successful video completion.
          </div>
        )}

      </div>
    </div>
  );
};
