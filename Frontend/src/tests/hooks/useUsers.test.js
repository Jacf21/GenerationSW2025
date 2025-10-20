import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useUsers } from "../../hooks/useUsers";
import * as userService from "../../services/userService";

// ✅ Mock del servicio
vi.mock("../../services/userService", () => ({
  getUsers: vi.fn(),
  setAprobadoUser: vi.fn(),
}));

describe("useUsers", () => {
  const mockUsers = [
    { id: 1, nombre: "Juan", tipo: "user", aprobado: false },
    { id: 2, nombre: "Ana", tipo: "admin", aprobado: true },
    { id: 3, nombre: "Luis", tipo: "user", aprobado: true },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    userService.getUsers.mockResolvedValue(mockUsers);
  });

  it("debe cargar usuarios correctamente", async () => {
    const { result } = renderHook(() => useUsers());

    expect(result.current.loading).toBe(true);

    // Esperar que termine el useEffect
    await act(async () => {});

    expect(userService.getUsers).toHaveBeenCalledTimes(1);
    expect(result.current.users.length).toBe(3);
    expect(result.current.loading).toBe(false);
  });

  it("debe filtrar por tipo de usuario", async () => {
    const { result } = renderHook(() => useUsers());

    await act(async () => {});

    act(() => {
      result.current.setFilters({ tipo: "user", aprobado: "todos" });
    });

    expect(result.current.users.length).toBe(2);
  });

  it("debe filtrar por estado de aprobación", async () => {
    const { result } = renderHook(() => useUsers());

    await act(async () => {});

    act(() => {
      result.current.setFilters({ tipo: "todos", aprobado: "true" });
    });

    expect(result.current.users.length).toBe(2);
  });

  it("debe cambiar aprobación de usuario", async () => {
    userService.setAprobadoUser.mockResolvedValue({ success: true });

    const { result } = renderHook(() => useUsers());

    await act(async () => {});

    act(() => {
      result.current.setSelectedUser({ id: 1 });
    });

    await act(async () => {
      await result.current.toggleAprobado();
    });

    expect(userService.setAprobadoUser).toHaveBeenCalledWith(1);
    expect(userService.getUsers).toHaveBeenCalledTimes(2); // Se llama de nuevo para refrescar
  });

  it("no debe llamar toggleAprobado si no hay usuario seleccionado", async () => {
    const { result } = renderHook(() => useUsers());

    await act(async () => {});
    await act(async () => {
      await result.current.toggleAprobado();
    });

    expect(userService.setAprobadoUser).not.toHaveBeenCalled();
  });
});
