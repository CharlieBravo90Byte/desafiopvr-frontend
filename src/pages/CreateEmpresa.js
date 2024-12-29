import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Paper, Grid, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateEmpresa = () => {
    const [empresa, setEmpresa] = useState({
        rut: '',
        razonSocial: '',
        fechaInsercion: '',
        identificadorUnico: '',
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEmpresa((prevEmpresa) => ({
            ...prevEmpresa,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/empresas', empresa);
            console.log('Empresa creada:', response.data);
            setOpenSnackbar(true); // Mostrar el snackbar de éxito
            setTimeout(() => {
                navigate('/'); // Redirigir después de mostrar el mensaje
            }, 2000); // Esperar 2 segundos antes de redirigir
        } catch (error) {
            console.error('Error creando la empresa:', error);
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <Container>
            <Paper elevation={3} style={{ padding: '16px', marginTop: '20px' }}>
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    Crear Empresa
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label="RUT"
                                name="rut"
                                value={empresa.rut}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Razón Social"
                                name="razonSocial"
                                value={empresa.razonSocial}
                                onChange={handleChange}
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
                                onChange={handleChange}
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
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    ¡Empresa creada exitosamente!
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default CreateEmpresa;