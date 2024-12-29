// src/components/empresa/EmpresaList.jsx
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
  Box
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { empresaService } from '../../services/empresaService';

const EmpresaList = () => {
  const navigate = useNavigate();
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadEmpresas();
  }, []);

  const loadEmpresas = async () => {
    try {
      const data = await empresaService.getAll();
      setEmpresas(data);
    } catch (err) {
      setError('Error al cargar las empresas');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Typography>Cargando...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <>
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

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>RUT</TableCell>
              <TableCell>Razón Social</TableCell>
              <TableCell>Fecha Inserción</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {empresas.map((empresa) => (
              <TableRow key={empresa.identificadorUnico}>
                <TableCell>{empresa.rut}</TableCell>
                <TableCell>{empresa.razonSocial}</TableCell>
                <TableCell>{new Date(empresa.fechaInsercion).toLocaleDateString()}</TableCell>
                <TableCell>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default EmpresaList;