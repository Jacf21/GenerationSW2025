import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");

  const PORT = env.VITE_PORTBACK || 5000;
  const API_URL = env.VITE_API_URL || `http://localhost:${PORT}/api`;

  return {
    plugins: [
      react({
        babel: {
          plugins: [["babel-plugin-react-compiler"]],
        },
      }),
    ],

    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: "./src/setupTests.js",
    },

    server: {
      proxy: {
        "/api": {
          target: `${API_URL}`,
          changeOrigin: true,
          secure: false,
        },
      },
    },

    define: {
      // Esto permite que las variables se reemplacen en el build
      "process.env.VITE_PORTBACK": JSON.stringify(PORT),
      "process.env.VITE_API_URL": JSON.stringify(API_URL),
    },
  };
});
