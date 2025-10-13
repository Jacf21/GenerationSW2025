import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest"; // ✅ IMPORTAR VI
import useCrearCurso from "../../hooks/useCrearCurso";
import * as cursoService from "../../services/cursoService";

// ✅ Mock del servicio
vi.mock("../../services/cursoService", () => ({
  crearCursoAPI: vi.fn(),
}));

describe("useCrearCurso", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // ✅ reinicia mocks
  });

  it("debe inicializar el estado correctamente", () => {
    const { result } = renderHook(() => useCrearCurso());
    expect(result.current.formData).toEqual({
      nombre: "",
      fecha_ini: "",
      fecha_fin: "",
      descripcion: "",
    });
    expect(result.current.mensaje).toBe(null);
    expect(result.current.errores).toEqual({});
    expect(result.current.isLoading).toBe(false);
  });

  it("debe actualizar formData al llamar a handleChange", () => {
    const { result } = renderHook(() => useCrearCurso());

    act(() => {
      result.current.handleChange({
        target: { name: "nombre", value: "Curso de React" },
      });
    });

    expect(result.current.formData.nombre).toBe("Curso de React");
  });

  it("debe validar y no enviar si hay errores", async () => {
    const { result } = renderHook(() => useCrearCurso());

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: () => {} });
    });

    expect(result.current.errores).toHaveProperty("nombre");
    expect(cursoService.crearCursoAPI).not.toHaveBeenCalled();
  });

  it("debe manejar envío exitoso", async () => {
    cursoService.crearCursoAPI.mockResolvedValue({
      curso: { nombre: "React Básico", codigo: "ABC123" },
    });

    const { result } = renderHook(() => useCrearCurso());

    act(() => {
      result.current.setFormData({
        nombre: "React Básico",
        fecha_ini: "2024-01-10",
        fecha_fin: "2024-01-15",
        descripcion: "Curso de react basico para aprender mucho mas de este frendwork",
      });
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: () => {} });
    });

    expect(cursoService.crearCursoAPI).toHaveBeenCalledTimes(1);
    expect(result.current.mensaje?.type).toBe("success");
  });

  it("debe manejar error del servicio", async () => {
    cursoService.crearCursoAPI.mockRejectedValue(new Error("Fallo de servidor"));

    const { result } = renderHook(() => useCrearCurso());

    act(() => {
      result.current.setFormData({
        nombre: "Node.js",
        fecha_ini: "2024-02-01",
        fecha_fin: "2024-02-10",
        descripcion: "Curso de react basico para aprender mucho mas de este frendwork",
      });
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: () => {} });
    });

    expect(result.current.mensaje?.type).toBe("error");
    expect(result.current.mensaje?.text).toBe("Fallo de servidor");
  });
});
