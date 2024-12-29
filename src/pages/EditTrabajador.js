import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Paper, Grid } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditTrabajador = () => {
    const { id, trabajadorId } = useParams();
    const navigate = useNavigate();
    const [trabajador, setTrabajador] = useState({
        rut: '',
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        direccionFisica: '',
    });

    useEffect(() => {
        const fetchTrabajador = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/empresas/${id}/trabajadores/${trabajadorId}`);
                setTrabajador(response.data);
            } catch (error) {
                console.error('Error fetching trabajador:', error);
            }
        };

        fetchTrabajador();
    }, [id, trabajadorId]);

    const handleTrabajadorChange = (e) => {
        const { name, value } = e.target;
        setTrabajador({ ...trabajador, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/empresas/${id}/trabajadores/${trabajadorId}`, trabajador);
            navigate(`/empresa/${id}`);
        } catch (error) {
            console.error('Error updating trabajador:', error);
        }
    };

    return (
        <Container>
            <Paper elevation={3} style={{ padding: '16px' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Editar Trabajador
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Rut del Trabajador"
                                name="rut"
                                value={trabajador.rut}
                                onChange={handleTrabajadorChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Nombre"
                                name="nombre"
                                value={trabajador.nombre}
                                onChange={handleTrabajadorChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Apellido Paterno"
                                name="apellidoPaterno"
                                value={trabajador.apellidoPaterno}
                                onChange={handleTrabajadorChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Apellido Materno"
                                name="apellidoMaterno"
                                value={trabajador.apellidoMaterno}
                                onChange={handleTrabajadorChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Dirección Física"
                                name="direccionFisica"
                                value={trabajador.direccionFisica}
                                onChange={handleTrabajadorChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: 'center' }}>
                            <Button type="submit" variant="contained" color="primary">
                                Actualizar Trabajador
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default EditTrabajador;