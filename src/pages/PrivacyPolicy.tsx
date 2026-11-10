import React from 'react';
import { Shield } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-gray-300">
      <div className="bg-[#151525] border border-[#242438] p-8 sm:p-12 rounded-3xl space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#9B75FF]/20 text-[#4DDCF5] px-4 py-1.5 rounded-full text-xs font-bold border border-[#9B75FF]/30">
          <Shield className="w-4 h-4" /> Legal & Privacy
        </div>
        <h1 className="text-3xl font-black text-white">Privacy Policy</h1>
        <p className="text-xs text-gray-400">Last updated: November 2026</p>
        
        <div className="space-y-4 text-xs leading-relaxed">
          <h3 className="text-sm font-bold text-white">1. Information We Collect</h3>
          <p>Emam Prompt Studio respects your privacy. We store saved prompt favorites and admin settings securely in your browser&apos;s local storage and Supabase backend where applicable.</p>
          
          <h3 className="text-sm font-bold text-white">2. Use of Rewarded Ads</h3>
          <p>Optional rewarded ad system requires a brief ad interaction to unlock prompt copying. Ads are delivered through legitimate web advertising providers adhering to strict safety guidelines.</p>

          <h3 className="text-sm font-bold text-white">3. Data Security</h3>
          <p>We implement robust security measures to protect your data. API secrets and credentials are never exposed in frontend JavaScript code.</p>
        </div>
      </div>
    </div>
  );
};
