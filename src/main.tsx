import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppProvider from "./AppContext.tsx";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <ToastContainer
        position="bottom-right"
        hideProgressBar={true}
        limit={3}
      />
      <App />
    </AppProvider>
  </React.StrictMode>,
);
