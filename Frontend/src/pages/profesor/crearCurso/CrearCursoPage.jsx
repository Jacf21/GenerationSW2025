import React from "react";
import CursoFormulario from "../../../components/formulario/crearCursoForm";
import useCrearCurso from "../../../hooks/useCrearCurso";
import "./cursoform.css";

const CrearCursoPage = () => {
  const { formData, errores, mensaje, isLoading, handleChange, handleSubmit } = useCrearCurso();

  return (
    <div className="crear-curso-container">
      <CursoFormulario
        formData={formData}
        errores={errores}
        mensaje={mensaje}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default CrearCursoPage;
