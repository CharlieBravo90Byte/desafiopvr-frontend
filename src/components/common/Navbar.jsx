import { AppBar, Toolbar, Typography } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: '#283593', // Dark blue color
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' // Subtle shadow
      }}
    >
      <Toolbar sx={{ justifyContent: 'center' }}> {/* Center content */}
        <Typography 
          variant="h5" 
          sx={{ 
            fontFamily: 'Roboto, Arial, sans-serif',
            fontWeight: 600,
            letterSpacing: 1.2,
            color: '#ffffff',
            textAlign: 'center',
            padding: '12px 0'
          }}
        >
          Gestión de Empresas Previred
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;