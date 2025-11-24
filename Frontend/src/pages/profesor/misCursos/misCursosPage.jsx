import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaCopy } from "react-icons/fa";
import useMisCursos from "../../../hooks/useMisCursos";
import EditarCurso from "../cursos/components/EditarCurso/EditarCurso.jsx";
import DesactivarCurso from "../cursos/components/DesactivarCurso/DesactivarCurso.jsx";
import MensajesTopicos from "../../editor/topicos/ListarTopicos/MensajesTopicos/MensajesTopicos.jsx";
import "./misCursosPage.css";
import "../../editor/topicos/ListarTopicos/TopicosList.css";

const MisCursosPage = () => {
  const { cursos, isLoading, error, recargar } = useMisCursos();
  const [modal, setModal] = useState(null);
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [actualizando, setActualizando] = useState(false);
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [showCopyToast, setShowCopyToast] = useState(false);

  useEffect(() => {
    if (!modal && actualizando) {
      recargar();
      setActualizando(false);
    }
  }, [modal, actualizando, recargar]);

  const abrirModal = (tipo, curso = null) => {
    setCursoSeleccionado(curso);
    setModal(tipo);
  };

  const cerrarModal = () => {
    setActualizando(true);
    setModal(null);
    setCursoSeleccionado(null);
  };

  const cursosFiltrados = cursos
    .filter((c) => {
      if (filtroEstado === "activos") return c.activo !== false;
      if (filtroEstado === "inactivos") return c.activo === false;
      return true;
    })
    .filter((c) => {
      const q = busqueda.trim().toLowerCase();
      if (!q) return true;
      return (
        (c.nombre || "").toLowerCase().includes(q) ||
        (c.descripcion || "").toLowerCase().includes(q) ||
        (c.codigo || "").toLowerCase().includes(q)
      );
    });

  if (isLoading) return <div className="loading">Cargando cursos...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="listar-topicos">
      <div className="header">
        <h2>Gestión de Cursos</h2>
      </div>

      <div className="filtros">
        <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
          <option value="todos">Todos</option>
          <option value="activos">Activos</option>
          <option value="inactivos">Inactivos</option>
        </select>
        <input
          type="text"
          placeholder="Buscar por nombre, descripción o código"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="tabla-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Código</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cursosFiltrados.length === 0 && (
              <tr>
                <td colSpan={8} style={{ textAlign: "center", color: "var(--texto-secundario)" }}>
                  Sin cursos
                </td>
              </tr>
            )}
            {cursosFiltrados.map((curso) => (
              <tr key={curso.id}>
                <td>{curso.id}</td>
                <td>{curso.nombre}</td>
                <td>{curso.descripcion}</td>
                <td>{new Date(curso.fecha_ini).toLocaleDateString()}</td>
                <td>{new Date(curso.fecha_fin).toLocaleDateString()}</td>
                <td>
                  <div className="codigo-cell">
                    <span className="codigo-text">{curso.codigo}</span>
                    <button
                      className="btn-copiar"
                      title="Copiar código"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(String(curso.codigo || ""));
                          setShowCopyToast(true);
                          setTimeout(() => setShowCopyToast(false), 1500);
                        } catch (e) {
                          alert("No se pudo copiar el código");
                        }
                      }}
                    >
                      <FaCopy />
                    </button>
                  </div>
                </td>
                <td>
                  <span className={`badge ${curso.activo === false ? "badge-inactivo" : "badge-activo"}`}>
                    {curso.activo === false ? "Inactivo" : "Activo"}
                  </span>
                </td>
                <td className="acciones">
                  <button onClick={() => abrirModal("editar", curso)} className="btn-editar">
                    <FaEdit />
                  </button>
                  <button onClick={() => abrirModal("desactivar", curso)} className="btn-eliminar">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showCopyToast && (
          <MensajesTopicos message="Código copiado" type="success" onClose={() => setShowCopyToast(false)} />
        )}
      </div>

      {modal === "editar" && (
        <EditarCurso curso={cursoSeleccionado} onClose={cerrarModal} onSuccess={recargar} />
      )}
      {modal === "desactivar" && (
        <DesactivarCurso curso={cursoSeleccionado} onClose={cerrarModal} onSuccess={recargar} />
      )}
    </div>
  );
};

export default MisCursosPage;
