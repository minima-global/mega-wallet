import { useContext } from "react";
import styles from "./DesktopNav.module.css";
import { appContext } from "../../AppContext";

const DesktopNav = () => {
  const { _currentNavigation, handleNavigation } = useContext(appContext);
  return (
    <section className={styles["desktop__navigation"]}>
      <nav>
        <button
          className={`bg-black flex items-center justify-center gap-3 transition-all delay-100 duration-100 font-bold ${
            _currentNavigation === "balance" ? " outline outline-teal-500" : ""
          }`}
          disabled={_currentNavigation === "balance"}
          onClick={() => handleNavigation("balance")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${
              _currentNavigation === "balance"
                ? "text-white fill-teal-400 font-extrabold transition-all delay-100 duration-100"
                : ""
            }`}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
            <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
          </svg>
          <p
            className={`${
              _currentNavigation === "balance"
                ? "text-teal-500 font-extrabold transition-all delay-200 duration-100"
                : ""
            }`}
          >
            Balance
          </p>
        </button>
        <button
          className={`bg-black flex items-center justify-center gap-3 transition-all delay-100 duration-100 font-bold ${
            _currentNavigation === "send" ? " outline outline-teal-500" : ""
          }`}
          disabled={_currentNavigation === "send"}
          onClick={() => handleNavigation("send")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${
              _currentNavigation === "send"
                ? "text-white fill-teal-400 font-extrabold transition-all delay-100 duration-100"
                : ""
            }`}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M20 10h-16l5.5 -6" />
            <path d="M4 14h16l-5.5 6" />
          </svg>
          <p
            className={`${
              _currentNavigation === "send"
                ? "text-teal-500 font-extrabold transition-all delay-200 duration-100"
                : ""
            }`}
          >
            Send
          </p>
        </button>
        <button
          className={`bg-black flex items-center justify-center gap-3 transition-all delay-100 duration-100 font-bold ${
            _currentNavigation === "receive" ? " outline outline-teal-500" : ""
          }`}
          disabled={_currentNavigation === "receive"}
          onClick={() => handleNavigation("receive")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${
              _currentNavigation === "receive"
                ? "text-white fill-teal-400 font-extrabold transition-all delay-100 duration-100"
                : ""
            }`}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 18v3h16v-14l-8 -4l-8 4v3" />
            <path d="M4 14h9" />
            <path d="M10 11l3 3l-3 3" />
          </svg>
          <p
            className={`${
              _currentNavigation === "receive"
                ? "text-teal-500 font-extrabold transition-all delay-200 duration-100"
                : ""
            }`}
          >
            Receive
          </p>
        </button>
      </nav>
    </section>
  );
};

export default DesktopNav;
