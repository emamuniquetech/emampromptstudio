import React from 'react';
import { usePrompts } from '../context/PromptContext';
import { Gift, Play, CheckCircle2, X, Sparkles, AlertCircle, Loader2 } from 'lucide-react';

export const RewardedAdModal: React.FC = () => {
  const { 
    rewardedAdModalOpen, 
    closeRewardedAdModal, 
    executeCopy, 
    adStatus, 
    adCountdown,
    adSettings,
    playRewardedAd 
  } = usePrompts();

  if (!rewardedAdModalOpen) return null;

  const totalDuration = adSettings.rewardDurationSeconds || 5;
  const progressPercent = Math.min(100, Math.max(0, ((totalDuration - adCountdown) / totalDuration) * 100));

  const renderAdState = () => {
    switch (adStatus) {
      case 'requesting':
        return (
          <div className="z-10 space-y-3 py-2 text-center">
            <Loader2 className="w-10 h-10 text-[#4DDCF5] animate-spin mx-auto" />
            <p className="text-xs text-white font-bold">Connecting to Ad Network...</p>
            <p className="text-[11px] text-gray-400">Loading sponsor advertisement...</p>
            <button
              onClick={executeCopy}
              className="mt-2 text-[11px] text-[#4DDCF5] hover:text-white underline font-semibold transition-colors"
            >
              Don't wait? Copy Prompt Directly
            </button>
          </div>
        );
      case 'ready':
        return (
          <div className="z-10 space-y-3 py-1 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
              <Play className="w-6 h-6 fill-current ml-0.5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Sponsor Ad Ready ({totalDuration}s)</p>
              <p className="text-[11px] text-gray-400">Watch short video to unlock the copy reward.</p>
            </div>
            <button
              onClick={playRewardedAd}
              className="bg-gradient-to-r from-[#9B75FF] to-[#4DDCF5] text-[#0D0D18] px-6 py-2.5 rounded-xl text-xs font-black shadow-lg shadow-[#9B75FF]/25 hover:opacity-95 transition-all"
            >
              Watch Video & Unlock Now
            </button>
          </div>
        );
      case 'playing':
        return (
          <div className="z-10 space-y-3 py-2 w-full px-4 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9B75FF]/20 border border-[#9B75FF]/40 text-[#4DDCF5] text-[10px] font-mono font-bold tracking-wider uppercase">
              Sponsor Video Playing
            </div>
            
            <div className="text-3xl font-black text-white font-mono tracking-tight">
              {adCountdown}s
            </div>

            {/* Progress bar */}
            <div className="w-full bg-[#151525] rounded-full h-2 overflow-hidden border border-[#242438]">
              <div 
                className="h-full bg-gradient-to-r from-[#9B75FF] to-[#4DDCF5] transition-all duration-1000 ease-linear rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <p className="text-[11px] text-gray-300">
              Thank you for supporting Emam Prompt Studio! Unlocking reward automatically...
            </p>
          </div>
        );
      case 'granted':
        return (
          <div className="z-10 space-y-2 py-2 text-center animate-in fade-in zoom-in duration-300">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <p className="text-sm font-bold text-white">Reward Unlocked!</p>
            <p className="text-xs text-emerald-400 font-semibold">Prompt is copied to your clipboard ✨</p>
          </div>
        );
      case 'not-available':
      case 'error':
        return (
          <div className="z-10 space-y-2.5 py-1 text-center">
            <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
            <p className="text-xs font-bold text-white">Ad Partner Pending Review</p>
            <p className="text-[11px] text-gray-400 px-3">
              Google AdSense is currently reviewing the site. You can copy the prompt directly!
            </p>
            <button
              onClick={executeCopy}
              className="bg-gradient-to-r from-[#9B75FF] to-[#4DDCF5] text-[#0D0D18] px-5 py-2 rounded-xl text-xs font-black shadow-md hover:opacity-90 transition-all"
            >
              Copy Prompt Directly
            </button>
          </div>
        );
      default:
        return (
          <div className="z-10 space-y-3 py-2 text-center">
            <Loader2 className="w-10 h-10 text-gray-500 animate-spin mx-auto" />
            <p className="text-xs text-gray-400 font-medium">Preparing system...</p>
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
          title="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-14 h-14 bg-gradient-to-br from-[#9B75FF] to-[#4DDCF5] rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-[#9B75FF]/30">
          <Gift className="w-7 h-7 text-[#0D0D18]" />
        </div>

        <div className="space-y-1.5">
          <h3 className="text-xl font-bold text-white">Unlock Full Master Prompt</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Support the creator to copy the full high-resolution prompt and negative parameters.
          </p>
        </div>

        {/* Ad Video Simulator Card */}
        <div className="bg-[#0D0D18] border border-[#242438] rounded-2xl p-5 relative overflow-hidden flex flex-col items-center justify-center min-h-[160px]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#9B75FF]/10 to-[#4DDCF5]/10 animate-pulse pointer-events-none" />
          {renderAdState()}
        </div>

        <div className="space-y-2 pt-1">
          <button
            onClick={executeCopy}
            className={`w-full py-3.5 px-4 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer ${
              adStatus === 'granted' 
                ? 'bg-gradient-to-r from-emerald-500 to-[#4DDCF5] text-[#0D0D18] shadow-emerald-500/20 hover:opacity-95' 
                : 'bg-white/10 hover:bg-white/15 text-white border border-white/10'
            }`}
          >
            {adStatus === 'granted' ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-[#0D0D18]" /> Done! Prompt Copied to Clipboard
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#4DDCF5]" /> Copy Prompt Directly (No Wait)
              </>
            )}
          </button>

          {adStatus !== 'granted' && (
            <p className="text-[11px] text-gray-500">
              Free instant access for creators & students
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
