import { useContext, useEffect, useState } from "react";
import { appContext } from "../../AppContext";
import Dialog from "../UI/Dialog";

import * as utils from "../../utils";
import AnimatedDialog from "../UI/AnimatedDialog";
import {
  inputWrapperStyle,
  primaryFormButtonStyle,
  wrappedInputStyle,
} from "../../styles";
import VisibleIcon from "../UI/Icons/VisibleIcon";
import HideIcon from "../UI/Icons/HideIcon";
import KeyIcon from "../UI/Icons/KeyIcon";
import CopyIcon from "../UI/Icons/CopyIcon";
import ModernCheckbox from "../UI/Toggle";
import isMobileDevice from "../../utils/isMobile";

const Login = () => {
  const {
    _promptMegaMMR,
    _promptLogin,
    promptLogin,
    loginForm,
    setLoginForm,
    generateSecret,
    createAccount,
    handleNavigation,
    notify,
  } = useContext(appContext);

  // will use this to generate a help section later
  const [step] = useState(0);

  const [copied, setCopied] = useState(false);

  const [loading, setLoading] = useState(false);
  const [visibility, toggleVisiblity] = useState(false);

  const handleToggleVisibility = () => {
    toggleVisiblity((prevState) => !prevState);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (copied) setCopied(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [copied]);

  const handleCopy = () => {
    setCopied(true);
    const isMobile = isMobileDevice();

    if (!isMobile) {
      notify("Copied secret to clipboard");
    }
    utils.copyToClipboard(loginForm._secret);
  };

  const handleRememberMe = () => {
    setLoginForm((prevData) => ({
      ...prevData,
      ["_rememberMe"]: !prevData._rememberMe,
    }));
  };

  const handleGenerate = async (evt) => {
    evt.preventDefault();
    // generate a new secret
    const secret = await generateSecret();
    // notify
    notify("Generated a new secret (remember to save it somewhere safe)");
    // un-hide password field
    toggleVisiblity(true);
    // set it to the input automatically
    setLoginForm((prevData) => ({
      ...prevData,
      ["_seedPhrase"]: secret,
      ["_secret"]: secret,
    }));
  };

  // Handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the corresponding property in the state object
    setLoginForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setLoading(true);

    const isRememberMeChecked = loginForm._rememberMe;
    const secretSauce = loginForm._seedPhrase.trim();

    if (isRememberMeChecked) {
      utils.setCookie("rememberme", "true", 7);
      utils.setCookie("secretsauce", secretSauce, 7);
    }

    if (!isRememberMeChecked) {
      utils.setCookie("rememberme", "", 365);
      utils.setCookie("secretsauce", "", 365);
    }
    // generate a key, set our balance, navigate to dashboard
    createAccount(secretSauce);

    handleNavigation("balance");
    promptLogin();

    if (visibility) handleToggleVisibility();

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  if (_promptMegaMMR) {
    return (
      <Dialog>
        <div className="h-full grid items-center">
          <div className="z-[1000] bg-white rounded-lg mx-4 md:mx-0 min-h-[40vh] p-4  text-left grid grid-cols-1 grid-rows-[auto_1fr] shadow-xl">
            <div className="grid grid-cols-[auto_1fr] gap-2 items-center">
              <img alt="brand-icon" src="./assets/icon.svg" className="w-8" />
              <h1 className="text-2xl text-black dark:text-black font-bold">
                Wallet
              </h1>
            </div>
            <div>
              <h1 className="text-black text-xl mt-4 mb-0 pb-0">
                Wallet unavailable!
              </h1>
              <p className="text-sm mt-1 dark:text-black">
                A <code>-megammr</code> node is required to use this Wallet.
              </p>
            </div>
          </div>
        </div>
      </Dialog>
    );
  }

  if (!_promptLogin) {
    return null;
  }

  return (
    <AnimatedDialog up={2000} display={_promptLogin} dismiss={() => null}>
      <div>
        <div className="flex gap-2 justify-center">
          <div className="w-8 h-8 overflow-hidden rounded-lg flex">
            <img
              alt="brand-icon"
              src="./assets/icon.svg"
              className="h-full w-full aspect-square"
            />
          </div>
          <h1 className="text-2xl tracking-wide my-auto font-bold text-black">
            Wallet
          </h1>
        </div>
        {step === 0 && (
          <>
            <div>
              {loginForm._seedPhrase.length === 0 && (
                <p className="text-sm mt-4 text-neutral-700 font-bold tracking-wide flex flex-wrap items-center gap-1 justify-center">
                  <span>Login with your secret key or click generate</span>
                  <span className="inline-block">
                    <KeyIcon fill="currentColor" />
                  </span>
                  <span>to create a new one</span>
                </p>
              )}
              {loginForm._seedPhrase.length > 0 && (
                <div>
                  <p className="text-sm mt-4 text-neutral-700 font-bold tracking-wide flex flex-wrap items-center gap-1 justify-center text-center">
                    Make sure you store a copy{" "}
                    <span className="text-black">
                      <CopyIcon fill="currentColor" size={16} />
                    </span>{" "}
                    of your secret somewhere safe. Hyphens (-) are required.{" "}
                    <br />
                    <br />
                    <span className="font-bold text-neutral-700 bg-yellow-500 px-2">
                      You cannot recover it later
                    </span>
                  </p>
                </div>
              )}
            </div>
            <div className="mt-4">
              <form className="grid gap-1" onSubmit={handleSubmit}>
                <div className={inputWrapperStyle}>
                  <span className="text-xs text-neutral-600 font-bold">
                    Enter your secret
                  </span>
                  <div className="flex">
                    <input
                      type={`${visibility ? "text" : "password"}`}
                      placeholder="Your secret phrase"
                      name="_seedPhrase"
                      onChange={handleInputChange}
                      value={loginForm._seedPhrase}
                      className={`${wrappedInputStyle} flex-grow`}
                    />
                    <div className="flex gap-2">
                      <span
                        onClick={handleToggleVisibility}
                        className="text-black"
                      >
                        {!visibility && (
                          <VisibleIcon fill="currentColor" size={22} />
                        )}
                        {visibility && (
                          <HideIcon fill="currentColor" size={22} />
                        )}
                      </span>
                      <span onClick={handleGenerate} className="text-black">
                        <KeyIcon fill="currentColor" size={22} />
                      </span>
                      {loginForm._seedPhrase.length > 0 && (
                        <span
                          onClick={handleCopy}
                          className={`text-black ${copied && "text-teal-700 animate-pulse"}`}
                        >
                          <CopyIcon fill="currentColor" size={22} />
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="my-8">
                  <div className="flex">
                    <ModernCheckbox
                      label="Remember me?"
                      onChange={handleRememberMe}
                      checked={loginForm._rememberMe}
                    />
                  </div>
                  <div className="mt-1">
                    <button
                      disabled={loading || loginForm._seedPhrase.length === 0}
                      type="submit"
                      className={primaryFormButtonStyle}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </AnimatedDialog>
  );
};

export default Login;
