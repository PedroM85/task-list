import axios from 'axios';
const axiosServices = axios.create({ baseURL: import.meta.env.VITE_APP_API_URL || 'http://localhost:3001/' });

axiosServices.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('token');

        config.headers.set('Content-Type', 'application/json');
        config.headers.set('Accept', 'application/json');
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
);

// Interceptor de respuestas
axiosServices.interceptors.response.use(
  (res) => res,
  (err) => {
    const code = err?.response?.data?.error;

    if (code === 'auth/id-token-expired') {
      localStorage.removeItem('token');
      window.location.href = '/'; // o usa navigate() si estás en un componente
    }

    return Promise.reject(err);
  }
);

export default axiosServices;
