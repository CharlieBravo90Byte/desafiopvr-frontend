// src/services/empresaService.js
import api from './api';

export const empresaService = {
  create: async (empresa) => {
    try {
      const response = await api.post('/empresas', empresa);
      return response.data;
    } catch (error) {
      console.error('Error en create:', error.response || error);
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await api.get('/empresas');
      return response.data;
    } catch (error) {
      console.error('Error en getAll:', error.response || error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/empresas/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error en getById:', error.response || error);
      throw error;
    }
  },

  update: async (id, empresa) => {
    try {
      const response = await api.put(`/empresas/${id}`, empresa);
      return response.data;
    } catch (error) {
      console.error('Error en update:', error.response || error);
      throw error;
    }
  },

  
  delete: async (id) => {
    try {
      await api.delete(`/empresas/${id}`);
    } catch (error) {
      console.error('Error en delete:', error.response || error);
      throw error;
    }
  }
};