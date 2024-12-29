import React from 'react';
import { Container, Table, TableHead, TableBody, TableRow, TableCell, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import '../styles/styles.css'; // Importa el archivo de estilos global

const EmpresaList = ({ empresas, handleEmpresaClick, handleDelete }) => {
    return (
        <Container>
            <Paper elevation={3}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Rut</TableCell>
                            <TableCell>Razón Social</TableCell>
                            <TableCell>Fecha Inserción</TableCell>
                            <TableCell>Identificador Único</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {empresas.length > 0 ? (
                            empresas.map(empresa => (
                                <TableRow key={empresa.id}>
                                    <TableCell>{empresa.rut}</TableCell>
                                    <TableCell>{empresa.razonSocial}</TableCell>
                                    <TableCell>{empresa.fechaInsercion}</TableCell>
                                    <TableCell>{empresa.identificadorUnico}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" onClick={() => handleEmpresaClick(empresa)}>
                                            Ver Trabajadores
                                        </Button>
                                        <Button component={Link} to={`/edit/${empresa.id}`} variant="contained" color="secondary" style={{ marginLeft: '8px' }}>
                                            Editar
                                        </Button>
                                        <Button variant="contained" color="error" onClick={() => handleDelete(empresa.id)} style={{ marginLeft: '8px' }}>
                                            Eliminar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan="5" align="center">No se encontraron empresas.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Paper>
        </Container>
    );
};

export default EmpresaList;