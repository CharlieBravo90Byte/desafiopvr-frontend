/**
 * Componente Loading - Indicador de carga
 * Fecha: 2024-12-29
 * Autor: CharlieBravo90Byte
 * 
 * Este componente muestra un indicador de carga circular con un mensaje
 * personalizable. Se utiliza mientras se cargan datos o durante procesos.
 */

import { Box, CircularProgress, Typography } from '@mui/material';

// Estilos para el contenedor principal
const estilosContenedor = {
  display: "flex",
  flexDirection: "column", 
  justifyContent: "center",
  alignItems: "center",
  minHeight: "200px",
  gap: 2
};

/**
 * Componente de carga que muestra un spinner y un mensaje
 * @param {Object} props - Propiedades del componente
 * @param {string} [props.message='Cargando...'] - Mensaje a mostrar debajo del spinner
 * @returns {JSX.Element} Componente de carga con spinner y mensaje
 */
const Loading = ({ message = 'Cargando...' }) => {
  return (
    // Contenedor principal centrado
    <Box 
      sx={estilosContenedor}
      role="status"
      aria-label="Indicador de carga"
    >
      {/* Spinner de carga circular */}
      <CircularProgress 
        aria-label="Cargando contenido"
      />
      
      {/* Mensaje de carga */}
      <Typography 
        variant="body1" 
        color="text.secondary"
        aria-live="polite"
      >
        {message}
      </Typography>
    </Box>
  );
};

// Valores por defecto para las propiedades
Loading.defaultProps = {
  message: 'Cargando...'
};

export default Loading;