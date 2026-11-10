import React, { useState } from 'react';
import { Mail, Send, CheckCircle2 } from 'lucide-react';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <div className="bg-[#151525] border border-[#242438] p-8 sm:p-12 rounded-3xl space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#4DDCF5] uppercase tracking-wider flex items-center gap-1.5">
            <Mail className="w-4 h-4" /> Get in Touch
          </span>
          <h1 className="text-3xl font-black text-white">Contact Emam Support</h1>
          <p className="text-xs text-gray-400">
            Have questions, feedback, or custom prompt requests? Drop us a message below.
          </p>
        </div>

        {submitted ? (
          <div className="bg-[#0D0D18] border border-emerald-500/30 p-8 rounded-2xl text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">Message Sent Successfully!</h3>
            <p className="text-xs text-gray-400">Thank you for reaching out. Our support team will get back to you shortly.</p>
            <button
              onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }); }}
              className="mt-4 px-6 py-2 bg-[#9B75FF] text-white text-xs font-bold rounded-xl"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-400 block mb-1">Your Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Enter your name"
                className="w-full bg-[#0D0D18] border border-[#242438] rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#9B75FF]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 block mb-1">Email Address</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full bg-[#0D0D18] border border-[#242438] rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#9B75FF]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 block mb-1">Message</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="How can we help you?"
                className="w-full bg-[#0D0D18] border border-[#242438] rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#9B75FF]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-[#9B75FF] to-[#4DDCF5] text-[#0D0D18] rounded-xl font-extrabold text-xs shadow-lg shadow-[#9B75FF]/30 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Send Message
            </button>
          </form>
        )}
      </div>

    </div>
  );
};
