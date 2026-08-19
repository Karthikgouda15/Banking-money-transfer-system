import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('bank_auth_token') || null);
  const [accounts, setAccounts] = useState([]);
  const [activeAccount, setActiveAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch accounts for current user
  const fetchUserAccounts = useCallback(async () => {
    try {
      const response = await api.get('/accounts');
      if (response.data.success) {
        const fetchedAccounts = response.data.accounts || [];
        setAccounts(fetchedAccounts);
        
        // Preserve active account if existing, else select first
        setActiveAccount(prev => {
          if (!prev && fetchedAccounts.length > 0) return fetchedAccounts[0];
          if (prev) {
            const updated = fetchedAccounts.find(a => a.accountNumber === prev.accountNumber);
            return updated || fetchedAccounts[0] || null;
          }
          return null;
        });
      }
    } catch (error) {
      console.error('Failed to fetch accounts:', error);
    }
  }, []);

  // Initialize auth state on mount
  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const res = await api.get('/auth/me');
          if (res.data.success) {
            setUser(res.data.user);
            const userAccounts = res.data.accounts || [];
            setAccounts(userAccounts);
            if (userAccounts.length > 0) {
              setActiveAccount(userAccounts[0]);
            }
          } else {
            logout();
          }
        } catch (err) {
          console.error('Auth verification error:', err);
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [token]);

  // Login handler
  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.success) {
      const { token: jwtToken, user: userData, accounts: userAccounts } = response.data;
      localStorage.setItem('bank_auth_token', jwtToken);
      setToken(jwtToken);
      setUser(userData);
      setAccounts(userAccounts || []);
      if (userAccounts && userAccounts.length > 0) {
        setActiveAccount(userAccounts[0]);
      }
    }
    return response.data;
  };

  // Register handler
  const register = async (name, email, password, initialBalance) => {
    const response = await api.post('/auth/register', { name, email, password, initialBalance });
    if (response.data.success) {
      const { token: jwtToken, user: userData, account } = response.data;
      localStorage.setItem('bank_auth_token', jwtToken);
      setToken(jwtToken);
      setUser(userData);
      setAccounts([account]);
      setActiveAccount(account);
    }
    return response.data;
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem('bank_auth_token');
    setToken(null);
    setUser(null);
    setAccounts([]);
    setActiveAccount(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        accounts,
        activeAccount,
        setActiveAccount,
        loading,
        login,
        register,
        logout,
        fetchUserAccounts,
        setAccounts
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
