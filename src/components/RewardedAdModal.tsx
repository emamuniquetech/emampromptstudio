import React, { useState, useEffect } from 'react';
import { usePrompts } from '../context/PromptContext';
import { Gift, Play, CheckCircle2, X, Sparkles, AlertCircle } from 'lucide-react';

export const RewardedAdModal: React.FC = () => {
  const { rewardedAdModalOpen, closeRewardedAdModal, executeCopy, adSettings } = usePrompts();
  const [countdown, setCountdown] = useState(adSettings.rewardDurationSeconds);
  const [adCompleted, setAdCompleted] = useState(false);

  useEffect(() => {
    if (rewardedAdModalOpen) {
      setCountdown(adSettings.rewardDurationSeconds);
      setAdCompleted(false);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setAdCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [rewardedAdModalOpen, adSettings.rewardDurationSeconds]);

  if (!rewardedAdModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#151525] border border-[#242438] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative space-y-6 text-center animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
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
          <h3 className="text-xl font-bold text-white">Watch Ad to Unlock Prompt</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Support Emam Prompt Studio by watching a brief 5-second rewarded ad. The master prompt will be instantly copied to your clipboard.
          </p>
        </div>

        {/* Ad Simulator Box */}
        <div className="bg-[#0D0D18] border border-[#242438] rounded-2xl p-6 relative overflow-hidden flex flex-col items-center justify-center aspect-video">
          <div className="absolute inset-0 bg-gradient-to-br from-[#9B75FF]/10 to-[#4DDCF5]/10 animate-pulse" />
          
          {!adCompleted ? (
            <div className="z-10 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#151525] border border-[#9B75FF]/40 flex items-center justify-center mx-auto text-[#4DDCF5] font-mono font-bold text-lg">
                {countdown}s
              </div>
              <p className="text-xs text-gray-300 font-medium">Playing Rewarded Ad ({adSettings.provider})...</p>
            </div>
          ) : (
            <div className="z-10 space-y-2 text-center animate-in fade-in duration-300">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <p className="text-sm font-bold text-white">Reward Unlocked!</p>
              <p className="text-[11px] text-gray-400">Click below to copy your prompt.</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={executeCopy}
            disabled={!adCompleted}
            className={`w-full py-3.5 px-4 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
              adCompleted 
                ? 'bg-gradient-to-r from-[#9B75FF] to-[#4DDCF5] text-[#0D0D18] shadow-[#4DDCF5]/20 hover:opacity-90 cursor-pointer' 
                : 'bg-[#242438] text-gray-500 cursor-not-allowed border border-[#30304a]'
            }`}
          >
            <Sparkles className="w-4 h-4" /> Copy Prompt to Clipboard
          </button>

          <button
            onClick={executeCopy}
            className="w-full py-2 text-xs text-gray-400 hover:text-white transition-colors"
          >
            Skip Ad & Copy Directly
          </button>
        </div>

      </div>
    </div>
  );
};
