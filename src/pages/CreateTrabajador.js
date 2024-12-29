import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Paper, Grid } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateTrabajador = () => {
    const [trabajador, setTrabajador] = useState({
        rut: '',
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        direccionFisica: '',
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setTrabajador((prevTrabajador) => ({
            ...prevTrabajador,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/trabajadores', trabajador);
            console.log('Trabajador creado:', response.data);
            navigate('/listar-trabajadores');
        } catch (error) {
            console.error('Error creando el trabajador:', error);
        }
    };

    return (
        <Container>
            <Paper elevation={3} style={{ padding: '16px', marginTop: '20px' }}>
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    Crear Trabajador
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label="Rut del Trabajador"
                                name="rut"
                                value={trabajador.rut}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Nombre"
                                name="nombre"
                                value={trabajador.nombre}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Apellido Paterno"
                                name="apellidoPaterno"
                                value={trabajador.apellidoPaterno}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Apellido Materno"
                                name="apellidoMaterno"
                                value={trabajador.apellidoMaterno}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Dirección Física"
                                name="direccionFisica"
                                value={trabajador.direccionFisica}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: 'center' }}>
                            <Button type="submit" variant="contained" color="primary">
                                Crear
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default CreateTrabajador;