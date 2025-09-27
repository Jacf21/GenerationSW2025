import React, { useState } from 'react';
import CursoFormulario from '../../componentes/formularios/crearCursoForm';
import { crearCursoAPI } from '../../servicios/cursoService';
import './cursoform.css';

const CrearCursoPage = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        fecha_ini: '',
        fecha_fin: '',
        codigo: ''
    });
    const [mensaje, setMensaje] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Estado para el botón de carga

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje(null);
        setIsLoading(true);

        try {
            // 1. Llamada al servicio de red
            const data = await crearCursoAPI(formData);

            // 2. Manejo de éxito
            setMensaje({ 
                type: 'success', 
                text: `Curso "${data.curso.nombre}" creado con éxito!` 
            });
            setFormData({ nombre: '', fecha_ini: '', fecha_fin: '', codigo: '' }); // Limpiar formulario
            
        } catch (error) {
            // 3. Manejo de error
            console.error('Error en la página:', error);
            setMensaje({ 
                type: 'error', 
                text: error.message || 'Error de conexión.' 
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="crear-curso-container">
            {/* Delega la UI al componente de formulario, pasando el estado y las funciones */}
            <CursoFormulario
                formData={formData}
                mensaje={mensaje}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
            />
        </div>
    );
};

export default CrearCursoPage;