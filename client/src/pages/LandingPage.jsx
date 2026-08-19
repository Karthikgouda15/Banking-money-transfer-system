import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Landmark, ArrowRight, Shield, Zap, Globe, BarChart3,
  CreditCard, Bell, Send, Plus, TrendingUp, Lock,
  CheckCircle, Star, ChevronRight, Wallet, Users, RefreshCw,
  SlidersHorizontal, ShieldCheck, HelpCircle, PhoneCall,
  Calculator, Check, ChevronDown, Award, Building2, BadgePercent,
  Coins, FileCheck, ArrowUpRight, ArrowUp
} from 'lucide-react';

/* ── Floating Feature Card for Left-to-Right Animated Showcase ── */
const FeatureChip = ({ icon: Icon, title, desc, color, iconBg, className }) => (
  <div className={`lp-card rounded-2xl p-4 flex items-start gap-3.5 max-w-[250px] shadow-lg shadow-blue-900/5 hover:scale-105 transition-all duration-300 backdrop-blur-md bg-white/95 border border-blue-100 ${className}`}>
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${iconBg}`}>
      <Icon className={`w-5 h-5 ${color}`} />
    </div>
    <div>
      <p className="text-xs font-extrabold text-slate-900 leading-tight">{title}</p>
      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{desc}</p>
    </div>
  </div>
);

/* ── Live Phone Mockup with Shimmer ── */
const PhoneMockup = () => (
  <div className="relative w-64 sm:w-72 mx-auto animate-float-phone select-none">
    <div className="relative rounded-[44px] border-[7px] border-white shadow-2xl overflow-hidden bg-slate-50"
      style={{ boxShadow: '0 30px 70px -15px rgba(37,99,235,0.3), 0 0 0 1px rgba(226,232,240,0.8)' }}>

      {/* Status Bar */}
      <div className="bg-white px-6 pt-4 pb-2 flex items-center justify-between">
        <span className="text-[11px] font-bold text-slate-800">9:41 AM</span>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
          <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
          <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
        </div>
      </div>

      {/* Greeting Bar */}
      <div className="bg-white px-6 py-3 border-b border-slate-100 flex items-center justify-between">
        <div>
          <p className="text-[10px] text-slate-400 font-medium">Primary Account 👋</p>
          <p className="text-sm font-black text-slate-900">Alice Smith</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
          <Bell className="w-4 h-4 text-blue-600" />
        </div>
      </div>

      {/* Card */}
      <div className="mx-3.5 mt-3.5 rounded-2xl p-4.5 lp-card-blue animate-shimmer">
        <div className="flex items-center justify-between">
          <p className="text-[10px] text-blue-200 font-bold uppercase tracking-wider">SAVINGS BALANCE</p>
          <span className="text-[9px] bg-white/20 px-2 py-0.5 rounded-full text-white font-bold">7.25% p.a.</span>
        </div>
        <p className="text-2xl font-black text-white mt-1 tracking-tight">₹28,500.00</p>
        <p className="text-[10px] text-blue-100 mt-0.5 font-mono">ACC1000000001 · Active</p>
        <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-white/15">
          <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
            <TrendingUp className="w-2.5 h-2.5 text-white" />
          </div>
          <span className="text-[10px] text-blue-100 font-semibold">+₹1,420 interest earned</span>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-4 gap-2 px-4 py-4">
        {[
          { icon: Send, label: 'Transfer', bg: 'bg-blue-50', col: 'text-blue-600' },
          { icon: Plus, label: 'Deposit', bg: 'bg-emerald-50', col: 'text-emerald-600' },
          { icon: RefreshCw, label: 'Passbook', bg: 'bg-violet-50', col: 'text-violet-600' },
          { icon: BarChart3, label: 'Analytics', bg: 'bg-amber-50', col: 'text-amber-600' },
        ].map(({ icon: Icon, label, bg, col }) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shadow-xs`}>
              <Icon className={`w-4 h-4 ${col}`} />
            </div>
            <span className="text-[10px] font-semibold text-slate-600">{label}</span>
          </div>
        ))}
      </div>

      {/* Recent Ledger List */}
      <div className="px-4 pb-4 bg-white mx-3 mb-3 rounded-2xl border border-slate-100">
        <div className="flex items-center justify-between py-2 border-b border-slate-100">
          <p className="text-[10px] font-extrabold text-slate-700 uppercase tracking-wider">Recent Transactions</p>
          <span className="text-[10px] font-bold text-blue-600">View All</span>
        </div>
        {[
          { name: 'Bob Johnson (Transfer)', amount: '-₹2,500', color: 'text-rose-500', icon: '👤', bg: 'bg-rose-50' },
          { name: 'Monthly Interest Payout', amount: '+₹1,420', color: 'text-emerald-600', icon: '🏦', bg: 'bg-emerald-50' },
          { name: 'Charlie Brown (IMPS)', amount: '-₹1,000', color: 'text-rose-500', icon: '👤', bg: 'bg-rose-50' },
        ].map(({ name, amount, color, icon, bg }) => (
          <div key={name} className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-0">
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 ${bg} rounded-full flex items-center justify-center text-[10px]`}>{icon}</div>
              <span className="text-[10px] font-semibold text-slate-700 truncate max-w-[110px]">{name}</span>
            </div>
            <span className={`text-[10px] font-black font-mono ${color}`}>{amount}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ── Interactive Fixed Deposit & Savings Calculator ── */
const BankingCalculator = () => {
  const [depositAmount, setDepositAmount] = useState(100000);
  const [tenureYears, setTenureYears] = useState(3);
  const interestRate = 7.5; // 7.5% per annum

  // Compound Interest Formula: A = P(1 + r/n)^(nt), n=4 (quarterly compounding)
  const ratePerPeriod = interestRate / 100 / 4;
  const totalPeriods = tenureYears * 4;
  const maturityAmount = Math.round(depositAmount * Math.pow(1 + ratePerPeriod, totalPeriods));
  const interestEarned = maturityAmount - depositAmount;

  return (
    <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold mb-2">
            <Calculator className="w-3.5 h-3.5" /> High-Yield Return Estimator
          </div>
          <h3 className="text-2xl font-black text-slate-900">Fixed Deposit & Savings Growth Calculator</h3>
          <p className="text-xs text-slate-500 mt-1">Calculate guaranteed returns with quarterly compounding interest</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-2xl border border-emerald-200">
          <BadgePercent className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <p className="text-[10px] uppercase font-bold text-emerald-600">Current Fixed Rate</p>
            <p className="text-lg font-black leading-none">{interestRate}% p.a.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Inputs */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase text-slate-500">Deposit Amount</label>
              <span className="text-base font-black text-blue-600 font-mono">₹{depositAmount.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="10000"
              max="1000000"
              step="10000"
              value={depositAmount}
              onChange={(e) => setDepositAmount(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1">
              <span>₹10,000</span>
              <span>₹5,00,000</span>
              <span>₹10,00,000</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase text-slate-500">Investment Tenure</label>
              <span className="text-base font-black text-blue-600 font-mono">{tenureYears} {tenureYears === 1 ? 'Year' : 'Years'}</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1">
              <span>1 Year</span>
              <span>5 Years</span>
              <span>10 Years</span>
            </div>
          </div>

          <div className="flex gap-2">
            {[50000, 100000, 250000, 500000].map(amt => (
              <button
                key={amt}
                type="button"
                onClick={() => setDepositAmount(amt)}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  depositAmount === amt ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                ₹{(amt / 1000)}K
              </button>
            ))}
          </div>
        </div>

        {/* Right Output Box */}
        <div className="rounded-3xl p-6 bg-gradient-to-br from-slate-900 to-blue-950 text-white shadow-xl">
          <p className="text-xs text-blue-300 font-bold uppercase tracking-wider">Maturity Value at {tenureYears} Years</p>
          <p className="text-3xl sm:text-4xl font-black text-white mt-1 tracking-tight">
            ₹{maturityAmount.toLocaleString('en-IN')}
          </p>

          <div className="mt-6 pt-5 border-t border-slate-800 space-y-3 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Principal Deposit</span>
              <span className="font-bold text-slate-200">₹{depositAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Total Interest Earned</span>
              <span className="font-extrabold text-emerald-400">+₹{interestEarned.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Compounding Frequency</span>
              <span className="font-bold text-slate-200">Quarterly</span>
            </div>
          </div>

          <Link
            to="/register"
            className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition-colors"
          >
            Lock-In This Rate Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

/* ── FAQ Accordion ── */
const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden transition-all duration-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-4.5 flex items-center justify-between text-left hover:bg-slate-50/50 transition-colors"
      >
        <span className="text-sm font-bold text-slate-900">{question}</span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180 text-blue-600' : ''}`} />
      </button>
      {open && (
        <div className="px-6 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
          {answer}
        </div>
      )}
    </div>
  );
};

/* ── Main Landing Page with Easy & Smooth Scroll ── */
const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const smoothScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const bankingProducts = [
    {
      icon: Landmark,
      title: 'Digital Savings Account',
      tag: 'POPULAR',
      rate: 'Up to 7.25% p.a.',
      desc: 'Zero-maintenance instant digital savings account with free virtual debit card and monthly interest payouts.',
      features: ['Zero balance requirement', 'Free IMPS, NEFT & RTGS transfers', '256-bit secure netbanking', 'Instant digital passbook'],
      cta: 'Open Savings Account',
      badgeCol: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      icon: Building2,
      title: 'Corporate Current Account',
      tag: 'BUSINESS',
      rate: 'Zero Fee IMPS/RTGS',
      desc: 'Engineered for enterprises, startups, and traders with high daily transaction limits and automated reconciliations.',
      features: ['Unlimited daily transactions', 'Bulk salary & vendor payout APIs', 'Multi-user permission levels', 'Dedicated relationship manager'],
      cta: 'Open Business Account',
      badgeCol: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      icon: Coins,
      title: 'Fixed & Recurring Deposit',
      tag: 'GUARANTEED',
      rate: 'Up to 8.10% p.a. (Senior)',
      desc: 'Lock in guaranteed high returns with flexible tenures from 7 days to 10 years with premature liquidity options.',
      features: ['Quarterly compounding returns', 'Loan against FD up to 90%', 'Auto-renewal facility', 'DICGC insured deposits'],
      cta: 'Book Fixed Deposit',
      badgeCol: 'bg-violet-50 text-violet-700 border-violet-200'
    }
  ];

  const securityBadges = [
    { icon: ShieldCheck, title: 'DICGC Deposit Insured', desc: 'Each depositor is insured up to ₹5,00,000 by RBI subsidiary DICGC.' },
    { icon: Lock, title: '256-Bit Bank Encryption', desc: 'Enterprise-grade TLS 1.3 encryption protecting every data byte.' },
    { icon: Award, title: 'ISO 27001 Certified', desc: 'Globally benchmarked security compliance across all data centers.' },
    { icon: Zap, title: 'Atomic Transaction Engine', desc: 'Zero partial transfers: transactions either succeed fully or roll back cleanly.' }
  ];

  const faqs = [
    {
      question: 'How fast can I open a digital bank account?',
      answer: 'You can open a verified digital savings or checking account in under 60 seconds. Simply provide your basic details and an opening deposit amount to receive your account number immediately.'
    },
    {
      question: 'Are online fund transfers completely free?',
      answer: 'Yes! All internal transfers between Apex National Bank accounts, as well as IMPS, NEFT, and RTGS transfers are 100% free with zero hidden surcharges.'
    },
    {
      question: 'Is my money insured and safe with Apex National Bank?',
      answer: 'Yes. Every deposit is backed by strict RBI regulatory compliance and insured up to ₹5,00,000 per depositor under the Deposit Insurance and Credit Guarantee Corporation (DICGC).'
    },
    {
      question: 'Can I have multiple bank accounts under one profile?',
      answer: 'Absolutely. You can open and manage multiple accounts (Savings, Checking, and Business) under your single profile and switch between them instantly in your dashboard.'
    },
    {
      question: 'What happens if a transfer fails due to network or server issues?',
      answer: 'Our banking backend uses atomic multi-document MongoDB transactions. If any step fails or times out, the entire transaction is rolled back cleanly with zero balance loss.'
    }
  ];

  return (
    <div id="top" className="min-h-screen bg-[#f8fbff] text-slate-900 font-sans overflow-x-hidden">

      {/* ── Top Regulatory Ticker Banner ── */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1.5 px-4 text-center font-medium border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>RBI Licensed & DICGC Insured Bank · Est. 1982</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-slate-400">
            <span>24x7 Customer Support: <strong className="text-white">1800-889-APEX</strong></span>
            <span>·</span>
            <span>Net Banking: <strong className="text-emerald-400">Operational</strong></span>
          </div>
        </div>
      </div>

      {/* ── Top Sticky Navigation Bar with Smooth Scroll Anchors ── */}
      <nav className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-slate-200/80' : 'bg-white/80 backdrop-blur-md border-b border-slate-100'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <div onClick={scrollToTop} className="flex items-center gap-3 cursor-pointer">
            <div className="w-11 h-11 rounded-2xl lp-card-blue flex items-center justify-center shadow-lg shadow-blue-600/30">
              <Landmark className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-lg font-black text-slate-900 tracking-tight">Apex National Bank</span>
              <span className="block text-[10px] uppercase tracking-widest text-blue-600 font-bold leading-none">Established 1982</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-bold text-slate-600 uppercase tracking-wider">
            <button onClick={() => smoothScrollTo('accounts')} className="hover:text-blue-600 transition-colors cursor-pointer">
              Bank Accounts
            </button>
            <button onClick={() => smoothScrollTo('calculator')} className="hover:text-blue-600 transition-colors cursor-pointer">
              Interest Calculator
            </button>
            <button onClick={() => smoothScrollTo('security')} className="hover:text-blue-600 transition-colors cursor-pointer">
              Security & Trust
            </button>
            <button onClick={() => smoothScrollTo('faqs')} className="hover:text-blue-600 transition-colors cursor-pointer">
              Help Center
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login" className="lp-btn-outline rounded-xl px-5 py-2.5 text-xs font-extrabold">
              Sign In
            </Link>
            <Link to="/register" className="lp-btn-primary rounded-xl px-5 py-2.5 text-xs font-extrabold flex items-center gap-1.5">
              Open Account <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero Showcase Section with Left-to-Right Float Animation ── */}
      <section className="relative overflow-hidden pt-16 pb-20 px-6">
        {/* Ambient Blue Glowing Orbs that glide across */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-blue-500/10 blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-10 left-1/6 w-[500px] h-[500px] rounded-full bg-emerald-500/8 blur-3xl pointer-events-none" />

        {/* Hero Title & Intro */}
        <div className="relative z-10 text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-extrabold mb-6 shadow-xs animate-fade-in">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            INDIA'S TRUSTED DIGITAL BANKING NETWORK · 2M+ SATISFIED ACCOUNTS
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.08] tracking-tight animate-fade-in">
            <span className="text-transparent bg-clip-text" style={{backgroundImage: 'linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%)'}}>
              SMART SECURE PAYMENT
            </span>
            <br />
            SOLUTIONS FOR GROWTH
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed animate-fade-in">
            Instant online money transfers, 7.25% high-yield savings accounts, real-time ledgers, and bank-grade 256-bit encryption.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <Link to="/register"
              className="lp-btn-primary rounded-2xl px-8 py-4 text-sm font-black flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 hover:scale-105 transition-transform">
              Open Zero-Balance Account <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => smoothScrollTo('calculator')}
              className="lp-btn-outline rounded-2xl px-8 py-4 text-sm font-black flex items-center justify-center gap-2 cursor-pointer"
            >
              Calculate Interest Returns <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-6 text-xs font-bold text-slate-500 flex-wrap">
            <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald-600" /> Instant Account Number</span>
            <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald-600" /> 0% Transaction Fees</span>
            <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald-600" /> ₹5,00,000 DICGC Cover</span>
          </div>
        </div>

        {/* ── Interactive Showcase Area with Left-to-Right Float & Flow ── */}
        <div className="relative z-10 w-full max-w-6xl mx-auto mt-6">
          <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">

            {/* Left Feature Column (Gliding Left-to-Right) */}
            <div className="w-full lg:w-72 flex flex-col sm:flex-row lg:flex-col gap-5 items-center lg:items-end animate-glide-lr">
              <FeatureChip
                icon={Globe}
                title="Instant Cross-Border Payments"
                desc="Allow businesses to process international & domestic transactions with near-instant settlement times."
                color="text-blue-600"
                iconBg="bg-blue-50"
                className="w-full"
              />
              <FeatureChip
                icon={ShieldCheck}
                title="AI-Powered Fraud Prevention"
                desc="Detect and prevent fraudulent transactions in real-time, ensuring security without compromising speed."
                color="text-emerald-600"
                iconBg="bg-emerald-50"
                className="w-full"
              />
            </div>

            {/* Center Phone Mockup (Gentle 3D Float) */}
            <div className="relative shrink-0 my-4 lg:my-0">
              <div className="absolute -inset-6 rounded-full bg-blue-500/20 blur-2xl pointer-events-none" />
              <PhoneMockup />
            </div>

            {/* Right Feature Column (Gliding In Harmonic Counter-Movement) */}
            <div className="w-full lg:w-72 flex flex-col sm:flex-row lg:flex-col gap-5 items-center lg:items-start animate-glide-rl">
              <FeatureChip
                icon={SlidersHorizontal}
                title="Customizable Payment Dashboard"
                desc="Fully customizable dashboard to monitor transactions, manage multiple accounts, and generate reports."
                color="text-violet-600"
                iconBg="bg-violet-50"
                className="w-full"
              />
              <FeatureChip
                icon={CreditCard}
                title="Subscription Billing Automation"
                desc="Automated tool for businesses to manage recurring transfers, utility bills, and salary disbursements."
                color="text-amber-600"
                iconBg="bg-amber-50"
                className="w-full"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ── Key Banking Statistics Bar ── */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <p className="text-3xl sm:text-4xl font-black text-blue-600">₹80,000 Cr+</p>
              <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">Total Volume Processed</p>
            </div>
            <div className="text-center p-4">
              <p className="text-3xl sm:text-4xl font-black text-slate-900">2,400,000+</p>
              <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">Active Customers</p>
            </div>
            <div className="text-center p-4">
              <p className="text-3xl sm:text-4xl font-black text-emerald-600">99.999%</p>
              <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">System Uptime SLA</p>
            </div>
            <div className="text-center p-4">
              <p className="text-3xl sm:text-4xl font-black text-violet-600">&lt; 1 Sec</p>
              <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">Instant Settlement Speed</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Banking Products Section ── */}
      <section id="accounts" className="py-24 bg-[#f8fbff] scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-extrabold mb-3 border border-blue-200/60">
              <Wallet className="w-4 h-4" /> TAILORED BANKING ACCOUNTS
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
              Designed for Individuals &<br />
              <span className="text-transparent bg-clip-text" style={{backgroundImage: 'linear-gradient(90deg, #1d4ed8, #3b82f6)'}}>
                Growing Enterprises
              </span>
            </h2>
            <p className="mt-4 text-slate-600 max-w-xl mx-auto text-base">
              Choose the account that fits your financial ambitions. Open in 60 seconds with no branch visit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bankingProducts.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-xs">
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border ${p.badgeCol}`}>
                        {p.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-slate-900">{p.title}</h3>
                    <div className="my-3 text-sm font-extrabold text-blue-600 bg-blue-50/70 px-3 py-1.5 rounded-xl w-fit">
                      {p.rate}
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed mb-6">{p.desc}</p>

                    <div className="space-y-2.5 pt-4 border-t border-slate-100 mb-8">
                      {p.features.map(f => (
                        <div key={f} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    to="/register"
                    className="w-full py-3.5 rounded-xl font-black text-xs text-center border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    {p.cta} <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Interactive Calculator Section ── */}
      <section id="calculator" className="py-20 bg-white border-y border-slate-200 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6">
          <BankingCalculator />
        </div>
      </section>

      {/* ── Security & Institutional Trust ── */}
      <section id="security" className="py-24 bg-[#f8fbff] scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-xs font-extrabold mb-3 border border-emerald-200">
              <ShieldCheck className="w-4 h-4" /> BANK-GRADE ARCHITECTURE
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
              Uncompromising Safety for Your Capital
            </h2>
            <p className="mt-4 text-slate-600 max-w-xl mx-auto text-base">
              Your deposits and transaction integrity are defended by state-of-the-art encryption and regulatory insurance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityBadges.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4 shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-black text-slate-900 mb-2">{b.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Frequently Asked Questions ── */}
      <section id="faqs" className="py-20 bg-white border-t border-slate-200 scroll-mt-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-xs font-extrabold mb-3">
              <HelpCircle className="w-4 h-4" /> FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Everything You Need to Know
            </h2>
            <p className="text-xs text-slate-500 mt-2">Have a question? We're here to help.</p>
          </div>

          <div className="space-y-3">
            {faqs.map(f => (
              <FAQItem key={f.question} question={f.question} answer={f.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Final Call To Action Banner ── */}
      <section className="py-20 bg-[#f8fbff]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="rounded-3xl overflow-hidden relative p-10 sm:p-14"
            style={{
              background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #3b82f6 100%)',
              boxShadow: '0 25px 60px -15px rgba(29,78,216,0.4)'
            }}>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold mb-4 backdrop-blur-sm">
                  <Star className="w-3.5 h-3.5 text-amber-300" /> Free Zero-Balance Account Opening
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                  Experience Banking Built for<br />the Next Generation.
                </h2>
                <p className="text-blue-100 mt-3 max-w-md text-sm leading-relaxed">
                  Open your account in under 60 seconds. Instant transfers, guaranteed high returns, and full peace of mind.
                </p>
              </div>
              <div className="flex flex-col gap-3 shrink-0">
                <Link to="/register"
                  className="bg-white text-blue-700 font-black px-8 py-4 rounded-2xl text-sm flex items-center gap-2 shadow-xl hover:scale-105 transition-transform">
                  Open Free Account <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/login" className="text-center text-blue-100 text-xs font-bold hover:text-white transition-colors">
                  Already a customer? Sign in →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Institutional Banking Footer ── */}
      <footer className="border-t border-slate-200 bg-white py-14">
        <div className="max-w-6xl mx-auto px-6 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Column 1: Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl lp-card-blue flex items-center justify-center">
                  <Landmark className="w-5 h-5 text-white" />
                </div>
                <span className="text-base font-black text-slate-900">Apex National Bank</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Licensed Scheduled Commercial Bank regulated under the Banking Regulation Act, 1949. All customer deposits insured up to ₹5,00,000 by DICGC.
              </p>
            </div>

            {/* Column 2: Accounts */}
            <div>
              <p className="text-xs font-black text-slate-900 uppercase tracking-wider mb-4">Accounts & Deposits</p>
              <ul className="space-y-2 text-xs text-slate-500">
                <li><button onClick={() => smoothScrollTo('accounts')} className="hover:text-blue-600 transition-colors text-left">Digital Savings Account</button></li>
                <li><button onClick={() => smoothScrollTo('accounts')} className="hover:text-blue-600 transition-colors text-left">Corporate Current Account</button></li>
                <li><button onClick={() => smoothScrollTo('calculator')} className="hover:text-blue-600 transition-colors text-left">Fixed Deposits (7.5% p.a.)</button></li>
                <li><button onClick={() => smoothScrollTo('calculator')} className="hover:text-blue-600 transition-colors text-left">Recurring Deposits</button></li>
              </ul>
            </div>

            {/* Column 3: Transfers & Tech */}
            <div>
              <p className="text-xs font-black text-slate-900 uppercase tracking-wider mb-4">Transfer Network</p>
              <ul className="space-y-2 text-xs text-slate-500">
                <li><Link to="/login" className="hover:text-blue-600 transition-colors">IMPS Instant Transfer</Link></li>
                <li><Link to="/login" className="hover:text-blue-600 transition-colors">NEFT / RTGS Network</Link></li>
                <li><Link to="/login" className="hover:text-blue-600 transition-colors">Real-Time Passbook</Link></li>
                <li><Link to="/login" className="hover:text-blue-600 transition-colors">Multi-Account Management</Link></li>
              </ul>
            </div>

            {/* Column 4: Regulatory & Support */}
            <div>
              <p className="text-xs font-black text-slate-900 uppercase tracking-wider mb-4">24x7 Helpline</p>
              <div className="space-y-2 text-xs text-slate-500">
                <p className="font-bold text-slate-800">Toll Free: 1800-889-APEX</p>
                <p>Email: support@apexbank.com</p>
                <p>CIN: L65110MH1982PLC028741</p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    All Core Systems Normal
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>© 2026 Apex National Bank Limited. All Rights Reserved.</p>
            <div className="flex items-center gap-6">
              <span className="hover:text-slate-600 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-slate-600 cursor-pointer">Terms of Service</span>
              <span className="hover:text-slate-600 cursor-pointer">RBI Disclosures</span>
              <span className="hover:text-slate-600 cursor-pointer">Security Practices</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Floating Smooth "Back to Top" Button ── */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          title="Scroll to Top"
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-600/30 hover:bg-blue-500 hover:scale-110 active:scale-95 transition-all duration-300 animate-fade-in border border-blue-400 cursor-pointer"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

    </div>
  );
};

export default LandingPage;
