import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  ArrowUpRight, ArrowDownLeft, RefreshCw, Clock,
  CheckCircle, XCircle, ChevronLeft, ChevronRight,
  Search, SlidersHorizontal
} from 'lucide-react';

const TransactionHistory = ({ refreshTrigger }) => {
  const { activeAccount, accounts } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const endpoint = activeAccount
        ? `/accounts/${activeAccount.accountNumber}/transactions?page=${page}&limit=8`
        : `/transactions?page=${page}&limit=8`;
      const response = await api.get(endpoint);
      if (response.data.success) {
        setTransactions(response.data.transactions || []);
        if (response.data.pagination) setTotalPages(response.data.pagination.pages || 1);
      }
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    } finally {
      setLoading(false);
    }
  }, [activeAccount, page]);

  useEffect(() => { fetchTransactions(); }, [fetchTransactions, refreshTrigger]);

  const userAccountNumbers = accounts.map(a => a.accountNumber);

  const filteredTransactions = transactions.filter((tx) => {
    const isSent = userAccountNumbers.includes(tx.fromAccount);
    const isReceived = userAccountNumbers.includes(tx.toAccount);
    if (filterType === 'sent' && !isSent) return false;
    if (filterType === 'received' && !isReceived) return false;
    if (filterType === 'failed' && tx.status !== 'failed') return false;
    if (searchTerm.trim()) {
      const t = searchTerm.toLowerCase();
      return tx.fromAccount.toLowerCase().includes(t) || tx.toAccount.toLowerCase().includes(t)
        || (tx.description || '').toLowerCase().includes(t) || tx.amount.toString().includes(t);
    }
    return true;
  });

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  const filterTabs = [
    { key: 'all', label: 'All Activity' },
    { key: 'sent', label: 'Debits' },
    { key: 'received', label: 'Credits' },
    { key: 'failed', label: 'Failed' },
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm">

      {/* Section Header */}
      <div className="px-6 py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/60">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            Transaction Ledger
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {activeAccount ? `Account ${activeAccount.accountNumber}` : 'All Accounts'}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 bank-input rounded-xl text-xs focus:outline-none w-44"
            />
          </div>

          {/* Refresh */}
          <button onClick={fetchTransactions} title="Refresh"
            className="p-2 text-slate-500 hover:text-blue-600 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 transition-all">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-blue-600' : ''}`} />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-slate-100 overflow-x-auto px-4 bg-white">
        {filterTabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilterType(key)}
            className={`px-4 py-3 text-xs font-bold whitespace-nowrap transition-all border-b-2 ${
              filterType === key
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="py-20 text-center text-slate-400">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-blue-600 mb-3" />
            <p className="text-xs font-medium">Fetching transaction records...</p>
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="py-20 text-center">
            <SlidersHorizontal className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h4 className="text-sm font-bold text-slate-700">No Records Found</h4>
            <p className="text-xs text-slate-400 mt-1">
              {searchTerm ? 'No transactions matched your search.' : 'No transactions for the selected filter.'}
            </p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 bg-slate-50/50">
                <th className="py-3.5 px-6">Type</th>
                <th className="py-3.5 px-6">From Account</th>
                <th className="py-3.5 px-6">To Account</th>
                <th className="py-3.5 px-6">Reference</th>
                <th className="py-3.5 px-6">Date & Time</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredTransactions.map((tx) => {
                const isSent = userAccountNumbers.includes(tx.fromAccount);
                const isFailed = tx.status === 'failed';
                return (
                  <tr key={tx._id} className="hover:bg-blue-50/30 transition-colors">

                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                          isFailed ? 'bg-rose-50 text-rose-600'
                            : isSent ? 'bg-blue-50 text-blue-600'
                            : 'bg-emerald-50 text-emerald-600'
                        }`}>
                          {isFailed ? <XCircle className="w-4 h-4" />
                            : isSent ? <ArrowUpRight className="w-4 h-4" />
                            : <ArrowDownLeft className="w-4 h-4" />}
                        </div>
                        <span className="font-bold text-slate-800">
                          {isFailed ? 'Failed' : isSent ? 'Debit' : 'Credit'}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="font-mono font-bold text-slate-700">{tx.fromAccount}</span>
                      {tx.fromUserId?.name && <span className="block text-[10px] text-slate-400 font-sans mt-0.5">{tx.fromUserId.name}</span>}
                    </td>

                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="font-mono font-bold text-slate-700">{tx.toAccount}</span>
                      {tx.toUserId?.name && <span className="block text-[10px] text-slate-400 font-sans mt-0.5">{tx.toUserId.name}</span>}
                    </td>

                    <td className="py-4 px-6 max-w-[180px]">
                      <span className="text-slate-600 font-medium truncate block">{tx.description || 'Fund Transfer'}</span>
                      {tx.failureReason && <span className="text-[10px] text-rose-500 block mt-0.5 font-bold">{tx.failureReason}</span>}
                    </td>

                    <td className="py-4 px-6 whitespace-nowrap text-slate-500 font-medium">{formatDate(tx.timestamp)}</td>

                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                        isFailed ? 'bg-rose-50 text-rose-600 border border-rose-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {isFailed ? <XCircle className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                        {tx.status}
                      </span>
                    </td>

                    <td className={`py-4 px-6 text-right font-black whitespace-nowrap text-sm ${
                      isFailed ? 'text-slate-400 line-through' : isSent ? 'text-rose-600' : 'text-emerald-600'
                    }`}>
                      {!isFailed && (isSent ? '−' : '+')}₹{tx.amount.toLocaleString('en-IN')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 text-xs text-slate-500 bg-slate-50/50">
          <span>Page <strong className="text-slate-800">{page}</strong> of <strong className="text-slate-800">{totalPages}</strong></span>
          <div className="flex gap-2">
            <button disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))}
              className="p-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button disabled={page >= totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              className="p-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
