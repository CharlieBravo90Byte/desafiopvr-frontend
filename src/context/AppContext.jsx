// src/context/AppContext.jsx
import { createContext, useContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import Loading from '../components/common/Loading';

const AppContext = createContext(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe ser usado dentro de un AppContextProvider');
  }
  return context;
};

export const AppContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'info'
  });

  const showNotification = (message, severity = 'info') => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  const hideNotification = () => {
    setNotification(prev => ({
      ...prev,
      open: false
    }));
  };

  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);
  const showError = (message) => showNotification(message, 'error');

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
      {loading && <Loading />}
      
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={hideNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={hideNotification} 
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>

      {children}
    </AppContext.Provider>
  );
};