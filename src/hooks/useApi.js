import { useState, useCallback } from 'react';
import { useAppContext } from '../context/AppContext';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const useApi = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showLoading, hideLoading, showError, showNotification } = useAppContext();

  // Interceptor para manejar errores globalmente
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('API Error:', error);
      let errorMessage = 'Error en la operación';
      
      if (error.response) {
        // Error de respuesta del servidor
        switch (error.response.status) {
          case 400:
            errorMessage = error.response.data.message || 'Datos inválidos';
            break;
          case 401:
            errorMessage = 'No autorizado';
            break;
          case 403:
            errorMessage = 'Acceso denegado';
            break;
          case 404:
            errorMessage = 'Recurso no encontrado';
            break;
          case 409:
            errorMessage = 'Conflicto con los datos existentes';
            break;
          case 500:
            errorMessage = 'Error interno del servidor';
            break;
          default:
            errorMessage = error.response.data.message || 'Error en la operación';
        }
      } else if (error.request) {
        // Error de conexión
        errorMessage = 'No se pudo conectar con el servidor';
      }

      return Promise.reject({ message: errorMessage, originalError: error });
    }
  );

  const executeRequest = useCallback(async (
    requestFunction,
    { 
      loadingMessage = 'Cargando...',
      successMessage = '',
      errorMessage = 'Error en la operación',
      showLoadingIndicator = true,
      showSuccessNotification = true,
      showErrorNotification = true
    } = {}
  ) => {
    try {
      setError(null);
      setIsLoading(true);
      if (showLoadingIndicator) {
        showLoading(loadingMessage);
      }

      const result = await requestFunction();
      setData(result.data);

      if (showSuccessNotification && successMessage) {
        showNotification(successMessage, 'success');
      }

      return result.data;
    } catch (err) {
      const finalErrorMessage = err.message || errorMessage;
      setError(finalErrorMessage);
      
      if (showErrorNotification) {
        showError(finalErrorMessage);
      }
      
      throw err;
    } finally {
      setIsLoading(false);
      if (showLoadingIndicator) {
        hideLoading();
      }
    }
  }, [showLoading, hideLoading, showError, showNotification]);

  // Métodos HTTP
  const get = useCallback((url, config = {}) => {
    return executeRequest(
      () => api.get(url, config),
      {
        loadingMessage: 'Cargando datos...',
        showSuccessNotification: false
      }
    );
  }, [executeRequest]);

  const post = useCallback((url, data, config = {}) => {
    return executeRequest(
      () => api.post(url, data, config),
      {
        loadingMessage: 'Guardando datos...',
        successMessage: 'Datos guardados exitosamente'
      }
    );
  }, [executeRequest]);

  const put = useCallback((url, data, config = {}) => {
    return executeRequest(
      () => api.put(url, data, config),
      {
        loadingMessage: 'Actualizando datos...',
        successMessage: 'Datos actualizados exitosamente'
      }
    );
  }, [executeRequest]);

  const del = useCallback((url, config = {}) => {
    return executeRequest(
      () => api.delete(url, config),
      {
        loadingMessage: 'Eliminando...',
        successMessage: 'Eliminado exitosamente'
      }
    );
  }, [executeRequest]);

  return {
    data,
    error,
    isLoading,
    api: {
      get,
      post,
      put,
      delete: del
    }
  };
};