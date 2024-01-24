import viteLogo from "/vite.svg";
import Decimal from "decimal.js";
import "./App.css";
import Login from "./components/Login";

function App() {
  return (
    <>
      <Login />
      <div>
        <a href="https://github.com/eliasnemr" target="_blank">
          <img
            src={viteLogo}
            className="logo animate-pulse inline"
            alt="Vite logo"
          />
        </a>
      </div>
      <h1 className="text-lg text-blue-400">
        MiniDapp Skeleton v{new Decimal(2).toNumber()}, <br />
        (React TS + Vite + TailwindCSS)
      </h1>
    </>
  );
}

export default App;
