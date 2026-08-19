import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Landmark, Mail, Lock, LogIn, Loader2, Sparkles, UserCheck, ShieldCheck, ArrowLeft } from 'lucide-react';

const LoginPage = ({ showToast }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(email, password);
      if (res.success) {
        showToast('Login successful! Welcome back.', 'success');
        navigate('/dashboard');
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Login failed. Please check your credentials.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('Password123!');
    showToast(`Demo credentials loaded for ${demoEmail}`, 'success');
  };

  return (
    <div className="min-h-screen bg-white flex">

      {/* ── Left Branding Panel ── */}
      <div className="hidden lg:flex lg:w-5/12 flex-col justify-between p-12 relative overflow-hidden"
        style={{background: 'linear-gradient(160deg, #0a1628 0%, #0d2455 50%, #081730 100%)'}}>
        <div className="absolute inset-0 pointer-events-none"
          style={{backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(59,130,246,0.25) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(16,185,129,0.15) 0%, transparent 50%)'}} />

        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-300/60 hover:text-blue-300 transition-colors mb-10">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-14">
            <div className="w-11 h-11 rounded-2xl lp-card-blue flex items-center justify-center shadow-lg shadow-blue-900/50">
              <Landmark className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-base font-extrabold text-white tracking-tight">Apex National Bank</span>
              <span className="block text-[9px] uppercase tracking-widest text-blue-300/60">Established 1982</span>
            </div>
          </div>
          <h1 className="text-3xl font-black text-white leading-tight mb-4">Secure. Reliable.<br />Always Yours.</h1>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
            Experience world-class digital banking with instant transfers, real-time balance monitoring, and 256-bit encrypted transactions.
          </p>
        </div>

        <div className="relative z-10 space-y-3">
          {[
            { icon: '🔐', label: 'Bank-Grade AES-256 Encryption' },
            { icon: '⚡', label: 'Instant Money Transfers 24/7' },
            { icon: '🏛️', label: 'RBI Compliant & FDIC Insured' },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
              <span className="text-base">{icon}</span>
              <span className="text-xs font-semibold text-slate-300">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right Login Panel ── */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 bg-slate-50">
        <div className="lg:hidden mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-500 hover:text-blue-600 mb-4">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <div className="flex items-center justify-center gap-2.5">
            <div className="w-10 h-10 rounded-xl lp-card-blue flex items-center justify-center">
              <Landmark className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-extrabold text-slate-800">Apex National Bank</span>
          </div>
        </div>

        <div className="w-full max-w-md">
          <div className="mb-7">
            <h2 className="text-2xl font-extrabold text-slate-800">Sign In to Online Banking</h2>
            <p className="text-sm text-slate-500 mt-1">Enter your credentials to access your accounts</p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-600 font-semibold mb-6">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            Your connection is secured with 256-bit TLS encryption
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                    placeholder="name@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                    placeholder="••••••••" />
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="lp-btn-primary w-full py-3.5 rounded-xl text-sm font-extrabold flex items-center justify-center gap-2">
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Verifying...</> : <><LogIn className="w-4 h-4" />Sign In Securely</>}
              </button>
            </form>

            {/* Quick Demo */}
            <div className="mt-7 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Quick Access — Demo Test Accounts:
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: 'Alice', email: 'alice@bank.com', balance: '₹15,000', color: 'bg-blue-50 border-blue-200 hover:border-blue-400 text-blue-700' },
                  { name: 'Bob', email: 'bob@bank.com', balance: '₹8,500', color: 'bg-emerald-50 border-emerald-200 hover:border-emerald-400 text-emerald-700' },
                  { name: 'Charlie', email: 'charlie@bank.com', balance: '₹2,000', color: 'bg-violet-50 border-violet-200 hover:border-violet-400 text-violet-700' },
                ].map(({ name, email: d, balance, color }) => (
                  <button key={name} type="button" onClick={() => fillDemo(d)}
                    className={`p-2.5 rounded-xl border transition-all text-center ${color}`}>
                    <UserCheck className="w-3.5 h-3.5 mx-auto mb-1 opacity-80" />
                    <span className="font-bold block text-[11px]">{name}</span>
                    <span className="text-[10px] text-slate-400">{balance}</span>
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-5 text-center text-xs text-slate-400">
              New customer?{' '}
              <Link to="/register" className="font-bold text-blue-600 hover:text-blue-700 underline underline-offset-2">Open a Bank Account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
