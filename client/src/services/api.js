import axios from 'axios';

// Use environment variable if provided, otherwise default to the live Render backend API
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD
    ? 'https://banking-money-transfer-system-0tyj.onrender.com/api'
    : '/api');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add JWT token to all outbound requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('bank_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercept response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (localStorage.getItem('bank_auth_token')) {
        localStorage.removeItem('bank_auth_token');
        localStorage.removeItem('bank_user_info');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
