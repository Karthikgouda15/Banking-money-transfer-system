import React, { useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { X, PlusCircle, IndianRupee, Loader2 } from 'lucide-react';

const CreateAccountModal = ({ isOpen, onClose, onSuccess, onError }) => {
  const { fetchUserAccounts } = useAuth();
  const [accountType, setAccountType] = useState('savings');
  const [initialBalance, setInitialBalance] = useState('2000');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const amount = parseFloat(initialBalance);
      if (isNaN(amount) || amount < 0) { onError('Please enter a valid initial balance (₹0 or more).'); setLoading(false); return; }
      const res = await api.post('/accounts', { accountType, initialBalance: amount });
      if (res.data.success) {
        await fetchUserAccounts();
        onSuccess(`New ${accountType} account ${res.data.account.accountNumber} opened successfully!`);
        onClose();
      }
    } catch (err) {
      onError(err.response?.data?.message || 'Failed to create bank account.');
    } finally {
      setLoading(false);
    }
  };

  const accountTypes = [
    { value: 'savings', label: 'Savings', desc: 'Earn interest on balance with zero maintenance', icon: '🏦' },
    { value: 'checking', label: 'Checking', desc: 'Unlimited everyday digital transactions', icon: '💳' },
    { value: 'business', label: 'Business', desc: 'Corporate high-volume transfers & billing', icon: '🏢' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in bg-slate-900/40 backdrop-blur-md">
      <div className="w-full max-w-md rounded-3xl shadow-2xl relative border border-slate-200 bg-white overflow-hidden">

        {/* Modal Header */}
        <div className="px-7 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-xs">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">Open a New Account</h3>
              <p className="text-xs text-slate-500">Select account type and opening deposit</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-7 py-6 space-y-5">

          {/* Account Type Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Account Type</label>
            <div className="space-y-2">
              {accountTypes.map(({ value, label, desc, icon }) => (
                <button
                  type="button"
                  key={value}
                  onClick={() => setAccountType(value)}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl border text-left transition-all ${
                    accountType === value
                      ? 'bg-blue-50/60 border-blue-500 shadow-sm shadow-blue-500/10'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="text-2xl">{icon}</span>
                  <div>
                    <p className="text-sm font-bold text-slate-800 capitalize">{label} Account</p>
                    <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                  </div>
                  <div className={`ml-auto w-4 h-4 rounded-full border-2 shrink-0 ${accountType === value ? 'bg-blue-600 border-blue-600' : 'border-slate-300'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Initial Balance */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Opening Deposit (₹)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-600">
                <IndianRupee className="w-4 h-4" />
              </div>
              <input
                type="number"
                min="0"
                step="100"
                required
                value={initialBalance}
                onChange={(e) => setInitialBalance(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bank-input rounded-xl text-sm font-bold focus:outline-none"
                placeholder="e.g. 5000"
              />
            </div>
            <div className="flex gap-2 flex-wrap mt-2">
              {[500, 1000, 5000, 10000].map(amt => (
                <button key={amt} type="button" onClick={() => setInitialBalance(String(amt))}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${initialBalance === String(amt) ? 'bg-blue-600 border-blue-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'}`}>
                  ₹{amt.toLocaleString('en-IN')}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-3 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-colors">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="lp-btn-primary flex-1 py-3 text-xs font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {loading ? (<><Loader2 className="w-4 h-4 animate-spin" />Opening...</>) : (<><PlusCircle className="w-4 h-4" />Open Account</>)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccountModal;
