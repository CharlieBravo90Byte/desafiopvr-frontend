import api from './api';

/**
 * Servicio para manejar operaciones sobre trabajadores
 * Fecha: 2024-12-29
 * Autor: CharlieBravo90Byte
 *
 * Este servicio proporciona métodos para obtener, crear, actualizar y eliminar trabajadores.
 */
export const trabajadorService = {
  /**
   * Obtener todos los trabajadores de una empresa
   * @param {string} empresaId - ID de la empresa
   * @returns {Promise<Array>} Lista de trabajadores
   */
  getAllByEmpresa: async (empresaId) => {
    try {
      const response = await api.get(`/empresas/${empresaId}/trabajadores`);
      return response.data;
    } catch (error) {
      console.error('Error en getAllByEmpresa:', error.response || error);
      throw error;
    }
  },

  /**
   * Obtener un trabajador por su ID
   * @param {string} trabajadorId - ID del trabajador
   * @returns {Promise<Object>} Datos del trabajador
   */
  getById: async (trabajadorId) => {
    try {
      const response = await api.get(`/trabajadores/${trabajadorId}`);
      return response.data;
    } catch (error) {
      console.error('Error en getById:', error.response || error);
      throw error;
    }
  },

  /**
   * Crear un nuevo trabajador en una empresa
   * @param {string} empresaId - ID de la empresa
   * @param {Object} trabajador - Datos del nuevo trabajador
   * @returns {Promise<Object>} Datos del trabajador creado
   */
  create: async (empresaId, trabajador) => {
    try {
      const response = await api.post(`/empresas/${empresaId}/trabajadores`, trabajador);
      return response.data;
    } catch (error) {
      console.error('Error en create:', error.response || error);
      throw error;
    }
  },

  /**
   * Actualizar los datos de un trabajador
   * @param {string} trabajadorId - ID del trabajador
   * @param {Object} trabajador - Nuevos datos del trabajador
   * @returns {Promise<Object>} Datos del trabajador actualizado
   */
  update: async (trabajadorId, trabajador) => {
    try {
      const response = await api.put(`/trabajadores/${trabajadorId}`, trabajador);
      return response.data;
    } catch (error) {
      console.error('Error en update:', error.response || error);
      throw error;
    }
  },

  /**
   * Eliminar un trabajador por su ID
   * @param {string} trabajadorId - ID del trabajador
   * @returns {Promise<void>}
   */
  delete: async (trabajadorId) => {
    try {
      await api.delete(`/trabajadores/${trabajadorId}`);
    } catch (error) {
      console.error('Error en delete:', error.response || error);
      throw error;
    }
  }
};