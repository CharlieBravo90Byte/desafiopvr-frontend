import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TablePagination, TextField, IconButton, Snackbar, Alert } from '@mui/material';
import { Search } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Estilos personalizados para la tabla
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

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

const ListTrabajadores = ({ empresaId }) => {
    const [trabajadores, setTrabajadores] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredTrabajadores, setFilteredTrabajadores] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTrabajadores = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/empresas/${empresaId}/trabajadores`);
                setTrabajadores(response.data);
                setFilteredTrabajadores(response.data);
            } catch (error) {
                console.error('Error fetching trabajadores:', error);
            }
        };

        fetchTrabajadores();
    }, [empresaId]);

    const handleSearchChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = trabajadores.filter(trabajador =>
            trabajador.nombre.toLowerCase().includes(query) ||
            trabajador.apellido.toLowerCase().includes(query) ||
            trabajador.identificadorUnico.toLowerCase().includes(query)
        );
        setFilteredTrabajadores(filtered);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleCreateTrabajador = () => {
        navigate(`/crear-trabajador/${empresaId}`); // Redirige al formulario de creación de trabajador
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
                Lista de Trabajadores
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleCreateTrabajador}
                style={{ marginBottom: '16px' }}
            >
                Crear Trabajador
            </Button>
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
                            <StyledTableCell>Rut</StyledTableCell>
                            <StyledTableCell>Nombre</StyledTableCell>
                            <StyledTableCell>Apellido Paterno</StyledTableCell>
                            <StyledTableCell>Apellido Materno</StyledTableCell>
                            <StyledTableCell>Dirección Física</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTrabajadores.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((trabajador) => (
                            <StyledTableRow key={trabajador.id}>
                                <StyledTableCell>{trabajador.rut}</StyledTableCell>
                                <StyledTableCell>{trabajador.nombre}</StyledTableCell>
                                <StyledTableCell>{trabajador.apellidoPaterno}</StyledTableCell>
                                <StyledTableCell>{trabajador.apellidoMaterno}</StyledTableCell>
                                <StyledTableCell>{trabajador.direccionFisica}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredTrabajadores.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </Container>
    );
};

export default ListTrabajadores;