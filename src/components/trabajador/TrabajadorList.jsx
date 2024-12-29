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
  TextField,
  InputAdornment,
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
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { trabajadorService } from '../../services/trabajadorService';
import { empresaService } from '../../services/empresaService';

/**
 * Componente Listado de Trabajadores
 * Fecha: 2024-12-29
 * Autor: CharlieBravo90Byte
 *
 * Muestra una lista de trabajadores con opciones para buscar, agregar,
 * editar y eliminar trabajadores.
 */
const TrabajadorList = () => {
  const { empresaId } = useParams();
  const navigate = useNavigate();
  
  // Estados para manejar datos y estados de la UI
  const [trabajadores, setTrabajadores] = useState([]); // Lista de trabajadores
  const [filteredTrabajadores, setFilteredTrabajadores] = useState([]); // Lista filtrada de trabajadores
  const [searchTerm, setSearchTerm] = useState(''); // Término de búsqueda
  const [empresa, setEmpresa] = useState(null); // Datos de la empresa
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error
  const [successMessage, setSuccessMessage] = useState(null); // Mensaje de éxito
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    trabajadorId: null,
    trabajadorNombre: ''
  }); // Estado del diálogo de confirmación de eliminación

  // Cargar datos cuando cambia el ID de la empresa
  useEffect(() => {
    loadData();
  }, [empresaId]);

  // Filtrar trabajadores cuando cambia el término de búsqueda o la lista de trabajadores
  useEffect(() => {
    filterTrabajadores();
  }, [searchTerm, trabajadores]);

  // Función para filtrar trabajadores según el término de búsqueda
  const filterTrabajadores = () => {
    const filtered = trabajadores.filter(trabajador => 
      trabajador.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trabajador.apellidoPaterno.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trabajador.apellidoMaterno.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trabajador.rut.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTrabajadores(filtered);
  };

  // Manejar cambio en el término de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Cargar datos de la empresa y sus trabajadores
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
      setFilteredTrabajadores(trabajadoresData);
    } catch (err) {
      console.error('Error al cargar datos:', err);
      setError('Error al cargar los datos. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  // Manejar clic en el botón de eliminar trabajador
  const handleDeleteClick = (trabajador) => {
    setDeleteDialog({
      open: true,
      trabajadorId: trabajador.id,
      trabajadorNombre: `${trabajador.nombre} ${trabajador.apellidoPaterno}`
    });
  };

  // Manejar cancelación del diálogo de eliminación
  const handleDeleteCancel = () => {
    setDeleteDialog({
      open: false,
      trabajadorId: null,
      trabajadorNombre: ''
    });
  };

  // Confirmar eliminación de trabajador
  const handleDeleteConfirm = async () => {
    try {
      await trabajadorService.delete(deleteDialog.trabajadorId);
      await loadData(); // Recarga todos los trabajadores
      setSuccessMessage(`Trabajador ${deleteDialog.trabajadorNombre} eliminado exitosamente`); // Mensaje más específico
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      handleDeleteCancel();
    } catch (err) {
      console.error('Error al eliminar trabajador:', err);
      setError(`Error al eliminar al trabajador ${deleteDialog.trabajadorNombre}. Por favor, intente nuevamente.`);
    }
  };

  // Mostrar componente de carga si los datos están cargando
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

      {/* Mensaje de éxito */}
      {successMessage && (
        <Alert 
            severity="success" 
            sx={{ 
            mb: 2,
            fontSize: '1.1rem',
            '& .MuiAlert-icon': {
                fontSize: '1.5rem'
            }
            }}
        >
            {successMessage}
        </Alert>
        )}

      {/* Mensaje de error */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Barra de búsqueda */}
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar por RUT, Nombre o Apellidos..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Mostrar mensaje si no hay trabajadores que coincidan con la búsqueda o si no hay trabajadores registrados */}
      {!error && filteredTrabajadores.length === 0 ? (
        <Alert severity="info">
          {trabajadores.length === 0 
            ? "No hay trabajadores registrados para esta empresa. ¡Agregue uno nuevo!"
            : "No se encontraron trabajadores que coincidan con la búsqueda."}
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
              {filteredTrabajadores.map((trabajador) => (
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