import React from "react";
import "./gestionarUsers.css";
import { FaCheck, FaTimes } from "react-icons/fa"; // Importar iconos
import CustomTable from "../../../components/customTable";
import { useUsers } from "../../../hooks/useUsers";

const GestionarUsers = () => {
  const { users, filters, setFilters, selectedUser, setSelectedUser, toggleAprobado, loading } =
    useUsers();

  const columns = [
    { key: "id", label: "ID" },
    { key: "nombre", label: "Nombre" },
    { key: "email", label: "Email" },
    { key: "tipo", label: "Tipo" },
    { key: "aprobado", label: "Estado" },
  ];

  const renderEstado = (aprobado) => {
    return (
      <span className={`estado-badge ${aprobado ? "aprobado" : "pendiente"}`}>
        {aprobado ? "Aprobado" : "Pendiente"}
      </span>
    );
  };

  return (
    <div className="page-user-container">
      <h1>Gestión de Usuarios</h1>

      <div className="filters-container">
        <select
          value={filters.tipo}
          onChange={(e) => setFilters((f) => ({ ...f, tipo: e.target.value }))}
        >
          <option value="todos">Todos los tipos</option>
          <option value="profesor">Profesores</option>
          <option value="est">Estudiantes</option>
          <option value="edit">Profesores Editores</option>
        </select>

        <select
          value={filters.aprobado}
          onChange={(e) => setFilters((f) => ({ ...f, aprobado: e.target.value }))}
        >
          <option value="todos">Todos</option>
          <option value="true">Aprobados</option>
          <option value="false">No aprobados</option>
        </select>

        <button onClick={toggleAprobado} disabled={!selectedUser}>
          Cambiar estado
        </button>
      </div>

      {loading ? (
        <p className="loading">Cargando usuarios...</p>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.key}>{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => setSelectedUser(row)}
                  className={selectedUser?.id === row.id ? "selected" : ""}
                >
                  {columns.map((col) => (
                    <td key={col.key}>
                      {col.key === "aprobado"
                        ? renderEstado(row[col.key])
                        : row[col.key]?.toString()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GestionarUsers;
