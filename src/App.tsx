import "./App.css";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import { MemoryRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import AddToHomeScreen from "./components/AddToHomeScreen";
import Info from "./pages/Info";

function ForceInfo({ children }: React.PropsWithChildren) {
  const navigate = useNavigate();
  const onlyOnce = useRef(false);

  useEffect(() => {
    if (onlyOnce.current === false) {
      const userVisitedAppForFirstTime = localStorage.getItem("first-time");
      onlyOnce.current = true;

      if (userVisitedAppForFirstTime === "true") {
        navigate("/welcome");
      }
    }
  }, [navigate]);

  return <div>{children}</div>;
}

function App() {
  return (
    <MemoryRouter>
      <AddToHomeScreen />
      <Layout>
        <Routes>
          <Route path="*" element={<ForceInfo />} />
        </Routes>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/info" element={<Info />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </MemoryRouter>
  );
}

export default App;
