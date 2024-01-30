import { useContext, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Dashboard.module.css";
import DesktopNav from "../DesktopNav";
import Wallet from "../Wallet";
import Send from "../Send";
import DialogWithMessage from "../DialogWithMessage";
import DialogWithError from "../DialogWithError";
import Receive from "../Receive";
import { appContext } from "../../AppContext";
import Dialog from "../UI/Dialog";

import * as utils from "../../utils";
import { useSpring, animated, config } from "react-spring";

const Dashboard = () => {
  const {
    promptLogout,
    loginForm,
    _currentNavigation,
    handleNavigation,
    _promptLogoutDialog,
    promptLogoutDialog,
  } = useContext(appContext);

  const [password, setPassword] = useState<"text" | "password">("password");
  const [copied, setCopied] = useState(false);

  const handleToggleVisibility = () => {
    setPassword((prevState) =>
      prevState === "password" ? "text" : "password"
    );
  };

  const handleCopy = () => {
    setCopied(true);
    utils.copyToClipboard(loginForm._seedPhrase);
  };

  const springProps = useSpring({
    opacity: _promptLogoutDialog ? 1 : 0,
    transform: _promptLogoutDialog
      ? "translateY(0%) scale(1)"
      : "translateY(-50%) scale(0.8)",
    config: config.stiff,
  });

  return (
    <>
      {_promptLogoutDialog &&
        createPortal(
          <Dialog>
            <animated.div
              style={springProps}
              className="h-full grid items-center"
            >
              <div className="z-[1000] bg-white rounded-lg mx-4 md:mx-0 min-h-[40vh] p-4  text-left grid grid-cols-1 grid-rows-[auto_1fr] shadow-xl">
                <div className="grid grid-cols-[auto_1fr] gap-2 items-center">
                  <h1 className="text-2xl text-black dark:text-black font-bold">
                    Are you sure you want to log out?
                  </h1>
                </div>
                <div>
                  <h1 className="text-black text-xl mt-4 mb-2 pb-0">
                    If you haven't stored your secret code then this is your
                    last chance!
                  </h1>
                  <label className="grid gap-1 relative">
                    <input
                      readOnly
                      autoComplete="off"
                      value={loginForm._seedPhrase}
                      type={password}
                      placeholder="Secret code"
                      className="bg-slate-200 text-black p-3 rounded-lg focus:bg-white focus:text-black hover:bg-white hover:outline-black focus:outline hover:outline shadow-xl"
                    />
                    <button
                      className="absolute text-teal-500 right-3 top-3 active:outline-none !border-none focus:border-none hover:border-none focus:outline-none p-0"
                      onClick={handleToggleVisibility}
                    >
                      {password === "password" && (
                        <svg
                          className="text-black"
                          xmlns="http://www.w3.org/2000/svg"
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
                          <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                          <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                        </svg>
                      )}

                      {password === "text" && (
                        <svg
                          className="text-black"
                          xmlns="http://www.w3.org/2000/svg"
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
                          <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                          <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                          <path d="M3 3l18 18" />
                        </svg>
                      )}
                    </button>
                  </label>
                  <button
                    type="button"
                    onClick={handleCopy}
                    style={{
                      appearance: "none",
                      padding: 8,
                      border: 0,
                      outline: 0,
                      cursor: "pointer",
                    }}
                    className={`${
                      copied
                        ? "outline-2 outline-offset-2 shadow-2xl outline-red-500 "
                        : ""
                    } relative items-center w-full mt-4 mx-auto font-bold text-black bg-teal-300 max-w-[200px] flex justify-between dark:text-black`}
                  >
                    {!copied ? "Copy" : "Copied"}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="28"
                      viewBox="0 -960 960 960"
                      width="28"
                      style={{
                        color: "#0809ab",
                        position: "relative",
                        top: 0,
                        right: 0,
                        strokeDasharray: 50,
                        strokeDashoffset: copied ? -50 : 0,
                        transition: "all 300ms ease-in-out",
                        opacity: copied ? 0 : 1,
                      }}
                    >
                      <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        color: "black",
                        position: "absolute",
                        top: 12,
                        right: 10,
                        strokeDasharray: 50,
                        strokeDashoffset: copied ? 0 : -50,
                        transition: "all 300ms ease-in-out",
                      }}
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
                      <path d="M5 12l5 5l10 -10" />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center justify-end mt-4">
                  <button
                    onClick={promptLogoutDialog}
                    className="bg-transparent outline text-black  font-bold h-max mr-2"
                  >
                    Dismiss
                  </button>
                  <button
                    onClick={() => {
                      setPassword("password");
                      promptLogout();
                    }}
                    className="bg-[#FFA010] text-white  font-bold h-max"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </animated.div>
          </Dialog>,

          document.body
        )}

      <div className={styles["grid"]}>
        <header>
          <img alt="icon" src="./assets/icon.svg" />
          <div>
            <button
              onClick={promptLogoutDialog}
              className="bg-orange-300 text-black"
            >
              Logout
            </button>
          </div>
        </header>
        <main>
          <section>
            <section />
            <DialogWithError />
            <DialogWithMessage />
            {/* <Balance /> */}
            <DesktopNav />
            <Wallet />
            <Receive />
            <Send />
          </section>
        </main>
        <footer>
          <div />
          <nav>
            <button
              className={` flex flex-col items-center justify-center gap-1 transition-all delay-100 duration-100 font-bold ${
                _currentNavigation === "balance" ? "bg-opacity-50" : ""
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
              className={`flex flex-col items-center justify-center gap-1 transition-all delay-100 duration-100 font-bold ${
                _currentNavigation === "send" ? "bg-opacity-50 " : ""
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
              className={` flex flex-col items-center justify-center gap-1 transition-all delay-100 duration-100 font-bold ${
                _currentNavigation === "receive" ? "bg-opacity-50 " : ""
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
          <div />
        </footer>
      </div>
    </>
  );
};

export default Dashboard;
