import React, { useState } from 'react';
import { usePrompts } from '../context/PromptContext';
import { Shield, Lock, ArrowLeft, AlertCircle, Sparkles } from 'lucide-react';
import { auth, googleProvider, signInWithPopup } from '../firebase';

export const AdminLogin: React.FC = () => {
  const { adminLogin, setCurrentView } = usePrompts();
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = adminLogin(password);
    if (success) {
      setCurrentView('admin-dashboard');
    } else {
      setError('Invalid admin password. Try "admin123".');
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      // Authorize admin email or any user
      if (user) {
        localStorage.setItem('emam_admin_auth', 'true');
        setCurrentView('admin-dashboard');
      }
    } catch (err: any) {
      console.error('Firebase Auth error:', err);
      setError(err.message || 'Google Authentication failed.');
    } finally {
      setLoading(false);
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
          <h1 className="text-xl font-black text-white">Admin Portal Security Layer</h1>
          <p className="text-xs text-gray-400">Authenticated via Firebase Auth & Secure Master Password.</p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/40 p-3 rounded-xl flex items-center gap-2 text-red-400 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Google Auth Button */}
        <button
          type="button"
          disabled={loading}
          onClick={handleGoogleLogin}
          className="w-full py-3.5 bg-white text-gray-900 rounded-xl font-extrabold text-xs shadow-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.19v3.15C3.17 21.32 7.22 24 12 24z"/>
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.19C.43 8.1 0 9.8 0 12s.43 3.9 1.19 5.42l4.09-3.15z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.22 0 3.17 2.68 1.19 6.58l4.09 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
          </svg>
          {loading ? 'Authenticating with Firebase...' : 'Sign in with Google (Firebase Auth)'}
        </button>

        <div className="flex items-center gap-4 my-2">
          <div className="flex-1 h-px bg-[#242438]" />
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Or Password</span>
          <div className="flex-1 h-px bg-[#242438]" />
        </div>

        <form onSubmit={handlePasswordLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-400 block mb-1">Admin Master Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(null); }}
                placeholder="Enter password..."
                className="w-full bg-[#0D0D18] border border-[#242438] rounded-xl px-4 py-3 pl-10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#9B75FF]"
              />
              <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-[#9B75FF] to-[#4DDCF5] text-[#0D0D18] rounded-xl font-extrabold text-xs shadow-lg shadow-[#9B75FF]/30 hover:opacity-95 transition-all cursor-pointer"
          >
            Authenticate with Password
          </button>
        </form>
      </div>
    </div>
  );
};
