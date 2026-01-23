import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('userToken') || localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const contactService = {
  list: () => api.get('/contacts'),
  save: (data: any) => api.post('/contacts', data),
  delete: (id: number) => api.delete(`/contacts/${id}`),
  startLocation: (id: number, duration: string) => api.post(`/contacts/${id}/location`, { locationDuration: duration }),
  stopLocation: (id: number) => api.delete(`/contacts/${id}/location`),
};

export const userService = {
  me: () => api.get('/users/me'),
  updateLocation: (lat: number, lng: number) => api.patch('/users/me/location', { lat, lng }),
};

export const consultationService = {
  // CORREÇÃO: Apontando para /api/seguranca
  consultar: (data: { termo: string, isCpf: boolean }) => api.post('/api/seguranca/consultar', data),
  getHistory: () => api.get('/api/seguranca/historico'),
};

export default api;