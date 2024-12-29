import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListPage from './pages/ListPage';
import EmpresaEdit from './components/EmpresaEdit';
import EditTrabajador from './pages/EditTrabajador';
import CreateEmpresa from './pages/CreateEmpresa';
import NavBar from './components/NavBar';
import { Box } from '@mui/material';
import ListTrabajadores from './pages/ListTrabajadores';
import CreateTrabajador from './pages/CreateTrabajador';

const App = () => {
    return (
        <Router>
            <NavBar />
            <Box sx={{ marginTop: 8 }}>
                <Routes>
                    <Route path="/" element={<ListPage />} />
                    <Route path="/create-empresa" element={<CreateEmpresa/>} />
                    <Route path="/edit/:id" element={<EmpresaEdit/>} />
                    <Route path="/empresa/:empresaId/trabajadores" element={<ListTrabajadores/>} />
                    <Route path="/crear-trabajador/:empresaId" element={<CreateTrabajador />} />
                    <Route path="/empresa/:empresaId/edit-trabajador/:trabajadorId" element={<EditTrabajador/>} />

                </Routes>
            </Box>
        </Router>
    );
};

export default App;