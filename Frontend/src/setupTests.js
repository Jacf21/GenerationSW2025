import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// 🧹 Limpia el DOM después de cada test para evitar interferencias
afterEach(() => {
  cleanup();
});
