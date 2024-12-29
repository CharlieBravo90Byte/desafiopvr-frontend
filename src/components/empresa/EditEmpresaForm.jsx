/**
 * Componente EditEmpresaForm - Formulario de edición de empresas
 * Fecha: 2024-12-29
 * Autor: CharlieBravo90Byte
 * 
 * Este componente maneja la edición de datos de una empresa existente,
 * incluyendo validaciones y manejo de errores
 */

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Box, TextField, Button, Typography,
  Paper, Alert, CircularProgress
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
 * Componente para editar los datos de una empresa
 * @returns {JSX.Element} Formulario de edición de empresa
 */
const EditEmpresaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Estados del componente
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rutError, setRutError] = useState('');
  const [empresa, setEmpresa] = useState(estadoInicialEmpresa);

  /**
   * Carga los datos de la empresa al montar el componente
   */
  useEffect(() => {
    loadEmpresa();
  }, [id]);

  /**
   * Obtiene los datos de la empresa desde el servidor
   */
  const loadEmpresa = async () => {
    try {
      const data = await empresaService.getById(id);
      setEmpresa({
        rut: data.rut,
        razonSocial: data.razonSocial
      });
    } catch (err) {
      console.error('Error al cargar empresa:', err);
      setError('Error al cargar los datos de la empresa');
    } finally {
      setLoading(false);
    }
  };

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

      await empresaService.update(id, empresaData);
      navigate('/');
    } catch (err) {
      console.error('Error al actualizar empresa:', err);
      const errorMessage = err.response?.data?.message || 
        'Error al actualizar la empresa. Verifique los datos e intente nuevamente.';
      setError(errorMessage);
    }
  };

  // Muestra spinner mientras carga los datos
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={estilosContenedor}>
      <Paper sx={estilosPaper}>
        <Typography variant="h5" gutterBottom>
          Editar Empresa
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
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
          />

          <TextField
            fullWidth
            label="Razón Social"
            name="razonSocial"
            value={empresa.razonSocial}
            onChange={handleChange}
            margin="normal"
            required
          />

          <Box sx={estilosBotones}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Guardar Cambios
            </Button>
            
            <Button
              variant="outlined"
              onClick={() => navigate('/')}
            >
              Cancelar
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default EditEmpresaForm;