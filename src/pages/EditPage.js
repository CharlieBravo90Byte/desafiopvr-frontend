import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EmpresaForm from '../components/EmpresaForm';
import axios from 'axios';

const EditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [empresa, setEmpresa] = useState({
        rut: '',
        razonSocial: '',
        fechaInsercion: '',
        identificadorUnico: '',
        trabajadores: []
    });

    useEffect(() => {
        const fetchEmpresa = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/empresas/${id}`);
                setEmpresa(response.data);
            } catch (error) {
                console.error('Error obteniendo la empresa:', error);
            }
        };

        fetchEmpresa();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/empresas/${id}`, empresa);
            navigate('/');
        } catch (error) {
            console.error('Error actualizando la empresa:', error);
        }
    };

    return (
        <div>
            <EmpresaForm empresa={empresa} setEmpresa={setEmpresa} handleSubmit={handleSubmit} />
        </div>
    );
};

export default EditPage;