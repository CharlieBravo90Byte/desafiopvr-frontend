import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa createRoot desde react-dom/client
import App from './App';
import './index.css'; // Importa el archivo de estilos global

// Crea el root y renderiza la aplicación
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);