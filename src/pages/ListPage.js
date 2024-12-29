import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TablePagination, TextField, IconButton, Snackbar, Alert } from '@mui/material';
import { Search } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Estilos personalizados para la tabla
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontWeight: 'bold',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
}));

const ListPage = () => {
    const [empresas, setEmpresas] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredEmpresas, setFilteredEmpresas] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmpresas = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/empresas');
                setEmpresas(response.data);
                setFilteredEmpresas(response.data);
            } catch (error) {
                console.error('Error fetching empresas:', error);
            }
        };

        fetchEmpresas();
    }, []);

    const handleViewTrabajadores = (empresaId) => {
        navigate(`/empresa/${empresaId}/trabajadores`);
    };

    const handleEditEmpresa = (empresaId) => {
        navigate(`/edit/${empresaId}`);
    };

    const handleDeleteEmpresa = async (empresaId) => {
        try {
            await axios.delete(`http://localhost:8080/api/empresas/${empresaId}`);
            const updatedEmpresas = empresas.filter(empresa => empresa.id !== empresaId);
            setEmpresas(updatedEmpresas);
            setFilteredEmpresas(updatedEmpresas);
            setOpenSnackbar(true); // Mostrar el snackbar de éxito
        } catch (error) {
            console.error('Error deleting empresa:', error);
        }
    };

    const handleSearchChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = empresas.filter(empresa =>
            empresa.rut.toLowerCase().includes(query) ||
            empresa.razonSocial.toLowerCase().includes(query) ||
            empresa.identificadorUnico.toLowerCase().includes(query)
        );
        setFilteredEmpresas(filtered);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
                Lista de Empresas
            </Typography>
            <TextField
                label="Buscar"
                value={searchQuery}
                onChange={handleSearchChange}
                fullWidth
                margin="normal"
                InputProps={{
                    endAdornment: (
                        <IconButton>
                            <Search />
                        </IconButton>
                    ),
                }}
            />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>RUT</StyledTableCell>
                            <StyledTableCell>Razón Social</StyledTableCell>
                            <StyledTableCell>Fecha de Inserción</StyledTableCell>
                            <StyledTableCell>Identificador Único</StyledTableCell>
                            <StyledTableCell>Acciones</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredEmpresas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((empresa) => (
                            <StyledTableRow key={empresa.id}>
                                <StyledTableCell>{empresa.rut}</StyledTableCell>
                                <StyledTableCell>{empresa.razonSocial}</StyledTableCell>
                                <StyledTableCell>{empresa.fechaInsercion}</StyledTableCell>
                                <StyledTableCell>{empresa.identificadorUnico}</StyledTableCell>
                                <StyledTableCell>
                                    <Button variant="contained" color="primary" onClick={() => handleViewTrabajadores(empresa.id)}>
                                        Ver Trabajadores
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={() => handleEditEmpresa(empresa.id)} style={{ marginLeft: '10px' }}>
                                        Editar
                                    </Button>
                                    <Button variant="contained" color="error" onClick={() => handleDeleteEmpresa(empresa.id)} style={{ marginLeft: '10px' }}>
                                        Eliminar
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredEmpresas.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    ¡Empresa eliminada exitosamente!
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default ListPage;