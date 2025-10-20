import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useLogin } from "../../hooks/useLogin";
import * as authService from "../../services/authService";
import { MemoryRouter } from "react-router-dom";

// ✅ Mock del servicio de login
vi.mock("../../services/authService", () => ({
  login: vi.fn(),
}));

// ✅ Mock del contexto Auth
let mockUser = null;
let mockLogin = vi.fn((data) => {
  mockUser = data;
});

vi.mock("../../context/AuthContex", () => ({
  useAuth: () => ({
    user: mockUser,
    login: mockLogin,
  }),
}));

// ✅ Mock parcial de react-router-dom
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("useLogin", () => {
  const wrapper = ({ children }) => <MemoryRouter>{children}</MemoryRouter>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockUser = null;
    mockLogin = vi.fn((data) => {
      mockUser = data;
    });
  });

  it("debe iniciar con valores iniciales vacíos", () => {
    const { result } = renderHook(() => useLogin(), { wrapper });

    expect(result.current.email).toBe("");
    expect(result.current.password).toBe("");
    expect(result.current.error).toBe("");
    expect(result.current.loading).toBe(false);
  });

  it("debe actualizar email y password", () => {
    const { result } = renderHook(() => useLogin(), { wrapper });

    act(() => {
      result.current.setEmail("test@example.com");
      result.current.setPassword("123456");
    });

    expect(result.current.email).toBe("test@example.com");
    expect(result.current.password).toBe("123456");
  });

  it("debe loguear correctamente a un admin y navegar a /admin", async () => {
    authService.login.mockResolvedValue({
      nombre: "Admin User",
      tipo: "admin",
      token: "1234",
    });

    const { result } = renderHook(() => useLogin(), { wrapper });

    await act(async () => {
      await result.current.handleLogin({ preventDefault: () => {} });
    });

    expect(mockLogin).toHaveBeenCalledWith({
      nombre: "Admin User",
      tipo: "admin",
      token: "1234",
    });
    expect(mockNavigate).toHaveBeenCalledWith("/admin");
  });

  it("debe mostrar error si falla el login", async () => {
    authService.login.mockRejectedValue(new Error("Credenciales inválidas"));

    const { result } = renderHook(() => useLogin(), { wrapper });

    await act(async () => {
      await result.current.handleLogin({ preventDefault: () => {} });
    });

    expect(result.current.error).toBe("Credenciales inválidas");
  });

  it("debe manejar el estado de loading", async () => {
    // simulamos un login con delay para capturar loading=true
    authService.login.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ nombre: "Test", tipo: "est", token: "token" }), 20)
        )
    );

    const { result } = renderHook(() => useLogin(), { wrapper });

    // handleLogin es async, entonces act async
    await act(async () => {
      await result.current.handleLogin({ preventDefault: () => {} });
    });

    // después de que termina, loading = false
    expect(result.current.loading).toBe(false);
  });
});
