import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
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
  Box,
  Alert,
  TextField,
  InputAdornment,
  CircularProgress,
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
import { empresaService } from '../../services/empresaService';
import PeopleIcon from '@mui/icons-material/People'; 
import Loading from '../common/Loading';

const EmpresaList = () => {
  const navigate = useNavigate();
  const [empresas, setEmpresas] = useState([]);
  const [filteredEmpresas, setFilteredEmpresas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    empresaId: null,
    empresaNombre: ''
  });

  useEffect(() => {
    loadEmpresas();
  }, []);

  useEffect(() => {
    filterEmpresas();
  }, [searchTerm, empresas]);

  const filterEmpresas = () => {
    const filtered = empresas.filter(empresa => 
      empresa.razonSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empresa.rut.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEmpresas(filtered);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const loadEmpresas = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await empresaService.getAll();
      setEmpresas(data);
      setFilteredEmpresas(data);
    } catch (err) {
      console.error('Error al cargar empresas:', err);
      setError('Error al cargar las empresas. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (empresa) => {
    setDeleteDialog({
      open: true,
      empresaId: empresa.id,
      empresaNombre: empresa.razonSocial
    });
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({
      open: false,
      empresaId: null,
      empresaNombre: ''
    });
  };

  const handleDeleteConfirm = async () => {
    try {
      await empresaService.delete(deleteDialog.empresaId);
      handleDeleteCancel();
      await loadEmpresas();
      setError(null);
      setSuccessMessage('Empresa eliminada exitosamente');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err) {
      console.error('Error al eliminar empresa:', err);
      setError('Error al eliminar la empresa. Por favor, intente nuevamente.');
    }
  };

  if (loading) {
    return <Loading message="Cargando empresas..." />;
  }

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Listado de Empresas
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/empresas/nuevo')}
        >
          Nueva Empresa
        </Button>
      </Box>

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

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Buscador */}
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar por RUT o Razón Social..."
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
      

      {!error && filteredEmpresas.length === 0 ? (
        <Alert severity="info">
          {empresas.length === 0 
            ? "No hay empresas registradas. ¡Crea una nueva!" 
            : "No se encontraron empresas que coincidan con la búsqueda."}
        </Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>RUT</TableCell>
                <TableCell>Razón Social</TableCell>
                <TableCell>Fecha Inserción</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmpresas.map((empresa) => (
                <TableRow key={empresa.id}>
                  <TableCell>{empresa.rut}</TableCell>
                  <TableCell>{empresa.razonSocial}</TableCell>
                  <TableCell>
                  {new Date(empresa.fechaInsercion).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                      })}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton 
                      color="primary"
                      onClick={() => navigate(`/empresas/editar/${empresa.id}`)}
                      title="Editar empresa"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      color="info"
                      onClick={() => navigate(`/empresas/${empresa.id}/trabajadores`)}
                      title="Ver trabajadores"
                    >
                      <PeopleIcon />
                    </IconButton>
                    <IconButton 
                      color="error"
                      onClick={() => handleDeleteClick(empresa)}
                      title="Eliminar empresa"
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
            ¿Está seguro que desea eliminar la empresa {deleteDialog.empresaNombre}?
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

export default EmpresaList;