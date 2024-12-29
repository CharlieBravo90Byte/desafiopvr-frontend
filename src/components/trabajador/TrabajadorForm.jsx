/**
 * Componente TrabajadorForm - Formulario de creación/edición de trabajadores
 * Fecha: 2024-12-29 10:45:15 UTC
 * Autor: CharlieBravo90Byte
 * 
 * Este componente maneja la creación y edición de trabajadores de una empresa,
 * incluyendo validaciones de RUT y campos requeridos
 */

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Box, TextField, Button, Typography,
  Paper, Alert, Breadcrumbs, Link
} from '@mui/material';
import { trabajadorService } from '../../services/trabajadorService';
import { empresaService } from '../../services/empresaService';
import { validateRut } from '../../utils/validators';
import Loading from '../common/Loading';

// Estilos para los contenedores
const estilosContenedor = {
  width: '100%',
  mb: 4
};

const estilosPaper = {
  p: 3
};

const estilosBotones = {
  mt: 3,
  display: 'flex',
  gap: 2
};

// Estado inicial del trabajador
const estadoInicialTrabajador = {
  rut: '',
  nombre: '',
  apellidoPaterno: '',
  apellidoMaterno: '',
  direccion: ''
};

/**
 * Componente para crear o editar un trabajador dentro de una empresa
 * @returns {JSX.Element} Formulario de trabajador
 */
const TrabajadorForm = () => {
  const { empresaId, trabajadorId } = useParams();
  const navigate = useNavigate();
  
  // Estados del componente
  const [loading, setLoading] = useState(trabajadorId ? true : false);
  const [error, setError] = useState('');
  const [empresa, setEmpresa] = useState(null);
  const [rutError, setRutError] = useState('');
  const [trabajador, setTrabajador] = useState(estadoInicialTrabajador);

  /**
   * Carga los datos de la empresa y del trabajador si es modo edición
   */
  useEffect(() => {
    const loadData = async () => {
      try {
        const empresaData = await empresaService.getById(empresaId);
        setEmpresa(empresaData);

        if (trabajadorId) {
          const trabajadorData = await trabajadorService.getById(trabajadorId);
          setTrabajador(trabajadorData);
        }
      } catch (err) {
        console.error('Error al cargar datos:', err);
        setError('Error al cargar los datos. Por favor, intente nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [empresaId, trabajadorId]);

  /**
   * Valida todos los campos del formulario
   * @returns {boolean} True si el formulario es válido
   */
  const validateForm = () => {
    let isValid = true;
    setError('');
    setRutError('');

    if (!validateRut(trabajador.rut)) {
      setRutError('RUT inválido');
      isValid = false;
    }

    if (!trabajador.nombre || !trabajador.apellidoPaterno || 
        !trabajador.apellidoMaterno || !trabajador.direccion) {
      setError('Todos los campos son obligatorios');
      isValid = false;
    }

    return isValid;
  };

  /**
   * Maneja los cambios en los campos del formulario
   * @param {Event} e - Evento del campo de texto
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrabajador(prev => ({
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
      if (trabajadorId) {
        await trabajadorService.update(trabajadorId, trabajador);
      } else {
        await trabajadorService.create(empresaId, trabajador);
      }
      navigate(`/empresas/${empresaId}/trabajadores`);
    } catch (err) {
      console.error('Error al guardar trabajador:', err);
      setError('Error al guardar los datos. Por favor, intente nuevamente.');
    }
  };

  if (loading) {
    return <Loading message="Cargando datos del trabajador..." />;
  }

  return (
    <Box sx={estilosContenedor}>
      {/* Navegación de migas de pan */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link 
          component="button"
          variant="body1"
          onClick={() => navigate('/')}
          underline="hover"
        >
          Empresas
        </Link>
        <Link
          component="button"
          variant="body1"
          onClick={() => navigate(`/empresas/${empresaId}/trabajadores`)}
          underline="hover"
        >
          Trabajadores de {empresa?.razonSocial}
        </Link>
        <Typography color="text.primary">
          {trabajadorId ? 'Editar' : 'Nuevo'} Trabajador
        </Typography>
      </Breadcrumbs>

      <Paper sx={estilosPaper}>
        <Typography variant="h5" gutterBottom>
          {trabajadorId ? 'Editar' : 'Nuevo'} Trabajador
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
            value={trabajador.rut}
            onChange={handleChange}
            margin="normal"
            required
            error={!!rutError}
            helperText={rutError || "Formato: XX.XXX.XXX-X"}
            inputProps={{
              'aria-label': 'RUT del trabajador'
            }}
          />

          <TextField
            fullWidth
            label="Nombre"
            name="nombre"
            value={trabajador.nombre}
            onChange={handleChange}
            margin="normal"
            required
            inputProps={{
              'aria-label': 'Nombre del trabajador'
            }}
          />

          <TextField
            fullWidth
            label="Apellido Paterno"
            name="apellidoPaterno"
            value={trabajador.apellidoPaterno}
            onChange={handleChange}
            margin="normal"
            required
            inputProps={{
              'aria-label': 'Apellido paterno del trabajador'
            }}
          />

          <TextField
            fullWidth
            label="Apellido Materno"
            name="apellidoMaterno"
            value={trabajador.apellidoMaterno}
            onChange={handleChange}
            margin="normal"
            required
            inputProps={{
              'aria-label': 'Apellido materno del trabajador'
            }}
          />

          <TextField
            fullWidth
            label="Dirección"
            name="direccion"
            value={trabajador.direccion}
            onChange={handleChange}
            margin="normal"
            required
            multiline
            rows={3}
            inputProps={{
              'aria-label': 'Dirección del trabajador'
            }}
          />

          <Box sx={estilosBotones}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              data-testid="submit-button"
            >
              {trabajadorId ? 'Guardar Cambios' : 'Crear Trabajador'}
            </Button>
            
            <Button
              variant="outlined"
              onClick={() => navigate(`/empresas/${empresaId}/trabajadores`)}
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

export default TrabajadorForm;