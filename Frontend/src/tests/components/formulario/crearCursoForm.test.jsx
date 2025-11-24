import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CursoFormulario from "../../../components/formulario/crearCursoForm";

describe("CursoFormulario", () => {
  const mockHandleChange = vi.fn();
  const mockHandleSubmit = vi.fn((e) => e.preventDefault());
  const baseFormData = {
    nombre: "Curso de Prueba",
    fecha_ini: "2025-10-01",
    fecha_fin: "2025-10-30",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza correctamente los campos del formulario", () => {
    render(
      <CursoFormulario
        formData={baseFormData}
        mensaje={null}
        handleChange={mockHandleChange}
        handleSubmit={mockHandleSubmit}
        isLoading={false}
      />
    );

    expect(screen.getByLabelText(/Nombre del Curso/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Fecha de Inicio/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Fecha de Fin/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /crear curso/i })).toBeInTheDocument();
  });

  it("muestra mensaje de éxito en color verde", () => {
    render(
      <CursoFormulario
        formData={baseFormData}
        mensaje={{ type: "success", text: "Curso creado exitosamente" }}
        handleChange={mockHandleChange}
        handleSubmit={mockHandleSubmit}
        isLoading={false}
      />
    );

    const message = screen.getByText(/Curso creado exitosamente/i);
    expect(message).toBeInTheDocument();
    expect(message).toHaveStyle("color: rgb(0, 128, 0)");
  });

  it("muestra mensaje de error en color rojo", () => {
    render(
      <CursoFormulario
        formData={baseFormData}
        mensaje={{ type: "error", text: "Error al crear curso" }}
        handleChange={mockHandleChange}
        handleSubmit={mockHandleSubmit}
        isLoading={false}
      />
    );

    const message = screen.getByText(/Error al crear curso/i);
    expect(message).toBeInTheDocument();
    expect(message).toHaveStyle("color: rgb(255, 0, 0)");
  });

  it("llama a handleChange cuando se modifica un campo", () => {
    render(
      <CursoFormulario
        formData={baseFormData}
        mensaje={null}
        handleChange={mockHandleChange}
        handleSubmit={mockHandleSubmit}
        isLoading={false}
      />
    );

    const inputNombre = screen.getByLabelText(/Nombre del Curso/i);
    fireEvent.change(inputNombre, { target: { value: "Nuevo Curso" } });
    expect(mockHandleChange).toHaveBeenCalledTimes(1);
  });

  it("llama a handleSubmit al enviar el formulario", () => {
    render(
      <CursoFormulario
        formData={baseFormData}
        mensaje={null}
        handleChange={mockHandleChange}
        handleSubmit={mockHandleSubmit}
        isLoading={false}
      />
    );

    const form = screen.getByRole("form", { hidden: true });
    fireEvent.submit(form);
    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });

  it("desactiva los campos y muestra 'Creando...' cuando isLoading es true", () => {
    render(
      <CursoFormulario
        formData={baseFormData}
        mensaje={null}
        handleChange={mockHandleChange}
        handleSubmit={mockHandleSubmit}
        isLoading={true}
      />
    );

    expect(screen.getByLabelText(/Nombre del Curso/i)).toBeDisabled();
    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.getByText(/Creando.../i)).toBeInTheDocument();
  });
});
