import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Landmark, User, Mail, Lock, IndianRupee, UserPlus, Loader2, ShieldCheck, ArrowLeft } from 'lucide-react';

const RegisterPage = ({ showToast }) => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [initialBalance, setInitialBalance] = useState('5000');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const amount = parseFloat(initialBalance);
      if (isNaN(amount) || amount < 0) { showToast('Please enter a valid starting balance.', 'error'); setLoading(false); return; }
      const res = await register(name, email, password, amount);
      if (res.success) {
        showToast('Account opened successfully! Welcome to Apex National Bank.', 'success');
        navigate('/dashboard');
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Registration failed. Please check inputs.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all";
  const labelClass = "block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2";

  return (
    <div className="min-h-screen bg-white flex">

      {/* ── Left Panel ── */}
      <div className="hidden lg:flex lg:w-5/12 flex-col justify-between p-12 relative overflow-hidden"
        style={{background: 'linear-gradient(160deg, #0a1628 0%, #0d2455 50%, #081730 100%)'}}>
        <div className="absolute inset-0 pointer-events-none"
          style={{backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(59,130,246,0.25) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(16,185,129,0.15) 0%, transparent 50%)'}} />
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-300/60 hover:text-blue-300 transition-colors mb-10">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-14">
            <div className="w-11 h-11 rounded-2xl lp-card-blue flex items-center justify-center shadow-lg">
              <Landmark className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-base font-extrabold text-white tracking-tight">Apex National Bank</span>
              <span className="block text-[9px] uppercase tracking-widest text-blue-300/60">Established 1982</span>
            </div>
          </div>
          <h1 className="text-3xl font-black text-white leading-tight mb-4">Your Financial<br />Future Starts Here.</h1>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
            Open a digital savings or checking account in minutes. No branch visit required. Fully secure and insured.
          </p>
        </div>
        <div className="relative z-10 space-y-3">
          {[
            { icon: '🏦', label: 'Zero Annual Maintenance Charges' },
            { icon: '💸', label: 'Instant Fund Transfers 24/7' },
            { icon: '📊', label: 'Real-Time Ledger & Analytics' },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
              <span className="text-base">{icon}</span>
              <span className="text-xs font-semibold text-slate-300">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right Registration Form ── */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 bg-slate-50">
        <div className="lg:hidden mb-6 text-center">
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
            <h2 className="text-2xl font-extrabold text-slate-800">Open a New Account</h2>
            <p className="text-sm text-slate-500 mt-1">Fill in the details to get started in minutes</p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-600 font-semibold mb-6">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            All data is encrypted. We do not share your information.
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={labelClass}>Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="e.g. John Doe" />
                </div>
              </div>
              <div>
                <label className={labelClass}>Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="name@example.com" />
                </div>
              </div>
              <div>
                <label className={labelClass}>Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} placeholder="Min. 6 characters" />
                </div>
              </div>
              <div>
                <label className={labelClass}>Opening Deposit Amount (₹)</label>
                <div className="relative">
                  <IndianRupee className="w-4 h-4 text-emerald-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input type="number" min="0" step="500" required value={initialBalance} onChange={(e) => setInitialBalance(e.target.value)} className={inputClass} placeholder="5000" />
                </div>
                <div className="flex gap-2 flex-wrap mt-2">
                  {[1000, 5000, 10000, 25000].map(amt => (
                    <button key={amt} type="button" onClick={() => setInitialBalance(String(amt))}
                      className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${initialBalance === String(amt) ? 'bg-blue-600 border-blue-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-blue-300'}`}>
                      ₹{amt.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="lp-btn-primary w-full py-3.5 rounded-xl text-sm font-extrabold flex items-center justify-center gap-2 mt-2"
                style={{background: 'linear-gradient(90deg, #059669 0%, #2563eb 100%)'}}>
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Opening Account...</> : <><UserPlus className="w-4 h-4" />Open My Bank Account</>}
              </button>
            </form>
            <p className="mt-5 text-center text-xs text-slate-400">
              Already a customer?{' '}
              <Link to="/login" className="font-bold text-blue-600 hover:text-blue-700 underline underline-offset-2">Sign In to Online Banking</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
