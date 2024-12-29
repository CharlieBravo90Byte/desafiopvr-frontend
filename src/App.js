// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import EmpresaList from './components/empresa/EmpresaList';
import EmpresaForm from './components/empresa/EmpresaForm';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<EmpresaList />} />
          <Route path="/empresas/nuevo" element={<EmpresaForm />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;