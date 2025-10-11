import React from 'react';
import CursoFormulario from '../../components/formulario/crearCursoForm';
import useCrearCurso from '../../hooks/useCrearCurso';
import './cursoform.css';

const CrearCursoPage = () => {
    const {
        formData,
        mensaje,
        isLoading,
        handleChange,
        handleSubmit,
    } = useCrearCurso();

    return (
        <div className="crear-curso-container">
            <h1>Crear Nuevo Curso</h1>
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