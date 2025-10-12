import React from "react";

const CursoFormulario = ({ formData, mensaje, handleChange, handleSubmit, isLoading }) => {
  return (
    <form className="crear-curso-card" onSubmit={handleSubmit}>
      <h2>Crear Nuevo Curso</h2>

      {/* Mensajes */}
      {mensaje && (
        <p style={{ color: mensaje.type === "error" ? "red" : "green" }}>{mensaje.text}</p>
      )}

      {/* Campos del formulario */}
      <div className="campo">
        <label>Nombre del Curso:</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </div>

      <div className="campo">
        <label>Fecha de Inicio:</label>
        <input
          type="date"
          name="fecha_ini"
          value={formData.fecha_ini}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </div>

      <div className="campo">
        <label>Fecha de Fin:</label>
        <input
          type="date"
          name="fecha_fin"
          value={formData.fecha_fin}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Creando..." : "Crear Curso"}
      </button>
    </form>
  );
};

export default CursoFormulario;
