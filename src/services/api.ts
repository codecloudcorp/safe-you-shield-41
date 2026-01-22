import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Aponta para o Backend Java
});

// Interceptor: Pega o token salvo no Login e coloca no Header de todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('userToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;