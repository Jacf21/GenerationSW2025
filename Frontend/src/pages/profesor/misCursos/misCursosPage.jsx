import React from "react";
import useMisCursos from "../../../hooks/useMisCursos";
import CustomTable from "../../../components/customTable";
import "./misCursosPage.css";

const MisCursosPage = () => {
  const { cursos, isLoading, error, selectedCurso, handleRowSelect } = useMisCursos();

  const cursosFormateados = cursos.map((curso) => ({
    ...curso,
    fecha_ini: new Date(curso.fecha_ini).toLocaleDateString(),
    fecha_fin: new Date(curso.fecha_fin).toLocaleDateString(),
  }));

  const columns = [
    { key: "id", label: "ID" },
    { key: "nombre", label: "Nombre" },
    { key: "descripcion", label: "Descripción" },
    { key: "fecha_ini", label: "Fecha Inicio" },
    { key: "fecha_fin", label: "Fecha Fin" },
    { key: "codigo", label: "Codigo" },
  ];

  if (isLoading) return <p className="text-gray-600">Cargando cursos...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="mis-cursos-container">
      <h1>Mis Cursos</h1>

      {isLoading && <p className="loading">Cargando cursos...</p>}
      {error && <p className="error">{error}</p>}

      {!isLoading && !error && (
        <>
          {cursos.length === 0 ? (
            <p className="no-cursos">No tienes cursos registrados.</p>
          ) : (
            <div className="table-wrapper">
              <CustomTable
                columns={columns}
                data={cursosFormateados}
                onRowSelect={handleRowSelect}
                selectedRowId={selectedCurso?.id}
              />
            </div>
          )}

          {selectedCurso && (
            <div className="curso-detalle">
              <h2>Curso seleccionado</h2>
              <p>
                <strong>Nombre:</strong> {selectedCurso.nombre}
              </p>
              <p>
                <strong>Descripción:</strong> {selectedCurso.descripcion}
              </p>
              <p>
                <strong>Fechas:</strong> {selectedCurso.fecha_ini} — {selectedCurso.fecha_fin}
              </p>
              <p>
                <strong>Código:</strong> {selectedCurso.codigo}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MisCursosPage;
