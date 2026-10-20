import { defineConfig } from "vite";
export default defineConfig({
  server: { allowedHosts: ["terminal.local"] },
  build: { emptyOutDir: true, target: "es2022" },
});
