import React from 'react';
import { usePrompts } from '../context/PromptContext';
import { 
  Sparkles, Search, Smartphone, Film, Copy, Gift, Shield, Download, Grid, Wand2, ArrowLeft 
} from 'lucide-react';

export const Features: React.FC = () => {
  const { setCurrentView } = usePrompts();

  const featureList = [
    {
      title: 'স্মার্ট সার্চ ও ফিল্টার (Smart Search & Filters)',
      desc: 'যেকোনো প্রম্পট দ্রুত খুঁজে পাওয়ার জন্য ইনস্ট্যান্ট সার্চ বার এবং ক্যাটাগরিভিত্তিক ফিল্টার সিস্টেম।',
      icon: Search,
      color: 'from-[#9B75FF] to-[#8050ff]',
    },
    {
      title: 'মোবাইল-ফার্স্ট PWA (Progressive Web App)',
      desc: 'মোবাইল ব্যবহারকারীদের জন্য অ্যাপের মতো অভিজ্ঞতা, হোম স্ক্রিনে ইনস্টল করার সুবিধা এবং বটম নেভিগেশন।',
      icon: Smartphone,
      color: 'from-[#4DDCF5] to-[#0099bb]',
    },
    {
      title: 'প্রম্পট ক্যাটাগরি (Core Categories)',
      desc: 'এআই ফটো (Midjourney, SDXL), এআই ভিডিও (Runway Gen-3, Kling AI) এবং ভাইরাল ভিডিও এডিটিং (CapCut, Beat Sync, Velocity)।',
      icon: Grid,
      color: 'from-[#9B75FF] to-[#4DDCF5]',
    },
    {
      title: 'রিয়েল ভিডিও ডেমো প্লেয়ার (Real Video Player)',
      desc: 'শুধুমাত্র ছবি নয়, প্রম্পটের মাধ্যমে তৈরি করা ভিডিও কেমন আউটপুট দেবে তা দেখানোর জন্য ইন-বিল্ট ভিডিও প্লেয়ার।',
      icon: Film,
      color: 'from-amber-500 to-orange-500',
    },
    {
      title: 'ওয়ান-ট্যাপ প্রম্পট কপি (One-Tap Copy)',
      desc: 'এক ক্লিকে মাস্টার প্রম্পট সরাসরি ক্লিপবোর্ডে কপি করার সুবিধা।',
      icon: Copy,
      color: 'from-emerald-400 to-teal-500',
    },
    {
      title: 'রিওয়ার্ডেড অ্যাড সিস্টেম (Rewarded Ads)',
      desc: 'ক্রিয়েটর ও প্ল্যাটফর্মের আয়ের জন্য প্রম্পট কপি করার আগে ছোট অ্যাড দেখার অপশনাল সিস্টেম।',
      icon: Gift,
      color: 'from-pink-500 to-rose-500',
    },
    {
      title: 'ফুল CRUD কন্ট্রোল (Admin CRUD)',
      desc: 'অ্যাডমিন প্যানেল থেকে যেকোনো নতুন প্রম্পট যোগ, এডিট বা ডিলিট করার সম্পূর্ণ স্বাধীনতা।',
      icon: Shield,
      color: 'from-[#9B75FF] to-pink-500',
    },
    {
      title: 'গ্যালারি থেকে মিডিয়া আপলোড (Gallery Upload)',
      desc: 'সরাসরি গ্যালারি থেকে ছবি ও ভিডিও আপলোড এবং সাইজ গাইড (9:16, 16:9, 1:1, 3:4)।',
      icon: Wand2,
      color: 'from-[#4DDCF5] to-emerald-400',
    },
    {
      title: 'ডাটাবেজ ব্যাকআপ ও রিস্টোর (Backup & Restore)',
      desc: 'যেকোনো সময় পুরো প্রম্পট ডাটাবেজ JSON ফাইল হিসেবে ডাউনলোড বা রিস্টোর করার সুবিধা।',
      icon: Download,
      color: 'from-purple-500 to-indigo-500',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Back Button */}
      <button 
        onClick={() => setCurrentView('home')}
        className="flex items-center gap-2 text-gray-400 hover:text-white bg-[#151525] border border-[#242438] px-4 py-2 rounded-xl text-xs font-semibold transition-all"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </button>

      {/* Header Banner */}
      <div className="bg-[#151525] border border-[#242438] p-8 sm:p-12 rounded-3xl space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#9B75FF]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="inline-flex items-center gap-2 bg-[#9B75FF]/20 text-[#4DDCF5] px-4 py-1.5 rounded-full text-xs font-bold border border-[#9B75FF]/30">
          <Sparkles className="w-4 h-4" /> Platform Capabilities
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Emam Prompt Studio — Core Features & Architecture
        </h1>
        <p className="text-sm text-gray-300 max-w-2xl leading-relaxed">
          Explore all the professional features, monetization tools, PWA capabilities, and administrative controls built into Emam Prompt Studio.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featureList.map((f, idx) => {
          const Icon = f.icon;
          return (
            <div key={idx} className="bg-[#151525] border border-[#242438] hover:border-[#9B75FF]/60 rounded-3xl p-6 space-y-4 transition-all group shadow-xl">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-[#0D0D18] shadow-lg group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#4DDCF5] transition-colors">{f.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          );
        })}
      </div>

    </div>
  );
};
