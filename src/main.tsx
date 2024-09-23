import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AppProvider from "./AppContext.tsx";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { createHashRouter, RouterProvider } from "react-router-dom";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
  }
]);


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider> 
      <ToastContainer />
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>,
);
