import "./App.css";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import { MemoryRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

function ForceInfo({ children }: React.PropsWithChildren) {
  const navigate = useNavigate();
  const onlyOnce = useRef(false);

  useEffect(() => {
    if (onlyOnce.current === false) {
      const userVisitedAppForFirstTime = localStorage.getItem("first-time");
      onlyOnce.current = true;

      if (userVisitedAppForFirstTime === "true") {
        navigate("/info");
      }
    }
  }, [navigate]);

  return <div>{children}</div>;
}

function App() {
  return (
    <MemoryRouter>
      <Layout>
        <Routes>
          <Route path="*" element={<ForceInfo />} />
        </Routes>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/info" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </MemoryRouter>
  );
}

export default App;
