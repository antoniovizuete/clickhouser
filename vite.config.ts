import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
  build: {
    rollupOptions: {
      manualChunks: {
        "monaco-editor": ["monaco-editor"],
        "blueprintjs-core": ["@blueprintjs/core"],
        "blueprintjs-icons": ["@blueprintjs/icons"],
        "blueprintjs-table": ["@blueprintjs/table"],
        "blueprintjs-popover": ["@blueprintjs/popover2"],
      },
    },
  },
});
