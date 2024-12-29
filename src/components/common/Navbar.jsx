/**
 * Componente Navbar - Barra de navegación principal
 * Fecha: 29-12-2024
 * Autor: CharlieBravo90Byte
 * 
 * Este componente muestra la barra de navegación superior de la aplicación
 * con el título centrado y estilos predefinidos
 */

import { AppBar, Toolbar, Typography } from '@mui/material';

// Estilos para la barra de navegación
const estilosNavbar = {
  backgroundColor: '#283593', // Color azul oscuro
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' // Sombra sutil
};

// Estilos para el texto del título
const estilosTitulo = {
  fontFamily: 'Roboto, Arial, sans-serif',
  fontWeight: 600,
  letterSpacing: 1.2,
  color: '#ffffff',
  textAlign: 'center',
  padding: '12px 0'
};

/**
 * Componente funcional que renderiza la barra de navegación
 * @returns {JSX.Element} Barra de navegación con título
 */
const Navbar = () => {
  return (
    // Barra de navegación principal
    <AppBar 
      position="static" 
      sx={estilosNavbar}
      role="banner"
      aria-label="Barra de navegación"
    >
      {/* Contenedor centrado para el título */}
      <Toolbar 
        sx={{ justifyContent: 'center' }}
        role="navigation"
      >
        {/* Título de la aplicación */}
        <Typography 
          variant="h5" 
          sx={estilosTitulo}
          component="h1"
          aria-label="Título de la aplicación"
        >
          Gestión de Empresas Previred
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;