import React, { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import useTopicos from "../../../../hooks/useTopico";
import CrearTopico from "../components/CrearTopico/CrearTopico";
import EditarTopico from "../components/EditarTopico/EditarTopico";
import EliminarTopico from "../components/EliminarTopico/EliminarTopico";
import "./TopicosList.css";

export default function ListarTopicos() {
  const { topicos, loading, cargarTopicos } = useTopicos();
  const [modal, setModal] = useState(null);
  const [topicoSeleccionado, setTopicoSeleccionado] = useState(null);
  const [actualizando, setActualizando] = useState(false);

  // Cargar tópicos inicialmente
  useEffect(() => {
    cargarTopicos();
  }, []);

  // Recargar cuando se cierra un modal
  useEffect(() => {
    if (!modal && actualizando) {
      cargarTopicos();
      setActualizando(false);
    }
  }, [modal, actualizando]);

  const abrirModal = (tipo, topico = null) => {
    setTopicoSeleccionado(topico);
    setModal(tipo);
  };

  const cerrarModal = () => {
    setActualizando(true); // Marca que necesitamos actualizar
    setModal(null);
    setTopicoSeleccionado(null);
  };

  if (loading) {
    return <div className="loading">Cargando tópicos...</div>;
  }

  return (
    <div className="listar-topicos">
      <div className="header">
        <h2>Gestión de Tópicos</h2>
        <button className="btn-crear" onClick={() => abrirModal("crear")}>
          <FaPlus /> Nuevo Tópico
        </button>
      </div>

      <div className="tabla-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Orden</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {topicos.map((topico) => (
              <tr key={topico.id}>
                <td>{topico.id}</td>
                <td>{topico.titulo}</td>
                <td>{topico.orden}</td>
                <td>{topico.descripcion}</td>
                <td className="acciones">
                  {/* <button onClick={() => abrirModal("ver", topico)} className="btn-ver">
                    <FaEye />
                  </button> */}
                  <button onClick={() => abrirModal("editar", topico)} className="btn-editar">
                    <FaEdit />
                  </button>
                  <button onClick={() => abrirModal("eliminar", topico)} className="btn-eliminar">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal === "crear" && <CrearTopico onClose={cerrarModal} />}
      {modal === "editar" && <EditarTopico topico={topicoSeleccionado} onClose={cerrarModal} />}
      {modal === "eliminar" && <EliminarTopico topico={topicoSeleccionado} onClose={cerrarModal} />}
    </div>
  );
}
