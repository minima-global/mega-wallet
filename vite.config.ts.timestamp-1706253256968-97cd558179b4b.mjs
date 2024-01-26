// vite.config.ts
import { defineConfig, loadEnv } from "file:///Users/eliasnemr/projects/v3/mega-wallet/node_modules/vite/dist/node/index.js";
import react from "file:///Users/eliasnemr/projects/v3/mega-wallet/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { createHtmlPlugin } from "file:///Users/eliasnemr/projects/v3/mega-wallet/node_modules/vite-plugin-html/dist/index.mjs";
import legacy from "file:///Users/eliasnemr/projects/v3/mega-wallet/node_modules/@vitejs/plugin-legacy/dist/index.mjs";
var vite_config_default = ({ mode }) => {
  let devEnv = "";
  const env = Object.assign(
    globalThis.process.env,
    loadEnv(mode, globalThis.process.cwd())
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
      outDir: "build"
    },
    plugins: [
      react(),
      legacy({
        targets: ["defaults", "not IE 11", "Android >= 9"]
      }),
      createHtmlPlugin({
        inject: {
          data: {
            devEnv
          }
        }
      })
    ]
  });
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZWxpYXNuZW1yL3Byb2plY3RzL3YzL21lZ2Etd2FsbGV0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvZWxpYXNuZW1yL3Byb2plY3RzL3YzL21lZ2Etd2FsbGV0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9lbGlhc25lbXIvcHJvamVjdHMvdjMvbWVnYS13YWxsZXQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbmltcG9ydCB7IGNyZWF0ZUh0bWxQbHVnaW4gfSBmcm9tIFwidml0ZS1wbHVnaW4taHRtbFwiO1xuaW1wb3J0IGxlZ2FjeSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tbGVnYWN5XCI7XG5cbmV4cG9ydCBkZWZhdWx0ICh7IG1vZGUgfSkgPT4ge1xuICBsZXQgZGV2RW52ID0gXCJcIjtcbiAgY29uc3QgZW52ID0gT2JqZWN0LmFzc2lnbihcbiAgICBnbG9iYWxUaGlzLnByb2Nlc3MuZW52LFxuICAgIGxvYWRFbnYobW9kZSwgZ2xvYmFsVGhpcy5wcm9jZXNzLmN3ZCgpKVxuICApO1xuXG4gIGlmIChtb2RlID09PSBcImRldmVsb3BtZW50XCIpIHtcbiAgICBkZXZFbnYgPSBgXG4gICAgICA8c2NyaXB0PlxuICAgICAgICB2YXIgREVCVUcgPSBcIiR7ZW52LlZJVEVfREVCVUd9XCIgPT09ICd0cnVlJztcbiAgICAgICAgdmFyIERFQlVHX0hPU1QgPSBcIiR7ZW52LlZJVEVfREVCVUdfSE9TVH1cIjtcbiAgICAgICAgdmFyIERFQlVHX1BPUlQgPSBcIiR7ZW52LlZJVEVfREVCVUdfTURTX1BPUlR9XCI7XG4gICAgICAgIHZhciBERUJVR19VSUQgPSBcIiR7ZW52LlZJVEVfREVCVUdfVUlEfVwiO1xuICAgICAgPC9zY3JpcHQ+XG4gICAgYDtcbiAgfVxuXG4gIHJldHVybiBkZWZpbmVDb25maWcoe1xuICAgIGJhc2U6IFwiXCIsXG4gICAgYnVpbGQ6IHtcbiAgICAgIG91dERpcjogXCJidWlsZFwiLFxuICAgIH0sXG4gICAgcGx1Z2luczogW1xuICAgICAgcmVhY3QoKSxcbiAgICAgIGxlZ2FjeSh7XG4gICAgICAgIHRhcmdldHM6IFtcImRlZmF1bHRzXCIsIFwibm90IElFIDExXCIsIFwiQW5kcm9pZCA+PSA5XCJdLFxuICAgICAgfSksXG4gICAgICBjcmVhdGVIdG1sUGx1Z2luKHtcbiAgICAgICAgaW5qZWN0OiB7XG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgZGV2RW52LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICBdLFxuICB9KTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTBTLFNBQVMsY0FBYyxlQUFlO0FBQ2hWLE9BQU8sV0FBVztBQUNsQixTQUFTLHdCQUF3QjtBQUNqQyxPQUFPLFlBQVk7QUFFbkIsSUFBTyxzQkFBUSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQzNCLE1BQUksU0FBUztBQUNiLFFBQU0sTUFBTSxPQUFPO0FBQUEsSUFDakIsV0FBVyxRQUFRO0FBQUEsSUFDbkIsUUFBUSxNQUFNLFdBQVcsUUFBUSxJQUFJLENBQUM7QUFBQSxFQUN4QztBQUVBLE1BQUksU0FBUyxlQUFlO0FBQzFCLGFBQVM7QUFBQTtBQUFBLHVCQUVVLElBQUksVUFBVTtBQUFBLDRCQUNULElBQUksZUFBZTtBQUFBLDRCQUNuQixJQUFJLG1CQUFtQjtBQUFBLDJCQUN4QixJQUFJLGNBQWM7QUFBQTtBQUFBO0FBQUEsRUFHM0M7QUFFQSxTQUFPLGFBQWE7QUFBQSxJQUNsQixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsSUFDVjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0wsU0FBUyxDQUFDLFlBQVksYUFBYSxjQUFjO0FBQUEsTUFDbkQsQ0FBQztBQUFBLE1BQ0QsaUJBQWlCO0FBQUEsUUFDZixRQUFRO0FBQUEsVUFDTixNQUFNO0FBQUEsWUFDSjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0YsQ0FBQztBQUNIOyIsCiAgIm5hbWVzIjogW10KfQo=
