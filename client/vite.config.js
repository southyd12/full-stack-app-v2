import { defineConfig } from "vite";
// import http from "http";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: "http://127.0.0.1:3333",
          changeOrigin: true,
          secure: false,
          // agent: new http.Agent()
        },
      },
    },
  };
});
