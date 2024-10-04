import "./App.css";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import { MemoryRouter, Routes, Route, useNavigate } from "react-router-dom";
import {} from "lucide-react";
import Logout from "./pages/Logout";
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
        </Routes>
      </Layout>
    </MemoryRouter>
  );
}

export default App;
