import React from 'react';
import { Sparkles, Shield, Zap, Heart } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      <div className="bg-[#151525] border border-[#242438] p-8 sm:p-12 rounded-3xl space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#9B75FF]/20 text-[#4DDCF5] px-4 py-1.5 rounded-full text-xs font-bold border border-[#9B75FF]/30">
          <Sparkles className="w-4 h-4" /> About Emam Prompt Studio
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Create. Imagine. Go Viral.
        </h1>

        <p className="text-sm text-gray-300 leading-relaxed">
          Emam Prompt Studio is the premier production-ready AI creative prompt platform built for modern creators, filmmakers, digital artists, and social media video editors. Our platform bridges the gap between raw imagination and professional AI output across Midjourney, Runway Gen-3, Kling AI, and CapCut.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#242438]">
          <div className="bg-[#0D0D18] p-5 rounded-2xl border border-[#242438] space-y-2">
            <Zap className="w-6 h-6 text-[#4DDCF5]" />
            <h3 className="text-sm font-bold text-white">Super Fast Loading</h3>
            <p className="text-xs text-gray-400">Optimized PWA architecture built for instantaneous prompt retrieval.</p>
          </div>
          <div className="bg-[#0D0D18] p-5 rounded-2xl border border-[#242438] space-y-2">
            <Shield className="w-6 h-6 text-[#9B75FF]" />
            <h3 className="text-sm font-bold text-white">Secure Admin Studio</h3>
            <p className="text-xs text-gray-400">Full content management, database backups, and customizable ad settings.</p>
          </div>
          <div className="bg-[#0D0D18] p-5 rounded-2xl border border-[#242438] space-y-2">
            <Heart className="w-6 h-6 text-red-400" />
            <h3 className="text-sm font-bold text-white">Authentic & Practical</h3>
            <p className="text-xs text-gray-400">Verified starter library with 30+ practical prompts and real video demos.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
