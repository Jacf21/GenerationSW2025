import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const PORT = env.VITE_PORTBACK || 5000;

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
          target: `http://localhost:${PORT}`,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
