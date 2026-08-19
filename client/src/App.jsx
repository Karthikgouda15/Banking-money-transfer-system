import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import ToastNotification from './components/ToastNotification';
import TransferModal from './components/TransferModal';
import CreateAccountModal from './components/CreateAccountModal';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import LandingPage from './pages/LandingPage';

const AppContent = () => {
  const { user } = useAuth();
  const [toast, setToast] = useState(null);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [isNewAccountOpen, setIsNewAccountOpen] = useState(false);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4500);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#f0f5ff' }}>
      {user && (
        <Navbar
          onOpenTransfer={() => setIsTransferOpen(true)}
          onOpenNewAccount={() => setIsNewAccountOpen(true)}
        />
      )}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage showToast={showToast} />} />
          <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <RegisterPage showToast={showToast} />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage
                onOpenTransfer={() => setIsTransferOpen(true)}
                onOpenNewAccount={() => setIsNewAccountOpen(true)}
                showToast={showToast}
              />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to={user ? '/dashboard' : '/'} replace />} />
        </Routes>
      </main>

      <TransferModal isOpen={isTransferOpen} onClose={() => setIsTransferOpen(false)}
        onSuccess={(msg) => showToast(msg, 'success')} onError={(msg) => showToast(msg, 'error')} />
      <CreateAccountModal isOpen={isNewAccountOpen} onClose={() => setIsNewAccountOpen(false)}
        onSuccess={(msg) => showToast(msg, 'success')} onError={(msg) => showToast(msg, 'error')} />
      <ToastNotification toast={toast} onClose={() => setToast(null)} />
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  </BrowserRouter>
);

export default App;
