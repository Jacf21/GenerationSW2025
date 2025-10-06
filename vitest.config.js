import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // Esto es clave para que document y window existan en los tests
    globals: true,
    setupFiles: "./src/setupTests.js", // opcional, si tienes setup para tests
  },
});
