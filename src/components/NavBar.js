import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#1976d2' }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Gestión de Empresas Previred
                </Typography>
                <Box>
                    <Button 
                        color="inherit" 
                        component={Link} 
                        to="/" 
                        sx={{ marginRight: 2, backgroundColor: '#f57c00', '&:hover': { backgroundColor: '#ef6c00' } }}
                    >
                        Listar Empresas
                    </Button>
                    <Button 
                        color="inherit" 
                        component={Link} 
                        to="/create-empresa" 
                        sx={{ backgroundColor: '#4caf50', '&:hover': { backgroundColor: '#43a047' } }}
                    >
                        Crear Empresa
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;