import React, { useState } from 'react';
import { usePrompts } from '../context/PromptContext';
import { Shield, Lock, ArrowLeft, AlertCircle } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { adminLogin, setCurrentView } = usePrompts();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = adminLogin(password);
    if (success) {
      setCurrentView('admin-dashboard');
    } else {
      setError(true);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <button
        onClick={() => setCurrentView('home')}
        className="mb-6 flex items-center gap-1.5 text-xs text-gray-400 hover:text-white"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
      </button>

      <div className="bg-[#151525] border border-[#242438] p-8 rounded-3xl shadow-2xl space-y-6">
        <div className="w-14 h-14 bg-gradient-to-br from-[#9B75FF] to-[#4DDCF5] rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-[#9B75FF]/30">
          <Shield className="w-7 h-7 text-[#0D0D18]" />
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-xl font-black text-white">Admin Portal Login</h1>
          <p className="text-xs text-gray-400">Enter secure admin password to manage prompt database and settings. (Default: admin123)</p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/40 p-3 rounded-xl flex items-center gap-2 text-red-400 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Invalid password. Try &ldquo;admin123&rdquo;.</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-400 block mb-1">Admin Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                placeholder="Enter password..."
                className="w-full bg-[#0D0D18] border border-[#242438] rounded-xl px-4 py-3 pl-10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#9B75FF]"
              />
              <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-[#9B75FF] to-[#4DDCF5] text-[#0D0D18] rounded-xl font-extrabold text-xs shadow-lg shadow-[#9B75FF]/30 hover:opacity-95 transition-all"
          >
            Authenticate Admin
          </button>
        </form>
      </div>
    </div>
  );
};
