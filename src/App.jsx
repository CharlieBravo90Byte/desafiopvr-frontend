
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import EmpresaList from './components/empresa/EmpresaList';
import EmpresaForm from './components/empresa/EmpresaForm';
import EditEmpresaForm from './components/empresa/EditEmpresaForm';
import TrabajadorList from './components/trabajador/TrabajadorList';
import TrabajadorForm from './components/trabajador/TrabajadorForm';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<EmpresaList />} />
          <Route path="/empresas/nuevo" element={<EmpresaForm />} />
          <Route path="/empresas/editar/:id" element={<EditEmpresaForm />} />
          <Route path="/empresas/:empresaId/trabajadores" element={<TrabajadorList />} />
          <Route path="/empresas/:empresaId/trabajadores/nuevo" element={<TrabajadorForm />} />
          <Route path="/empresas/:empresaId/trabajadores/editar/:trabajadorId" element={<TrabajadorForm />} />
    
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;