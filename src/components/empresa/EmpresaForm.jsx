// src/components/empresa/EmpresaForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert
} from '@mui/material';
import { empresaService } from '../../services/empresaService';
import { validateRut } from '../../utils/validators';

const EmpresaForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [rutError, setRutError] = useState('');
  const [empresa, setEmpresa] = useState({
    rut: '',
    razonSocial: ''
  });

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
      // Enviar solo los campos necesarios
      const empresaData = {
        rut: empresa.rut.trim(),
        razonSocial: empresa.razonSocial.trim()
      };

      console.log('Datos a enviar:', empresaData);
      
      // Llamar al servicio para crear la empresa
      const response = await empresaService.create(empresaData);
      console.log('Empresa creada:', response);
      
      // Redireccionar al listado después de crear exitosamente
      navigate('/');
    } catch (err) {
      console.error('Error detallado:', err);
      const errorMessage = err.response?.data?.message || 
        'Error al crear la empresa. Verifique los datos e intente nuevamente.';
      setError(errorMessage);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Crear Nueva Empresa
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
              Crear Empresa
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

export default EmpresaForm;