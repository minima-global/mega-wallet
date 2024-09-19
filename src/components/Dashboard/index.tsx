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
import AppThemeSwitch from "../AppThemeSwitch";

const Dashboard = () => {
  const {
    promptLogout,
    loginForm,
    _promptLogoutDialog,
    promptLogoutDialog,
    notify,
    _keyUsages,
    _address,
  } = useContext(appContext);

  const [visibility, toggleVisiblity] = useState(false);

  const [copied, setCopied] = useState<{ seed: boolean; keys: boolean }>({
    seed: false,
    keys: false,
  });
  const handleToggleVisibility = () => {
    toggleVisiblity((prevState) => !prevState);
  };

  const handleCopy = async (value: string, key: string) => {
    setCopied((prevState) => ({ ...prevState, [key]: true }));
    const isMobile = isMobileDevice();

    if (!isMobile) {
      notify(`Copied to clipboard`);
    }

    utils.copyToClipboard(value);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setCopied((prevState) => ({ ...prevState, [key]: false }));
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
              <div className="flex-grow space-y-2">
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
                          onClick={() =>
                            handleCopy(loginForm._seedPhrase, "seed")
                          }
                          className={`${inputIconStyle} ${copied.seed && "text-teal-700 animate-pulse"}`}
                        >
                          <CopyIcon fill="currentColor" size={22} />
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className={`${inputWrapperStyle}`}>
                  <span className="text-xs text-neutral-600 font-bold">
                    Your key uses
                  </span>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Your key uses"
                      name="keyusages"
                      value={_keyUsages[_address] ? _keyUsages[_address] : 1}
                      className={`${wrappedInputStyle} flex-grow`}
                    />
                    <div className="flex gap-2">
                      {loginForm._seedPhrase.length > 0 && (
                        <span
                          onClick={() =>
                            handleCopy(
                              _keyUsages && _keyUsages[_address]
                                ? _keyUsages[_address]
                                : 1,
                              "keys",
                            )
                          }
                          className={`${inputIconStyle} ${copied.keys && "text-teal-700 animate-pulse"}`}
                        >
                          <CopyIcon fill="currentColor" size={22} />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-4 mx-auto bg-yellow-100 border-l-4 border-yellow-400 p-4 rounded-r-lg shadow-inner dark:bg-neutral-900 dark:border-yellow-600">
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
                      of your secret somewhere safe. Hyphens (-) are required.{" "}
                      <br />
                      <br />
                      Also if you will be logging in onto a new Public Wallet
                      website then you may need to remember your key usages.
                    </p>
                    <p className="max-w-max mx-auto mt-3 font-bold text-yellow-800 bg-yellow-200 dark:bg-yellow-700 dark:text-yellow-100 px-2 py-1 rounded text-center">
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
          <div className="flex gap-2">
            <AppThemeSwitch />
            <button
              onClick={promptLogoutDialog}
              className="bg-neutral-100 hover:cursor-pointer hover:bg-neutral-50 dark:bg-neutral-800 dark:text-neutral-300 font-bold text-xs dark:hover:bg-[#2C2C2C]"
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
