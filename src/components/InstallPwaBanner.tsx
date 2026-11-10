import React, { useState } from 'react';
import { Smartphone, X, Download } from 'lucide-react';

export const InstallPwaBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);
  const [installed, setInstalled] = useState(false);

  if (dismissed) return null;

  const handleInstall = () => {
    alert('To install Emam Prompt Studio on your mobile device: \n\n1. Open browser menu (3 dots or share icon).\n2. Tap "Add to Home Screen" or "Install App".\n3. Enjoy offline instant prompt generation!');
    setInstalled(true);
  };

  return (
    <div className="bg-gradient-to-r from-[#9B75FF] via-[#7050ff] to-[#4DDCF5] text-[#0D0D18] py-3.5 px-4 shadow-xl relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0D0D18] text-[#4DDCF5] flex items-center justify-center shadow-md">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-black tracking-tight text-white">
              Install Emam Prompt Studio App
            </h4>
            <p className="text-[11px] text-white/90 font-medium">
              Get the best AI Prompts on your mobile device with offline support & instant access.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleInstall}
            className="bg-[#0D0D18] hover:bg-black text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-1.5 transition-all whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5 text-[#4DDCF5]" /> {installed ? 'Installed!' : 'Install App'}
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="text-white/80 hover:text-white p-1 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};
