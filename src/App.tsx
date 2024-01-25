import viteLogo from "/vite.svg";
import Decimal from "decimal.js";
import "./App.css";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <>
      <Login />
      <Dashboard />
    </>
  );
}

export default App;
