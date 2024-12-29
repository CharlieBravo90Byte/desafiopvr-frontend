// src/services/empresaService.js
import api from './api';

export const empresaService = {
  getAll: async () => {
    const response = await api.get('/empresas');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/empresas/${id}`);
    return response.data;
  },
  create: async (empresa) => {
    const response = await api.post('/empresas', empresa);
    return response.data;
  },
  update: async (id, empresa) => {
    const response = await api.put(`/empresas/${id}`, empresa);
    return response.data;
  },
  delete: async (id) => {
    await api.delete(`/empresas/${id}`);
  }
};