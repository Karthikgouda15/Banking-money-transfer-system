import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

const ToastNotification = ({ toast, onClose }) => {
  if (!toast) return null;
  const isSuccess = toast.type === 'success';
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-start gap-3.5 p-4.5 rounded-2xl shadow-2xl border transition-all transform animate-fade-in max-w-sm w-full bg-white ${
      isSuccess
        ? 'border-emerald-200 shadow-emerald-500/10'
        : 'border-rose-200 shadow-rose-500/10'
    }`}
    >
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
        isSuccess ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
      }`}>
        {isSuccess ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-extrabold text-sm text-slate-800 leading-tight">
          {isSuccess ? 'Transaction Successful' : 'Action Failed'}
        </h4>
        <p className="text-xs mt-1 text-slate-500 leading-relaxed">{toast.message}</p>
      </div>
      <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-lg hover:bg-slate-100 shrink-0">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ToastNotification;
