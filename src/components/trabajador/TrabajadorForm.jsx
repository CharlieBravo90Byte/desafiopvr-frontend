// src/components/trabajador/TrabajadorForm.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  Breadcrumbs,
  Link
} from '@mui/material';
import { trabajadorService } from '../../services/trabajadorService';
import { empresaService } from '../../services/empresaService';
import { validateRut } from '../../utils/validators';
import Loading from '../common/Loading';

const TrabajadorForm = () => {
  const { empresaId, trabajadorId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(trabajadorId ? true : false);
  const [error, setError] = useState('');
  const [empresa, setEmpresa] = useState(null);
  const [rutError, setRutError] = useState('');
  const [trabajador, setTrabajador] = useState({
    rut: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    direccionFisica: ''
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        // Cargar datos de la empresa
        const empresaData = await empresaService.getById(empresaId);
        setEmpresa(empresaData);

        // Si es edición, cargar datos del trabajador
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

  const validateForm = () => {
    let isValid = true;
    setError('');
    setRutError('');

    if (!validateRut(trabajador.rut)) {
      setRutError('RUT inválido');
      isValid = false;
    }

    if (!trabajador.nombre || !trabajador.apellidoPaterno || !trabajador.apellidoMaterno || !trabajador.direccionFisica) {
      setError('Todos los campos son obligatorios');
      isValid = false;
    }

    return isValid;
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const trabajadorData = {
        ...trabajador
      };

      if (trabajadorId) {
        await trabajadorService.update(trabajadorId, trabajadorData);
      } else {
        await trabajadorService.create(empresaId, trabajadorData);
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
    <Box sx={{ width: '100%', mb: 4 }}>
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

      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          {trabajadorId ? 'Editar' : 'Nuevo'} Trabajador
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
            value={trabajador.rut}
            onChange={handleChange}
            margin="normal"
            required
            error={!!rutError}
            helperText={rutError || "Formato: XX.XXX.XXX-X"}
          />

          <TextField
            fullWidth
            label="Nombre"
            name="nombre"
            value={trabajador.nombre}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Apellido Paterno"
            name="apellidoPaterno"
            value={trabajador.apellidoPaterno}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Apellido Materno"
            name="apellidoMaterno"
            value={trabajador.apellidoMaterno}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Dirección Física"
            name="direccionFisica"
            value={trabajador.direccionFisica}
            onChange={handleChange}
            margin="normal"
            required
            multiline
            rows={3}
          />

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              {trabajadorId ? 'Guardar Cambios' : 'Crear Trabajador'}
            </Button>
            
            <Button
              variant="outlined"
              onClick={() => navigate(`/empresas/${empresaId}/trabajadores`)}
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