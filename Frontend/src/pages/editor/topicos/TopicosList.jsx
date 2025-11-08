import { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- Importar useNavigate
import { FaEye, FaEdit, FaTrash } from "react-icons/fa"; //Iconos
import useTopicos from "../../../hooks/useTopico.js";
import "./TopicoList.css";

export default function topicoList() {
  const { topicos, loading } = useTopicos();
  const [buscar, setBuscar] = useState("");
  const [filtro, setFiltro] = useState("todos");
  const navigate = useNavigate(); // <-- Hook para navegar

  if (loading) return <p className="loading-text">Cargando...</p>;

  const topicosFiltrados = topicos.filter((t) => {
    const texto = (t.titulo + (t.descripcion || "")).toLowerCase();
    const busca = buscar.toLowerCase();
    const pasaFiltro = filtro === "todos" || t.estado === filtro;
    return texto.includes(busca) && pasaFiltro;
  });

  return (
    <div className="topicos-page">
      <div className="topicos-header">
        <h1>Lista de Tópicos</h1>
        <div className="header-actions">
          <button className="btn btn-nuevo" onClick={() => navigate("/crear-topico")}>
            Nuevo Tópico
          </button>
        </div>
      </div>

      {/* Buscador y filtros */}
      <div className="topicos-filtros">
        <input
          type="text"
          placeholder="Buscar por título o descripción..."
          value={buscar}
          onChange={(e) => setBuscar(e.target.value)}
        />
        <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
          <option value="todos">Todos</option>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
      </div>

      {/* Tabla */}
      <div className="tabla-container">
        <table className="tabla-profesional">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Descripción</th>
              <th>Orden</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {topicosFiltrados.length > 0 ? (
              topicosFiltrados.map((t) => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{t.titulo}</td>
                  <td>{t.descripcion || "—"}</td>
                  <td>{t.orden}</td>
                  <td className="acciones">
                    <button className="btn btn-ver" data-tooltip="Ver">
                      <FaEye />
                    </button>
                    <button className="btn btn-editar" data-tooltip="Editar">
                      <FaEdit />
                    </button>
                    <button className="btn btn-eliminar" data-tooltip="Eliminar">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="sin-topicos">
                  No hay tópicos creados aún.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
