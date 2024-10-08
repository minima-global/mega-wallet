import { useContext, useEffect, useState } from "react";
import { appContext } from "../../AppContext";
import Dialog from "../UI/Dialog";

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
import VisibleIcon from "../UI/Icons/VisibleIcon";
import HideIcon from "../UI/Icons/HideIcon";
import KeyIcon from "../UI/Icons/KeyIcon";
import CopyIcon from "../UI/Icons/CopyIcon";
import ModernCheckbox from "../UI/Toggle";
import isMobileDevice from "../../utils/isMobile";
import WarningIcon from "../UI/Icons/WarningIcon";
import HelpIcon from "../UI/Icons/HelpIcon";
import { useSearchParams } from "react-router-dom";

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
    setFirstTime,
  } = useContext(appContext);

  const [params] = useSearchParams();

  const [copied, setCopied] = useState(false);

  const [loading, setLoading] = useState(false);
  const [visibility, toggleVisiblity] = useState(false);

  const handleToggleVisibility = () => {
    toggleVisiblity((prevState) => !prevState);
  };

  useEffect(() => {
    const secret = params.get('secret');
    if (secret) {
      toggleVisiblity(true);
      // Automatically populate the secret into the loginForm._seedPhrase
      setLoginForm((prevData) => ({
        ...prevData,
        _seedPhrase: secret,
      }));
    }
  }, [params]);

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
              <h1 className="text-2xl text-black dark:text-neutral-100 font-bold">
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
      <div className="min-h-[calc(100vh_-_100px)] flex flex-col md:block pb-8">
        <div className="flex gap-2 justify-start">
          <div className="w-8 h-8 overflow-hidden rounded-lg flex">
            <img
              alt="brand-icon"
              src="./assets/icon-white.svg"
              className="h-full w-full aspect-square block"
            />
          </div>
          <h1 className={dialogTitleStyle}>Public Wallet</h1>
        </div>

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
        </div>

        <form
          className="flex flex-col flex-grow gap-1 my-4"
          onSubmit={handleSubmit}
        >
          <div className="flex-grow">
            <div
              className={`${inputWrapperStyle} dark:!border-neutral-100 dark:!border`}
            >
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
                    className={inputIconStyle}
                  >
                    {!visibility && (
                      <VisibleIcon fill="currentColor" size={22} />
                    )}
                    {visibility && <HideIcon fill="currentColor" size={22} />}
                  </span>
                  {/* <span onClick={handleGenerate} className={inputIconStyle}>
                    <KeyIcon fill="currentColor" size={22} />
                  </span> */}
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
          {loginForm._seedPhrase.length > 0 && (
            <div className="my-4  bg-yellow-100 border-l-4 border-yellow-400 p-4 rounded-r-lg shadow-inner dark:bg-neutral-900 dark:border-yellow-600">
              <div className="flex items-center">
                <span className="h-6 w-6 text-yellow-600 dark:text-yellow-500 mr-4">
                  <WarningIcon />
                </span>
                <div className="text-sm text-yellow-700 dark:text-yellow-200">
                  <p className="font-bold tracking-wide flex flex-wrap items-center gap-1 justify-start text-center">
                    Make sure you store a copy{" "}
                    <span className="inline-flex items-center">
                      <CopyIcon fill="currentColor" />
                    </span>{" "}
                    of your secret somewhere safe.
                  </p>
                  <p className="text-xs"> Hyphens (-) are required.</p>
                  <p className="max-w-max mr-auto mt-3 font-bold text-yellow-800 bg-yellow-200 dark:bg-yellow-700 dark:text-yellow-100 px-2 py-1 rounded text-center">
                    You cannot recover it later
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="mt-auto md:my-8">
            <div className="flex items-center mb-4">
              <div className="flex-grow ">
                <ModernCheckbox
                  label="Remember me?"
                  onChange={handleRememberMe}
                  checked={loginForm._rememberMe}
                />
              </div>
              <button
                onClick={() => setFirstTime(true)}
                type="button"
                className="p-0 m-0 dark:text-white font-bold  hover:opacity-90 flex text-sm gap-1 items-center"
              >
                Help
                <HelpIcon fill="currentColor" />
              </button>
            </div>
            <div className="mt-1 gap-2 flex flex-col">
              <button
                disabled={loading || loginForm._seedPhrase.length === 0}
                type="submit"
                className={primaryFormButtonStyle}
              >
                Login
              </button>
             
              <button
                onClick={handleGenerate}
                type="button"
                disabled={loading}
                className={`${dismissableButtonStyle} flex gap-1 items-center max-w-max mx-auto mt-2`}
              >
                Generate Key <KeyIcon fill="currentColor" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </AnimatedDialog>
  );
};

export default Login;
