// src/components/empresa/EditEmpresaForm.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  CircularProgress
} from '@mui/material';
import { empresaService } from '../../services/empresaService';
import { validateRut } from '../../utils/validators';

const EditEmpresaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rutError, setRutError] = useState('');
  const [empresa, setEmpresa] = useState({
    rut: '',
    razonSocial: ''
  });

  useEffect(() => {
    loadEmpresa();
  }, [id]);

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

  const validateForm = () => {
    if (!validateRut(empresa.rut)) {
      setRutError('RUT inválido');
      return false;
    }
    setRutError('');
    return true;
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    try {
      const empresaData = {
        rut: empresa.rut.trim(),
        razonSocial: empresa.razonSocial.trim()
      };

      console.log('Actualizando empresa:', empresaData);
      await empresaService.update(id, empresaData);
      navigate('/');
    } catch (err) {
      console.error('Error al actualizar empresa:', err);
      const errorMessage = err.response?.data?.message || 
        'Error al actualizar la empresa. Verifique los datos e intente nuevamente.';
      setError(errorMessage);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Paper sx={{ p: 3 }}>
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

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
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