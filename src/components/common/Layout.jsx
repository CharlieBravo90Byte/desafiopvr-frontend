/**
 * Componente Layout - Estructura principal de la aplicación
 * Fecha: 2024-12-29
 * Autor: CharlieBravo90Byte
 * 
 * Este componente define la estructura base de la aplicación,
 * incluyendo la barra de navegación y el contenedor principal
 */

import { Container } from '@mui/material';
import Navbar from './Navbar';

// Estilos para el contenedor principal
const estilosContenedor = {
  mt: 4 // Margen superior de 4 unidades
};

/**
 * Componente que envuelve la aplicación con la estructura básica
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Contenido a renderizar dentro del layout
 * @returns {JSX.Element} Estructura principal de la aplicación
 */
const Layout = ({ children }) => {
  return (
    <>
      {/* Barra de navegación superior */}
      <Navbar />
      
      {/* Contenedor principal con margen superior */}
      <Container 
        sx={estilosContenedor}
        component="main"
        role="main"
        aria-label="Contenido principal"
      >
        {children}
      </Container>
    </>
  );
};

// Valores por defecto para las propiedades
Layout.defaultProps = {
  children: null
};

export default Layout;