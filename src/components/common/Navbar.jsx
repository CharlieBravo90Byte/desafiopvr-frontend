// src/components/common/Navbar.jsx
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Gestión de Empresas Previder
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Listado Empresas
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;