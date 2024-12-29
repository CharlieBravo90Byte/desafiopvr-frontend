import React from 'react';
import { Container, Typography, TextField, Button, Paper, Grid, IconButton } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';

const EmpresaForm = ({ empresa, setEmpresa, handleSubmit }) => {

    // Función para manejar los cambios en los campos de la empresa
    const handleEmpresaChange = (e) => {
        const { name, value } = e.target;
        setEmpresa({ ...empresa, [name]: value });
    };

    // Función para manejar los cambios en los campos de los trabajadores
    const handleTrabajadorChange = (index, e) => {
        const { name, value } = e.target;
        const nuevosTrabajadores = [...empresa.trabajadores];
        nuevosTrabajadores[index][name] = value;
        setEmpresa({ ...empresa, trabajadores: nuevosTrabajadores });
    };

    // Función para agregar un nuevo trabajador
    const addTrabajador = () => {
        setEmpresa({
            ...empresa,
            trabajadores: [...empresa.trabajadores, { rut: '', nombre: '', apellidoPaterno: '', apellidoMaterno: '', direccionFisica: '' }]
        });
    };

    // Función para eliminar un trabajador
    const removeTrabajador = (index) => {
        const nuevosTrabajadores = empresa.trabajadores.filter((_, i) => i !== index);
        setEmpresa({ ...empresa, trabajadores: nuevosTrabajadores });
    };

    return (
        <Container>
            <Paper elevation={3} style={{ padding: '16px' }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Rut de la Empresa"
                                name="rut"
                                value={empresa.rut}
                                onChange={handleEmpresaChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Razón Social"
                                name="razonSocial"
                                value={empresa.razonSocial}
                                onChange={handleEmpresaChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Fecha de Inserción"
                                name="fechaInsercion"
                                type="date"
                                value={empresa.fechaInsercion}
                                onChange={handleEmpresaChange}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Identificador Único"
                                name="identificadorUnico"
                                value={empresa.identificadorUnico}
                                onChange={handleEmpresaChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        {empresa.trabajadores.map((trabajador, index) => (
                            <React.Fragment key={index}>
                                <Grid item xs={12} container alignItems="center">
                                    <Typography variant="h6" component="h3" gutterBottom>
                                        Trabajador {index + 1}
                                    </Typography>
                                    {index > 0 && (
                                        <IconButton onClick={() => removeTrabajador(index)}>
                                            <RemoveCircleOutline />
                                        </IconButton>
                                    )}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Rut del Trabajador"
                                        name="rut"
                                        value={trabajador.rut}
                                        onChange={(e) => handleTrabajadorChange(index, e)}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Nombre"
                                        name="nombre"
                                        value={trabajador.nombre}
                                        onChange={(e) => handleTrabajadorChange(index, e)}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Apellido Paterno"
                                        name="apellidoPaterno"
                                        value={trabajador.apellidoPaterno}
                                        onChange={(e) => handleTrabajadorChange(index, e)}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Apellido Materno"
                                        name="apellidoMaterno"
                                        value={trabajador.apellidoMaterno}
                                        onChange={(e) => handleTrabajadorChange(index, e)}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Dirección Física"
                                        name="direccionFisica"
                                        value={trabajador.direccionFisica}
                                        onChange={(e) => handleTrabajadorChange(index, e)}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                            </React.Fragment>
                        ))}
                        <Grid item xs={12} style={{ textAlign: 'center' }}>
                            <Button variant="outlined" color="primary" onClick={addTrabajador} startIcon={<AddCircleOutline />}>
                                Añadir Trabajador
                            </Button>
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: 'center' }}>
                            <Button type="submit" variant="contained" color="primary">
                                {empresa.id ? 'Actualizar Empresa' : 'Registrar Empresa'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default EmpresaForm;