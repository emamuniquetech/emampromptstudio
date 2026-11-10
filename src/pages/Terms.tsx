import React from 'react';
import { Shield } from 'lucide-react';

export const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-gray-300">
      <div className="bg-[#151525] border border-[#242438] p-8 sm:p-12 rounded-3xl space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#9B75FF]/20 text-[#4DDCF5] px-4 py-1.5 rounded-full text-xs font-bold border border-[#9B75FF]/30">
          <Shield className="w-4 h-4" /> Legal & Terms
        </div>
        <h1 className="text-3xl font-black text-white">Terms & Conditions</h1>
        <p className="text-xs text-gray-400">Last updated: November 2026</p>
        
        <div className="space-y-4 text-xs leading-relaxed">
          <h3 className="text-sm font-bold text-white">1. Acceptance of Terms</h3>
          <p>By accessing Emam Prompt Studio, you agree to abide by these Terms and Conditions and all applicable laws and regulations.</p>
          
          <h3 className="text-sm font-bold text-white">2. Use of Prompts</h3>
          <p>All prompts provided in the starter library and admin panel are for creative inspiration and generation on supported AI tools. Users retain full rights over their generated creations.</p>

          <h3 className="text-sm font-bold text-white">3. Intellectual Property</h3>
          <p>The Emam Prompt Studio brand, logo, design system, and software architecture are protected under intellectual property laws.</p>
        </div>
      </div>
    </div>
  );
};
