import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { X, Send, CreditCard, IndianRupee, Loader2, FileText, CheckCircle2, ShieldCheck, AlertTriangle } from 'lucide-react';

const TransferModal = ({ isOpen, onClose, onSuccess, onError }) => {
  const { accounts, activeAccount, fetchUserAccounts } = useAuth();

  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeAccount) setFromAccount(activeAccount.accountNumber);
    else if (accounts.length > 0) setFromAccount(accounts[0].accountNumber);
  }, [activeAccount, accounts]);

  if (!isOpen) return null;

  const currentSenderObj = accounts.find(a => a.accountNumber === fromAccount);
  const senderBalance = currentSenderObj ? currentSenderObj.balance : 0;
  const amountNum = parseFloat(amount);
  const isOverdraft = !isNaN(amountNum) && amountNum > senderBalance;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const transferAmt = parseFloat(amount);
    if (isNaN(transferAmt) || transferAmt <= 0) { onError('Please enter a valid positive transfer amount.'); return; }
    if (!toAccount.trim()) { onError('Please enter a valid recipient account number.'); return; }
    if (fromAccount.trim().toUpperCase() === toAccount.trim().toUpperCase()) { onError('Cannot transfer to the same account.'); return; }
    if (transferAmt > senderBalance) { onError(`Insufficient funds. Available: ₹${senderBalance.toLocaleString('en-IN')}`); return; }
    setLoading(true);
    try {
      const res = await api.post('/transactions/transfer', {
        fromAccount: fromAccount.trim(),
        toAccount: toAccount.trim(),
        amount: transferAmt,
        description: description.trim() || 'Fund Transfer'
      });
      if (res.data.success) {
        await fetchUserAccounts();
        onSuccess(res.data.message || `₹${transferAmt.toLocaleString('en-IN')} transferred successfully!`);
        setToAccount(''); setAmount(''); setDescription('');
        onClose();
      }
    } catch (err) {
      onError(err.response?.data?.message || 'Transfer failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const quickAmounts = [500, 1000, 2000, 5000];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in bg-slate-900/40 backdrop-blur-md">
      <div className="w-full max-w-lg rounded-3xl shadow-2xl relative border border-slate-200 bg-white overflow-hidden">

        {/* Modal Header */}
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-xs">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">Fund Transfer</h3>
              <p className="text-xs text-slate-500">Secured by 256-bit TLS encryption</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security Badge */}
        <div className="mx-8 mt-5 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-700 font-semibold">
          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
          All transactions are processed atomically — 100% fail-safe.
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-5">

          {/* From Account */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Debit From Account</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <CreditCard className="w-4 h-4" />
              </div>
              <select
                aria-label="From Account"
                value={fromAccount}
                onChange={(e) => setFromAccount(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bank-input rounded-xl text-sm font-semibold focus:outline-none cursor-pointer"
              >
                {accounts.map((acc) => (
                  <option key={acc._id} value={acc.accountNumber}>
                    {acc.accountNumber} ({acc.accountType.toUpperCase()}) — Avail: ₹{acc.balance.toLocaleString('en-IN')}
                  </option>
                ))}
              </select>
            </div>
            {currentSenderObj && (
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 mt-2 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Available Balance: ₹{currentSenderObj.balance.toLocaleString('en-IN')}
              </div>
            )}
          </div>

          {/* To Account */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Credit To Account Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-600">
                <CreditCard className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={toAccount}
                onChange={(e) => setToAccount(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bank-input rounded-xl text-sm font-mono font-bold uppercase tracking-wider focus:outline-none"
                placeholder="e.g. ACC2000000002"
              />
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Transfer Amount (₹)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <IndianRupee className="w-4 h-4" />
              </div>
              <input
                type="number"
                min="1"
                step="any"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 bank-input rounded-xl text-base font-black focus:outline-none ${isOverdraft ? 'border-rose-300 focus:border-rose-500 bg-rose-50/50' : ''}`}
                placeholder="0.00"
              />
            </div>
            {isOverdraft && (
              <div className="flex items-center gap-1.5 text-[11px] text-rose-600 mt-1.5 font-bold">
                <AlertTriangle className="w-3.5 h-3.5" />
                Amount exceeds available balance
              </div>
            )}
            {/* Quick amount chips */}
            <div className="flex gap-2 flex-wrap mt-2">
              {quickAmounts.map(amt => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setAmount(String(amt))}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${amount === String(amt) ? 'bg-blue-600 border-blue-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'}`}
                >
                  ₹{amt.toLocaleString('en-IN')}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Payment Note / Reference</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <FileText className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bank-input rounded-xl text-xs font-medium focus:outline-none"
                placeholder="e.g. Rent, Freelance invoice, Dinner..."
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-3 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-colors">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || isOverdraft}
              className="lp-btn-primary flex-1 py-3 text-xs font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (<><Loader2 className="w-4 h-4 animate-spin" />Processing...</>) : (<><Send className="w-4 h-4" />Authorize Transfer</>)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransferModal;
