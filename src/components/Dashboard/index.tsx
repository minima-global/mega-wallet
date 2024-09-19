import { useContext, useState } from "react";
import styles from "./Dashboard.module.css";
import DesktopNav from "../DesktopNav";
import Wallet from "../Wallet";
import Send from "../Send";
import DialogWithMessage from "../DialogWithMessage";
import DialogWithError from "../DialogWithError";
import Receive from "../Receive";
import { appContext } from "../../AppContext";

import * as utils from "../../utils";
import AnimatedDialog from "../UI/AnimatedDialog";
import {
  dialogTitleStyle,
  dismissableButtonStyle,
  inputIconStyle,
  inputWrapperStyle,
  primaryFormButtonStyle,
  wrappedInputStyle,
} from "../../styles";
import CopyIcon from "../UI/Icons/CopyIcon";
import isMobileDevice from "../../utils/isMobile";
import VisibleIcon from "../UI/Icons/VisibleIcon";
import HideIcon from "../UI/Icons/HideIcon";
import MobileFooterNav from "../MobileFooterNav";
import WarningIcon from "../UI/Icons/WarningIcon";

const Dashboard = () => {
  const {
    promptLogout,
    loginForm,
    _promptLogoutDialog,
    promptLogoutDialog,
    notify,
  } = useContext(appContext);

  const [visibility, toggleVisiblity] = useState(false);

  const [copied, setCopied] = useState(false);
  const handleToggleVisibility = () => {
    toggleVisiblity((prevState) => !prevState);
  };

  const handleCopy = () => {
    setCopied(true);
    const isMobile = isMobileDevice();

    if (!isMobile) {
      notify("Copied secret to clipboard");
    }
    utils.copyToClipboard(loginForm._seedPhrase);
  };

  return (
    <>
      <AnimatedDialog
        up={30}
        display={_promptLogoutDialog}
        dismiss={() => null}
      >
        <div className="min-h-[calc(100vh_-_100px)] flex flex-col md:block">
          <div className="flex-grow">
            <div className="grid grid-cols-[auto_1fr] gap-2 items-center">
              <h2 className={dialogTitleStyle}>
                Are you sure you want to log out?
              </h2>
            </div>
            <div className="flex flex-col gap-4 my-4">
              <div className="flex-grow">
                <div className={`${inputWrapperStyle}`}>
                  <span className="text-xs text-neutral-600 font-bold">
                    Your secret
                  </span>
                  <div className="flex">
                    <input
                      type={`${visibility ? "text" : "password"}`}
                      placeholder="Your secret phrase"
                      name="_seedPhrase"
                      value={loginForm._seedPhrase}
                      className={`${wrappedInputStyle} flex-grow`}
                    />
                    <div className="flex gap-2">
                      <span
                        onClick={handleToggleVisibility}
                        className={inputIconStyle}
                      >
                        {!visibility && (
                          <VisibleIcon fill="currentColor" size={22} />
                        )}
                        {visibility && (
                          <HideIcon fill="currentColor" size={22} />
                        )}
                      </span>

                      {loginForm._seedPhrase.length > 0 && (
                        <span
                          onClick={handleCopy}
                          className={`${inputIconStyle} ${copied && "text-teal-700 animate-pulse"}`}
                        >
                          <CopyIcon fill="currentColor" size={22} />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-4 mx-auto bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg shadow-inner dark:bg-yellow-900 dark:border-yellow-600">
                <div className="flex items-center">
                  <span className="h-6 w-6 text-yellow-600 dark:text-yellow-500 mr-3">
                    <WarningIcon />
                  </span>
                  <div className="text-sm text-yellow-700 dark:text-yellow-200">
                    <p className="font-bold tracking-wide flex flex-wrap items-center gap-1 justify-center text-center">
                      Make sure you store a copy{" "}
                      <span className="inline-flex items-center">
                        <CopyIcon fill="currentColor" />
                      </span>{" "}
                      of your secret somewhere safe. Hyphens (-) are required.
                    </p>
                    <p className="mt-3 font-bold text-yellow-800 bg-yellow-200 dark:bg-yellow-700 dark:text-yellow-100 px-2 py-1 rounded text-center">
                      You cannot recover it later
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-auto md:mt-4 flex flex-col md:flex-row gap-4">
            <button
              onClick={promptLogoutDialog}
              className={dismissableButtonStyle}
            >
              Dismiss
            </button>
            <button
              onClick={() => {
                promptLogout();
              }}
              className={primaryFormButtonStyle}
            >
              Logout
            </button>
          </div>
        </div>
      </AnimatedDialog>

      <div className={styles["grid"]}>
        <header className="bg-[#1b1b1b]">
          <img alt="icon" src="./assets/icon-white.svg" />
          <div>
            <button
              onClick={promptLogoutDialog}
              className="bg-neutral-800 font-bold text-xs hover:bg-neutral-900"
            >
              Logout
            </button>
          </div>
        </header>
        <main className="px-4 sm:px-0">
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
        <MobileFooterNav />
      </div>
    </>
  );
};

export default Dashboard;
