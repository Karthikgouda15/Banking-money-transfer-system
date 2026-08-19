import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import TransactionHistory from '../components/TransactionHistory';
import {
  Wallet,
  Send,
  PlusCircle,
  Copy,
  Check,
  CreditCard,
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  RefreshCw,
  Building2,
  ArrowUpRight
} from 'lucide-react';

const DashboardPage = ({ onOpenTransfer, onOpenNewAccount, showToast }) => {
  const { user, accounts, activeAccount, setActiveAccount, fetchUserAccounts } = useAuth();
  const [copied, setCopied] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [txRefreshTrigger, setTxRefreshTrigger] = useState(0);

  const totalBalance = accounts.reduce((acc, curr) => acc + (curr.balance || 0), 0);

  const handleCopyAccountNum = () => {
    if (activeAccount?.accountNumber) {
      navigator.clipboard.writeText(activeAccount.accountNumber);
      setCopied(true);
      showToast(`Account number ${activeAccount.accountNumber} copied!`, 'success');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleManualRefresh = async () => {
    setRefreshing(true);
    await fetchUserAccounts();
    setTxRefreshTrigger(prev => prev + 1);
    showToast('Balances and transactions refreshed!', 'success');
    setRefreshing(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">

      {/* Welcome Header Banner */}
      <div className="rounded-3xl p-6 sm:p-8 relative overflow-hidden lp-card-blue shadow-xl">
        <div className="absolute right-0 top-0 w-96 h-full opacity-15 pointer-events-none"
          style={{background: 'radial-gradient(ellipse at top right, rgba(255,255,255,0.8) 0%, transparent 70%)'}} />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-white text-xs font-bold mb-3 tracking-wide backdrop-blur-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              VERIFIED CUSTOMER ACCOUNT
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Good day, {user?.name?.split(' ')[0] || 'Customer'}!
            </h2>
            <p className="text-sm text-blue-100 mt-1 max-w-xl">
              Welcome to your Apex National Bank dashboard. Monitor balances and transfer funds securely.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleManualRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-white/15 hover:bg-white/25 border border-white/20 rounded-xl transition-all shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>

            <button
              onClick={onOpenTransfer}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-black text-blue-700 bg-white rounded-xl shadow-lg hover:bg-blue-50 transition-all transform hover:scale-[1.02]"
            >
              <Send className="w-4 h-4" />
              Initiate Transfer
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">

        {/* Total Balance */}
        <div className="col-span-1 sm:col-span-2 rounded-3xl p-6 bank-card relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">Total Portfolio Balance</span>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            ₹{totalBalance.toLocaleString('en-IN')}
          </div>
          <div className="flex items-center gap-2 mt-3 text-xs text-emerald-600 font-bold">
            <TrendingUp className="w-4 h-4" />
            <span>{accounts.length} {accounts.length === 1 ? 'Account' : 'Accounts'} Active</span>
          </div>
        </div>

        {/* Active Account Card */}
        <div className="col-span-1 sm:col-span-2 rounded-3xl p-6 bank-card relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">Active Account Balance</span>
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              {activeAccount?.accountType || 'SAVINGS'}
            </span>
          </div>
          <div className="text-3xl font-black text-emerald-600 tracking-tight">
            ₹{(activeAccount?.balance || 0).toLocaleString('en-IN')}
          </div>
          {activeAccount && (
            <button
              onClick={handleCopyAccountNum}
              className="flex items-center gap-2 mt-3 px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors w-fit"
              title="Copy Account Number"
            >
              <span>{activeAccount.accountNumber}</span>
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>

        {/* Quick Action Cards */}
        <div
          onClick={onOpenTransfer}
          className="col-span-1 rounded-3xl p-5 border border-blue-200 cursor-pointer hover:scale-[1.02] transition-all group bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-md shadow-blue-600/20"
        >
          <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white mb-4">
            <Send className="w-5 h-5" />
          </div>
          <p className="text-sm font-black">Transfer Money</p>
          <p className="text-xs text-blue-100 mt-0.5">Instant peer transfer</p>
          <ArrowUpRight className="w-4 h-4 text-white/70 mt-3 group-hover:text-white transition-colors" />
        </div>

        <div
          onClick={onOpenNewAccount}
          className="col-span-1 rounded-3xl p-5 bank-card cursor-pointer hover:scale-[1.02] transition-all group"
        >
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
            <PlusCircle className="w-5 h-5" />
          </div>
          <p className="text-sm font-black text-slate-800">Open Account</p>
          <p className="text-xs text-slate-400 mt-0.5">New savings/checking</p>
          <ArrowUpRight className="w-4 h-4 text-slate-400 mt-3 group-hover:text-blue-600 transition-colors" />
        </div>

        <div className="col-span-1 rounded-3xl p-5 bank-card">
          <div className="w-10 h-10 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600 mb-4">
            <Building2 className="w-5 h-5" />
          </div>
          <p className="text-sm font-black text-slate-800">Total Accounts</p>
          <p className="text-3xl font-black text-violet-600 mt-1">{accounts.length}</p>
        </div>

        <div className="col-span-1 rounded-3xl p-5 bank-card">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 mb-4">
            <TrendingDown className="w-5 h-5" />
          </div>
          <p className="text-sm font-black text-slate-800">Account Status</p>
          <div className="flex items-center gap-1.5 mt-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-xs font-bold text-emerald-600">Active & Verified</p>
          </div>
        </div>
      </div>

      {/* All Accounts Switcher Grid (shown if user has more than 1 account) */}
      {accounts.length > 1 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-blue-600" />
              My Bank Accounts ({accounts.length})
            </h3>
            <span className="text-xs text-slate-400">Click any account to switch</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {accounts.map((acc) => {
              const isActive = activeAccount?.accountNumber === acc.accountNumber;
              return (
                <div
                  key={acc._id}
                  onClick={() => setActiveAccount(acc)}
                  className={`p-5 rounded-3xl cursor-pointer transition-all border ${
                    isActive
                      ? 'border-blue-600 bg-blue-50/50 shadow-md shadow-blue-600/10'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-slate-500">{acc.accountNumber}</span>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {acc.accountType}
                    </span>
                  </div>
                  <div className="text-xl font-black text-slate-900">
                    ₹{acc.balance.toLocaleString('en-IN')}
                  </div>
                  {isActive && (
                    <div className="flex items-center gap-1.5 mt-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">Selected Account</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Transaction History Table */}
      <TransactionHistory refreshTrigger={txRefreshTrigger} />
    </div>
  );
};

export default DashboardPage;
