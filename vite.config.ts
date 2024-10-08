import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import { createHtmlPlugin } from "vite-plugin-html";
import legacy from "@vitejs/plugin-legacy";

export default ({ mode }) => {
  let devEnv = "";
  const env = Object.assign(
    globalThis.process.env,
    loadEnv(mode, globalThis.process.cwd()),
  );

  if (mode === "development") {
    devEnv = `
      <script>
        var DEBUG = "${env.VITE_DEBUG}" === 'true';
        var DEBUG_HOST = "${env.VITE_DEBUG_HOST}";
        var DEBUG_PORT = "${env.VITE_DEBUG_MDS_PORT}";
        var DEBUG_UID = "${env.VITE_DEBUG_UID}";
      </script>
    `;
  }

  return defineConfig({
    base: "",
    build: {
      outDir: "build",
    },
    plugins: [
      react(),
      legacy({
        targets: ["defaults", "not IE 11", "Android >= 9"],
      }),
      createHtmlPlugin({
        inject: {
          data: {
            devEnv,
          },
        },
      }),
    ],
    server: {
      proxy: {
        // Proxy API requests from React dev server to Node.js proxy on port 3000
        "/api": {
          target: "http://localhost:3000", // Proxy server URL
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, ""), // Remove "/api" prefix
        },
      },
    },
  });
};
