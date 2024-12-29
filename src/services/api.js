/**
 * Configuración del cliente HTTP Axios
 * Fecha: 2024-12-29
 * Autor: CharlieBravo90Byte
 * 
 * Este módulo configura una instancia de Axios para realizar
 * peticiones HTTP a la API del backend, incluyendo interceptores
 * para debugging y manejo de errores
 */

import axios from 'axios';

/**
 * URL base de la API
 * @constant {string}
 */
const API_BASE_URL = 'http://localhost:8080/api';

/**
 * Headers por defecto para todas las peticiones
 * @constant {Object}
 */
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
};

/**
 * Instancia personalizada de Axios
 * @constant {AxiosInstance}
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: DEFAULT_HEADERS
});

/**
 * Interceptor para peticiones salientes
 * Registra información de debugging sobre la petición
 */
api.interceptors.request.use(
  config => {
    // Log de información de la petición
    console.log('Request:', {
      method: config.method,
      url: config.url,
      data: config.data
    });
    return config;
  },
  error => {
    // Log de errores en la petición
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

/**
 * Interceptor para respuestas
 * Maneja errores y registra información de debugging
 */
api.interceptors.response.use(
  response => response,
  error => {
    // Log detallado del error de respuesta
    console.error('Response Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

export default api;