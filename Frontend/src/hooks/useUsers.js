import { useEffect, useState } from "react";
import { getUsers, setAprobadoUser } from "../services/userService";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filters, setFilters] = useState({ tipo: "todos", aprobado: "todos" });
  const [loading, setLoading] = useState(false);

  // Obtener usuarios
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filtros
  useEffect(() => {
    let temp = [...users];
    if (filters.tipo !== "todos") {
      temp = temp.filter((u) => u.tipo === filters.tipo);
    }
    if (filters.aprobado !== "todos") {
      const bool = filters.aprobado === "true";
      temp = temp.filter((u) => u.aprobado === bool);
    }
    setFilteredUsers(temp);
  }, [filters, users]);

  // Cambiar aprobación
  const toggleAprobado = async () => {
    if (!selectedUser) return;
    try {
      await setAprobadoUser(selectedUser.id);
      await fetchUsers(); // refresca lista
    } catch (error) {
      console.error("Error al cambiar aprobación:", error);
    }
  };

  return {
    users: filteredUsers,
    loading,
    filters,
    setFilters,
    selectedUser,
    setSelectedUser,
    toggleAprobado,
  };
};
