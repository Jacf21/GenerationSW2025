import React, { useState } from "react";
import { FaTrash, FaEdit, FaEye, FaPlus } from "react-icons/fa";
import useTopicos from "../../../../hooks/useTopico.js";
import useContenidos from "../../../../hooks/useContenidos.js";

import AddContenidoModal from "../components/addContenido/addContenido.jsx";
import EditContenidoModal from "../components/editContenido/editContenido.jsx";
import DeleteContenidoModal from "../components/deleteContenido/deleteContenido.jsx";
import ViewContenidoModal from "../components/viewContenido/viewContenido.jsx";

import "./GestionarContenido.css";

export default function GestionarContenido() {
  const { topicos } = useTopicos();
  const [selectedTopico, setSelectedTopico] = useState("");
  const { contenidos, fetchContenidos, obtenerNombreArchivo, loadingContenidos } =
    useContenidos(selectedTopico);

  // Un solo estado para controlar qué modal se abre
  const [modal, setModal] = useState(null);
  const [contenidoSeleccionado, setContenidoSeleccionado] = useState(null);

  const abrirModal = (tipo, contenido = null) => {
    setContenidoSeleccionado(contenido);
    setModal(tipo);
  };

  const cerrarModal = () => {
    setModal(null);
    setContenidoSeleccionado(null);
  };

  return (
    <div className="gestionar-contenido">
      <div className="header">
        <h2>Gestión de Contenidos</h2>
        <div className="selector-topico">
          <label>Seleccionar Tópico:</label>
          <select value={selectedTopico} onChange={(e) => setSelectedTopico(e.target.value)}>
            <option value="">-- Selecciona un tópico --</option>
            {topicos.map((topico) => (
              <option key={topico.id} value={topico.id}>
                {topico.titulo}
              </option>
            ))}
          </select>

          <button className="btn-crear" onClick={() => abrirModal("crear")}>
            <FaPlus /> Agregar Contenido
          </button>
        </div>
      </div>

      <div className="tabla-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tópico</th>
              <th>Tipo</th>
              <th>Archivo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loadingContenidos ? (
              <tr>
                <td colSpan="5" className="text-center">
                  Cargando contenidos...
                </td>
              </tr>
            ) : contenidos.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  No hay contenidos para este tópico.
                </td>
              </tr>
            ) : (
              contenidos.map((contenido) => (
                <tr key={contenido.id}>
                  <td>{contenido.id}</td>
                  <td>{topicos.find((t) => t.id === contenido.id_topico)?.titulo || "—"}</td>
                  <td>{contenido.tipo}</td>
                  <td>{obtenerNombreArchivo(contenido.storage_path)}</td>
                  <td className="acciones">
                    <button onClick={() => abrirModal("ver", contenido)} className="btn-ver">
                      <FaEye />
                    </button>
                    <button onClick={() => abrirModal("editar", contenido)} className="btn-editar">
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => abrirModal("eliminar", contenido)}
                      className="btn-eliminar"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modales */}
      {modal === "crear" && (
        <AddContenidoModal topicos={topicos} onClose={cerrarModal} onSuccess={fetchContenidos} />
      )}
      {modal === "editar" && (
        <EditContenidoModal
          onClose={cerrarModal}
          onSuccess={fetchContenidos}
          contenido={contenidoSeleccionado}
        />
      )}
      {modal === "eliminar" && (
        <DeleteContenidoModal
          onClose={cerrarModal}
          onSuccess={fetchContenidos}
          contenido={contenidoSeleccionado}
        />
      )}
      {modal === "ver" && (
        <ViewContenidoModal onClose={cerrarModal} contenido={contenidoSeleccionado} />
      )}
    </div>
  );
}
