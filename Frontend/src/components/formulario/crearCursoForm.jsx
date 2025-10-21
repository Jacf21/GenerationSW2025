import React from "react";

const CursoFormulario = ({ formData, errores, mensaje, handleChange, handleSubmit, isLoading }) => {
  return (
    <form className="crear-curso-card" onSubmit={handleSubmit} role="form">
      <h2>Crear Nuevo Curso</h2>

      {/* Mensajes */}
      {mensaje && (
        <p style={{ color: mensaje.type === "error" ? "red" : "green" }}>{mensaje.text}</p>
      )}

      {/* Campos del formulario */}
      <div className="campo">
        <label htmlFor="nombre">Nombre del Curso:</label>
        <input
          id="nombre"
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
        {errores?.nombre && <p className="error">{errores.nombre}</p>}
      </div>

      <div className="campo">
        <label htmlFor="fecha_ini">Fecha de Inicio:</label>
        <input
          id="fecha_ini"
          type="date"
          name="fecha_ini"
          value={formData.fecha_ini}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
        {errores?.fecha_ini && <p className="error">{errores.fecha_ini}</p>}
      </div>

      <div className="campo">
        <label htmlFor="fecha_fin">Fecha de Fin:</label>
        <input
          id="fecha_fin"
          type="date"
          name="fecha_fin"
          value={formData.fecha_fin}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
        {errores?.fecha_fin && <p className="error">{errores.fecha_fin}</p>}
      </div>

      <div className="campo">
        <label htmlFor="descripcion">Descripción del Curso:</label>
        <input
          id="descripcion"
          type="text"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
        {errores?.descripcion && <p className="error">{errores.descripcion}</p>}
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Creando..." : "Crear Curso"}
      </button>
    </form>
  );
};

export default CursoFormulario;
