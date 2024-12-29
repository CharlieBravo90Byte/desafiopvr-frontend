/**
 * Contexto de Aplicación - Manejo de estado global
 * Fecha: 2024-12-29
 * Autor: CharlieBravo90Byte
 * 
 * Este módulo provee el contexto global de la aplicación para manejar:
 * - Estado de carga
 * - Notificaciones
 * - Mensajes de error
 */

import { createContext, useContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import Loading from '../components/common/Loading';

// Creación del contexto
const AppContext = createContext(undefined);

/**
 * Hook personalizado para usar el contexto de la aplicación
 * @throws {Error} Si se usa fuera del Provider
 * @returns {Object} Contexto de la aplicación
 */
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe ser usado dentro de un AppContextProvider');
  }
  return context;
};

// Estado inicial de la notificación
const estadoInicialNotificacion = {
  open: false,
  message: '',
  severity: 'info'
};

/**
 * Proveedor del contexto de la aplicación
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Componentes hijos
 * @returns {JSX.Element} Proveedor del contexto
 */
export const AppContextProvider = ({ children }) => {
  // Estados del contexto
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(estadoInicialNotificacion);

  /**
   * Muestra una notificación
   * @param {string} message - Mensaje a mostrar
   * @param {string} severity - Tipo de notificación (info, error, warning, success)
   */
  const showNotification = (message, severity = 'info') => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  /**
   * Oculta la notificación actual
   */
  const hideNotification = () => {
    setNotification(prev => ({
      ...prev,
      open: false
    }));
  };

  /**
   * Muestra el indicador de carga
   */
  const showLoading = () => setLoading(true);

  /**
   * Oculta el indicador de carga
   */
  const hideLoading = () => setLoading(false);

  /**
   * Muestra una notificación de error
   * @param {string} message - Mensaje de error
   */
  const showError = (message) => showNotification(message, 'error');

  // Valores expuestos en el contexto
  const value = {
    loading,
    showLoading,
    hideLoading,
    showError,
    showNotification,
    hideNotification
  };

  return (
    <AppContext.Provider value={value}>
      {/* Indicador de carga global */}
      {loading && <Loading />}
      
      {/* Sistema de notificaciones */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={hideNotification}
        anchorOrigin={{ 
          vertical: 'top', 
          horizontal: 'right' 
        }}
      >
        <Alert 
          onClose={hideNotification} 
          severity={notification.severity}
          sx={{ width: '100%' }}
          role="alert"
        >
          {notification.message}
        </Alert>
      </Snackbar>

      {children}
    </AppContext.Provider>
  );
};