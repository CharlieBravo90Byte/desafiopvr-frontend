// src/services/trabajadorService.js
import api from './api';

export const trabajadorService = {
  getAllByEmpresa: async (empresaId) => {
    try {
      const response = await api.get(`/empresas/${empresaId}/trabajadores`);
      return response.data;
    } catch (error) {
      console.error('Error en getAllByEmpresa:', error.response || error);
      throw error;
    }
  },

  getById: async (trabajadorId) => {
    try {
      const response = await api.get(`/trabajadores/${trabajadorId}`);
      return response.data;
    } catch (error) {
      console.error('Error en getById:', error.response || error);
      throw error;
    }
  },

  create: async (empresaId, trabajador) => {
    try {
      const response = await api.post(`/empresas/${empresaId}/trabajadores`, trabajador);
      return response.data;
    } catch (error) {
      console.error('Error en create:', error.response || error);
      throw error;
    }
  },

  update: async (trabajadorId, trabajador) => {
    try {
      const response = await api.put(`/trabajadores/${trabajadorId}`, trabajador);
      return response.data;
    } catch (error) {
      console.error('Error en update:', error.response || error);
      throw error;
    }
  },

  delete: async (trabajadorId) => {
    try {
      await api.delete(`/trabajadores/${trabajadorId}`);
    } catch (error) {
      console.error('Error en delete:', error.response || error);
      throw error;
    }
  }
};