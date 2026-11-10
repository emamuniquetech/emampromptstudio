import React, { useState } from 'react';
import { usePrompts } from '../context/PromptContext';
import { Download, Smartphone, Monitor, CheckCircle2, Sparkles, ArrowLeft } from 'lucide-react';

export const DownloadApp: React.FC = () => {
  const { setCurrentView } = usePrompts();
  const [downloadStarted, setDownloadStarted] = useState(false);

  const handleDownloadTrigger = (platform: string) => {
    setDownloadStarted(true);
    alert(`Emam Prompt Studio (${platform}) PWA installation triggered! Follow your browser prompt to install.`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Back Button */}
      <button 
        onClick={() => setCurrentView('home')}
        className="flex items-center gap-2 text-gray-400 hover:text-white bg-[#151525] border border-[#242438] px-4 py-2 rounded-xl text-xs font-semibold transition-all"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </button>

      {/* Hero Banner */}
      <div className="bg-[#151525] border border-[#242438] p-8 sm:p-12 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#9B75FF]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="w-16 h-16 bg-gradient-to-br from-[#9B75FF] to-[#4DDCF5] rounded-3xl flex items-center justify-center mx-auto shadow-xl shadow-[#9B75FF]/30">
          <Download className="w-8 h-8 text-[#070719]" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-[#4DDCF5] uppercase tracking-wider">Official PWA Installer</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Download Emam Prompt Studio for PC & Android
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
            Install Emam Prompt Studio directly as a native desktop or mobile application with offline support and lightning-fast prompt access.
          </p>
        </div>

        {downloadStarted && (
          <div className="bg-[#070719] border border-emerald-500/40 p-4 rounded-2xl flex items-center justify-center gap-2 text-emerald-400 text-xs font-bold max-w-md mx-auto">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>Installation package triggered successfully! Check your browser prompt.</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[#242438]">
          
          {/* Android Card */}
          <div className="bg-[#070719] border border-[#242438] hover:border-[#4DDCF5]/60 p-6 rounded-2xl space-y-4 text-left transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#4DDCF5]/20 text-[#4DDCF5] flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Android & Mobile</h3>
                <span className="text-[10px] text-gray-400">PWA Instant Install</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Open this website in Chrome or Edge on your Android phone, tap the menu (3 dots), and tap &ldquo;Install App&rdquo; or &ldquo;Add to Home Screen&rdquo;.
            </p>
            <button
              onClick={() => handleDownloadTrigger('Android')}
              className="w-full py-3 bg-gradient-to-r from-[#9B75FF] to-[#4DDCF5] text-[#070719] rounded-xl font-extrabold text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" /> Install on Android
            </button>
          </div>

          {/* PC Desktop Card */}
          <div className="bg-[#070719] border border-[#242438] hover:border-[#9B75FF]/60 p-6 rounded-2xl space-y-4 text-left transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#9B75FF]/20 text-[#9B75FF] flex items-center justify-center">
                <Monitor className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">PC Windows / Mac</h3>
                <span className="text-[10px] text-gray-400">Desktop App Install</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Open this website in Google Chrome or Microsoft Edge on your PC, click the install icon in the address bar, and install Emam Prompt Studio on your desktop.
            </p>
            <button
              onClick={() => handleDownloadTrigger('PC Desktop')}
              className="w-full py-3 bg-gradient-to-r from-[#9B75FF] to-[#4DDCF5] text-[#070719] rounded-xl font-extrabold text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" /> Install on PC Desktop
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
