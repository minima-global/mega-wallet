import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
const PORT = 3000;

// Log every incoming request to the proxy server
app.use((req, res, next) => {
  console.log(`Proxy hit: ${req.method} ${req.url}`);
  next();
});

// Proxy middleware to forward requests to target API
app.use(
  "/api",
  createProxyMiddleware({
    target: "http://127.0.0.1:8080", // Target API URL
    changeOrigin: true, // Needed for virtual hosted sites
    onProxyReq: (proxyReq, req, res) => {
      console.log(
        `Forwarding request to: ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`,
      );
    },
    onProxyRes: (proxyRes, req, res) => {
      console.log(`Received response with status: ${proxyRes.statusCode}`);
    },
    onError: (err, req, res) => {
      console.error("Proxy error:", err);
      res.status(500).send("Proxy encountered an error.");
    },
  }),
);

// Optional: Log when the root endpoint is hit for testing purposes
app.get("/", (req, res) => {
  console.log("Root endpoint hit");
  res.send("Node.js proxy server running");
});

// Start the proxy server
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
