import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Landmark, LogOut, PlusCircle, CreditCard, ShieldCheck, User, Send } from 'lucide-react';

const Navbar = ({ onOpenTransfer, onOpenNewAccount }) => {
  const { user, accounts, activeAccount, setActiveAccount, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-white/95 border-b border-slate-200 backdrop-blur-xl shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Security Badge */}
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-2xl lp-card-blue flex items-center justify-center shadow-lg shadow-blue-600/30">
            <Landmark className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                Apex National Bank
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                <ShieldCheck className="w-3 h-3 text-emerald-600" /> Secure
              </span>
            </div>
            <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400">
              Online Banking & Transfer Network
            </span>
          </div>
        </div>

        {/* Center & Right Controls */}
        {user && (
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Account Switcher Dropdown */}
            {accounts.length > 0 && (
              <div className="relative hidden md:block">
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 shadow-xs">
                  <CreditCard className="w-4 h-4 text-blue-600 mr-2 shrink-0" />
                  <select
                    aria-label="Select Account"
                    className="bg-transparent text-slate-800 font-semibold focus:outline-none cursor-pointer pr-4"
                    value={activeAccount?.accountNumber || ''}
                    onChange={(e) => {
                      const selected = accounts.find(a => a.accountNumber === e.target.value);
                      if (selected) setActiveAccount(selected);
                    }}
                  >
                    {accounts.map(acc => (
                      <option key={acc._id} value={acc.accountNumber} className="bg-white text-slate-800">
                        {acc.accountNumber} ({acc.accountType.toUpperCase()}) — ₹{acc.balance.toLocaleString('en-IN')}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <button
              onClick={onOpenNewAccount}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-all shadow-xs"
            >
              <PlusCircle className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">New Account</span>
            </button>

            <button
              onClick={onOpenTransfer}
              className="lp-btn-primary flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl shadow-lg shadow-blue-600/25 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Transfer Money</span>
            </button>

            {/* User Profile Pill */}
            <div className="h-8 w-px bg-slate-200 mx-1 hidden sm:block"></div>

            <div className="flex items-center gap-2 pl-1">
              <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-extrabold text-sm shadow-xs">
                {user.name ? user.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
              </div>
              <div className="hidden lg:block text-left text-xs">
                <p className="font-bold text-slate-800 leading-none">{user.name}</p>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-none">{user.email}</p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              title="Logout"
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
            >
              <LogOut className="w-5 h-5" />
            </button>

          </div>
        )}

      </div>
    </header>
  );
};

export default Navbar;
