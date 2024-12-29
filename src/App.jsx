import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import EmpresaList from './components/empresa/EmpresaList';
import EmpresaForm from './components/empresa/EmpresaForm';
import EditEmpresaForm from './components/empresa/EditEmpresaForm';
import TrabajadorList from './components/trabajador/TrabajadorList';
import TrabajadorForm from './components/trabajador/TrabajadorForm';

/**
 * Componente principal de la aplicación
 * Fecha: 2024-12-29
 * Autor: CharlieBravo90Byte
 *
 * Define las rutas de la aplicación y envuelve los componentes
 * con el layout principal.
 */
function App() {
  return (
    <Router>
      {/* Layout principal de la aplicación */}
      <Layout>
        <Routes>
          {/* Ruta para la lista de empresas */}
          <Route path="/" element={<EmpresaList />} />
          
          {/* Ruta para el formulario de nueva empresa */}
          <Route path="/empresas/nuevo" element={<EmpresaForm />} />
          
          {/* Ruta para el formulario de edición de empresa */}
          <Route path="/empresas/editar/:id" element={<EditEmpresaForm />} />
          
          {/* Ruta para la lista de trabajadores de una empresa */}
          <Route path="/empresas/:empresaId/trabajadores" element={<TrabajadorList />} />
          
          {/* Ruta para el formulario de nuevo trabajador */}
          <Route path="/empresas/:empresaId/trabajadores/nuevo" element={<TrabajadorForm />} />
          
          {/* Ruta para el formulario de edición de trabajador */}
          <Route path="/empresas/:empresaId/trabajadores/editar/:trabajadorId" element={<TrabajadorForm />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;