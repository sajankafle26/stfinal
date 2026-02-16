
import React, { useState } from 'react';
import { apiService } from '@/services/apiService';
import { User } from '@/types';

interface LoginProps {
  onLoginSuccess: (token: string, user: User) => void;
  onBack: () => void;
}

const Login = ({ onLoginSuccess, onBack }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'student' | 'admin'>('student');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await apiService.login({ email, password, role: activeTab });
      onLoginSuccess(data.token, data.user);
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050b14] relative overflow-hidden font-sans">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-indigo-800 rounded-full blur-[150px] animate-pulse"></div>
      </div>

      <div className="max-w-md w-full mx-6 relative z-10">
        <div className="bg-slate-900/40 backdrop-blur-3xl border border-slate-800 rounded-[3rem] p-10 shadow-3xl">
          <div className="text-center space-y-4 mb-10">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl font-black italic shadow-2xl shadow-indigo-600/30 mx-auto mb-6 transform hover:rotate-6 transition-transform">
              ST
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">Sangalo Access</h1>
            <p className="text-slate-400 font-medium">Log in to your specialized dashboard</p>
          </div>

          <div className="flex p-1 bg-slate-950 rounded-2xl mb-8">
            <button
              onClick={() => setActiveTab('student')}
              className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'student' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Student
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'admin' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
              <div className="relative">
                <i className="fa-solid fa-envelope absolute left-6 top-1/2 -translate-y-1/2 text-slate-600"></i>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl pl-14 pr-6 py-4 text-white placeholder:text-slate-700 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-medium"
                  placeholder={activeTab === 'admin' ? "admin@sangalotech.com" : "student@example.com"}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Password</label>
              <div className="relative">
                <i className="fa-solid fa-lock absolute left-6 top-1/2 -translate-y-1/2 text-slate-600"></i>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl pl-14 pr-6 py-4 text-white placeholder:text-slate-700 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl text-rose-400 text-sm font-bold flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                <i className="fa-solid fa-triangle-exclamation"></i>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-2xl shadow-indigo-600/20 hover:bg-indigo-500 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-spinner animate-spin"></i>
                  Authenticating...
                </>
              ) : (
                <>
                  <i className={`fa-solid ${activeTab === 'admin' ? 'fa-shield-halved' : 'fa-graduation-cap'}`}></i>
                  Enter Dashboard
                </>
              )}
            </button>
          </form>

          <button
            onClick={onBack}
            className="w-full mt-6 text-slate-500 font-bold text-sm hover:text-white transition-colors"
          >
            Return to Public Website
          </button>
        </div>
        <div className="mt-10 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-700">
            {activeTab === 'admin' ? 'Secure Enterprise Gateway v2.5' : 'Student Academic Portal v1.0'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
