/**
 * Servicio de Empresas
 * Fecha: 2024-12-29
 * Autor: CharlieBravo90Byte
 * 
 * Este módulo proporciona los métodos para interactuar con el API
 * de empresas, incluyendo operaciones CRUD y manejo de errores
 */

import api from './api';

/**
 * URL base para las operaciones de empresas
 * @constant {string}
 */
const BASE_URL = '/empresas';

/**
 * Servicio para gestionar operaciones con empresas
 * @namespace
 */
export const empresaService = {
  /**
   * Crea una nueva empresa
   * @async
   * @param {Object} empresa - Datos de la empresa a crear
   * @returns {Promise<Object>} Datos de la empresa creada
   * @throws {Error} Si ocurre un error durante la creación
   */
  create: async (empresa) => {
    try {
      const response = await api.post(BASE_URL, empresa);
      return response.data;
    } catch (error) {
      console.error('Error en create:', error.response || error);
      throw error;
    }
  },

  /**
   * Obtiene todas las empresas
   * @async
   * @returns {Promise<Array>} Lista de empresas
   * @throws {Error} Si ocurre un error al obtener las empresas
   */
  getAll: async () => {
    try {
      const response = await api.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error en getAll:', error.response || error);
      throw error;
    }
  },

  /**
   * Obtiene una empresa por su ID
   * @async
   * @param {string|number} id - ID de la empresa
   * @returns {Promise<Object>} Datos de la empresa
   * @throws {Error} Si ocurre un error al obtener la empresa
   */
  getById: async (id) => {
    try {
      const response = await api.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error en getById:', error.response || error);
      throw error;
    }
  },

  /**
   * Actualiza una empresa existente
   * @async
   * @param {string|number} id - ID de la empresa
   * @param {Object} empresa - Nuevos datos de la empresa
   * @returns {Promise<Object>} Datos actualizados de la empresa
   * @throws {Error} Si ocurre un error durante la actualización
   */
  update: async (id, empresa) => {
    try {
      const response = await api.put(`${BASE_URL}/${id}`, empresa);
      return response.data;
    } catch (error) {
      console.error('Error en update:', error.response || error);
      throw error;
    }
  },

  /**
   * Elimina una empresa por su ID
   * @async
   * @param {string|number} id - ID de la empresa a eliminar
   * @throws {Error} Si ocurre un error durante la eliminación
   */
  delete: async (id) => {
    try {
      await api.delete(`${BASE_URL}/${id}`);
    } catch (error) {
      console.error('Error en delete:', error.response || error);
      throw error;
    }
  }
};