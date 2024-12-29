/**
 * Componente EmpresaForm - Formulario de creación de empresas
 * Fecha: 2024-12-29 10:41:42 UTC
 * Autor: CharlieBravo90Byte
 * 
 * Este componente maneja la creación de nuevas empresas,
 * incluyendo validaciones de RUT y manejo de errores
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, TextField, Button, Typography,
  Paper, Alert
} from '@mui/material';
import { empresaService } from '../../services/empresaService';
import { validateRut } from '../../utils/validators';

// Estilos para los contenedores
const estilosContenedor = {
  maxWidth: 600,
  mx: 'auto',
  mt: 4
};

const estilosPaper = {
  p: 3
};

const estilosBotones = {
  mt: 3,
  display: 'flex',
  gap: 2
};

// Estado inicial de la empresa
const estadoInicialEmpresa = {
  rut: '',
  razonSocial: ''
};

/**
 * Componente para crear una nueva empresa
 * @returns {JSX.Element} Formulario de creación de empresa
 */
const EmpresaForm = () => {
  const navigate = useNavigate();
  
  // Estados del componente
  const [error, setError] = useState('');
  const [rutError, setRutError] = useState('');
  const [empresa, setEmpresa] = useState(estadoInicialEmpresa);

  /**
   * Valida el formulario antes de enviar
   * @returns {boolean} True si el formulario es válido
   */
  const validateForm = () => {
    if (!validateRut(empresa.rut)) {
      setRutError('RUT inválido');
      return false;
    }
    setRutError('');
    return true;
  };

  /**
   * Maneja los cambios en los campos del formulario
   * @param {Event} e - Evento del campo de texto
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpresa(prev => ({
      ...prev,
      [name]: value
    }));
    if (name === 'rut') {
      setRutError('');
    }
  };

  /**
   * Maneja el envío del formulario
   * @param {Event} e - Evento del formulario
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    try {
      const empresaData = {
        rut: empresa.rut.trim(),
        razonSocial: empresa.razonSocial.trim()
      };
      
      await empresaService.create(empresaData);
      navigate('/');
    } catch (err) {
      console.error('Error al crear empresa:', err);
      const errorMessage = err.response?.data?.message || 
        'Error al crear la empresa. Verifique los datos e intente nuevamente.';
      setError(errorMessage);
    }
  };

  return (
    <Box sx={estilosContenedor}>
      <Paper sx={estilosPaper}>
        <Typography variant="h5" gutterBottom>
          Crear Nueva Empresa
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label="RUT"
            name="rut"
            value={empresa.rut}
            onChange={handleChange}
            margin="normal"
            required
            error={!!rutError}
            helperText={rutError || "Formato: XX.XXX.XXX-X"}
            inputProps={{
              'aria-label': 'RUT de la empresa',
              'data-testid': 'rut-input'
            }}
          />

          <TextField
            fullWidth
            label="Razón Social"
            name="razonSocial"
            value={empresa.razonSocial}
            onChange={handleChange}
            margin="normal"
            required
            inputProps={{
              'aria-label': 'Razón Social de la empresa',
              'data-testid': 'razon-social-input'
            }}
          />

          <Box sx={estilosBotones}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              data-testid="submit-button"
            >
              Crear Empresa
            </Button>
            
            <Button
              variant="outlined"
              onClick={() => navigate('/')}
              data-testid="cancel-button"
            >
              Cancelar
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default EmpresaForm;