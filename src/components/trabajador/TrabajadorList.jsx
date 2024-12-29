// src/components/trabajador/TrabajadorList.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Breadcrumbs,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { trabajadorService } from '../../services/trabajadorService';
import { empresaService } from '../../services/empresaService';

const TrabajadorList = () => {
  const { empresaId } = useParams();
  const navigate = useNavigate();
  const [trabajadores, setTrabajadores] = useState([]);
  const [empresa, setEmpresa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    trabajadorId: null,
    trabajadorNombre: ''
  });

  useEffect(() => {
    loadData();
  }, [empresaId]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Cargar datos de la empresa
      const empresaData = await empresaService.getById(empresaId);
      setEmpresa(empresaData);
      
      // Cargar trabajadores de la empresa
      const trabajadoresData = await trabajadorService.getAllByEmpresa(empresaId);
      setTrabajadores(trabajadoresData);
    } catch (err) {
      console.error('Error al cargar datos:', err);
      setError('Error al cargar los datos. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (trabajador) => {
    setDeleteDialog({
      open: true,
      trabajadorId: trabajador.id,
      trabajadorNombre: `${trabajador.nombres} ${trabajador.apellidos}`
    });
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({
      open: false,
      trabajadorId: null,
      trabajadorNombre: ''
    });
  };

  const handleDeleteConfirm = async () => {
    try {
      await trabajadorService.delete(deleteDialog.trabajadorId);
      setTrabajadores(prevTrabajadores => 
        prevTrabajadores.filter(t => t.id !== deleteDialog.trabajadorId)
      );
      handleDeleteCancel();
    } catch (err) {
      console.error('Error al eliminar trabajador:', err);
      setError('Error al eliminar el trabajador. Por favor, intente nuevamente.');
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
        <Typography color="text.primary">
          Trabajadores de {empresa?.razonSocial}
        </Typography>
      </Breadcrumbs>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Trabajadores de {empresa?.razonSocial}
        </Typography>
        <Box>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            sx={{ mr: 2 }}
          >
            Volver
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate(`/empresas/${empresaId}/trabajadores/nuevo`)}
          >
            Nuevo Trabajador
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!error && trabajadores.length === 0 ? (
        <Alert severity="info">
          No hay trabajadores registrados para esta empresa. ¡Agregue uno nuevo!
        </Alert>
      ) : (
        <TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>RUT</TableCell>
        <TableCell>Nombre</TableCell>
        <TableCell>Apellido Paterno</TableCell>
        <TableCell>Apellido Materno</TableCell>
        <TableCell>Dirección</TableCell>
        <TableCell align="center">Acciones</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {trabajadores.map((trabajador) => (
        <TableRow key={trabajador.id}>
          <TableCell>{trabajador.rut}</TableCell>
          <TableCell>{trabajador.nombre}</TableCell>
          <TableCell>{trabajador.apellidoPaterno}</TableCell>
          <TableCell>{trabajador.apellidoMaterno}</TableCell>
          <TableCell>{trabajador.direccion}</TableCell>
          <TableCell align="center">
            <IconButton 
              color="primary"
              onClick={() => navigate(`/empresas/${empresaId}/trabajadores/editar/${trabajador.id}`)}
              title="Editar trabajador"
            >
              <EditIcon />
            </IconButton>
            <IconButton 
              color="error"
              onClick={() => handleDeleteClick(trabajador)}
              title="Eliminar trabajador"
            >
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
      )}

      {/* Diálogo de confirmación de eliminación */}
      <Dialog
        open={deleteDialog.open}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirmar eliminación
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Está seguro que desea eliminar al trabajador {deleteDialog.trabajadorNombre}?
            Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>
            Cancelar
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TrabajadorList;