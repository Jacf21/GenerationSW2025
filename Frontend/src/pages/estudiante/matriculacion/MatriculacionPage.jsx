import { useEffect, useState } from "react";
import { obtenerMisMatriculas, matricularsePorCodigo } from "../../../services/matriculaService.js";
import { useAuth } from "../../../context/AuthContex";
import "./MatriculacionPage.css";

const MatriculacionPage = () => {
  const { user } = useAuth();
  const id_usuario = user?.id;
  const [codigo, setCodigo] = useState("");
  const [matriculas, setMatriculas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  const cargar = async () => {
    if (!id_usuario) return;
    const resp = await obtenerMisMatriculas(id_usuario);
    setMatriculas(resp.data || []);
  };

  useEffect(() => {
    cargar();
  }, [id_usuario]);

  const onMatricular = async (e) => {
    e.preventDefault();
    if (!codigo.trim()) return;
    setLoading(true);
    setMensaje(null);
    try {
      const resp = await matricularsePorCodigo(codigo.trim(), id_usuario);
      setMensaje({ tipo: "success", texto: resp.message || "Matriculación exitosa" });
      setCodigo("");
      await cargar();
    } catch (err) {
      const texto = err?.message ?? "No se pudo matricular";
      setMensaje({ tipo: "error", texto });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="matriculacion-container">
      <h2>Matriculación a cursos</h2>
      <form className="matriculacion-form" onSubmit={onMatricular}>
        <label>Código del curso</label>
        <div className="codigo-input-row">
          <input
            type="text"
            placeholder="Ingresa el código del curso"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />
          <button type="submit" disabled={loading} className="btn-matricular">
            {loading ? "Matriculando..." : "Matricularme"}
          </button>
        </div>
      </form>

      {mensaje && (
        <p className={`alert ${mensaje.tipo === "success" ? "alert-success" : "alert-error"}`}>
          {mensaje.texto}
        </p>
      )}

      <h3>Mis cursos matriculados</h3>
      <table className="tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Código</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {matriculas.length === 0 && (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", color: "var(--texto-secundario)" }}>
                Sin cursos
              </td>
            </tr>
          )}
          {matriculas.map((m) => (
            <tr key={m.id}>
              <td>{m.nombre}</td>
              <td>{m.descripcion}</td>
              <td>{new Date(m.fecha_ini).toLocaleDateString()}</td>
              <td>{new Date(m.fecha_fin).toLocaleDateString()}</td>
              <td>{m.codigo}</td>
              <td>
                <span className={`badge ${m.activo === false ? "badge-inactivo" : "badge-activo"}`}>
                  {m.activo === false ? "Inactivo" : "Activo"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatriculacionPage;
