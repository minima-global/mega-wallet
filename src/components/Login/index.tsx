import { useContext, useEffect, useState } from "react";
import { appContext } from "../../AppContext";
import Dialog from "../UI/Dialog";

import * as utils from "../../utils";
import Toggle from "../UI/Toggle";

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
    <Dialog>
      <div className="h-full grid items-center">
        <div className="z-[1000] bg-white rounded-lg mx-4 md:mx-0 min-h-[40vh] p-4 dark:bg-white text-left grid grid-cols-1 grid-rows-[auto_1fr] shadow-xl">
          <div className="grid grid-cols-[auto_1fr] gap-2 items-center">
            <img alt="brand-icon" src="./assets/icon.svg" className="w-8" />
            <h1 className="text-2xl text-black dark:text-black font-bold">
              Wallet
            </h1>
          </div>
          {step === 0 && (
            <>
              <p className="text-sm mt-4 dark:text-black">
                Login with your secret or click generate to create a new one.
              </p>
              <div className="mt-4">
                <form className="grid gap-1" onSubmit={handleSubmit}>
                  <label className="grid gap-1 relative">
                    <span className="mb-1 font-bold dark:text-black">
                      Secret
                    </span>
                    <input
                      type={`${visibility ? "text" : "password"}`}
                      className="bg-slate-200 text-black p-3 rounded-lg focus:bg-white focus:text-black hover:bg-white hover:outline-black focus:outline hover:outline shadow-xl"
                      placeholder="Your secret phrase"
                      name="_seedPhrase"
                      onChange={handleInputChange}
                      value={loginForm._seedPhrase}
                    />
                    <button
                      type="button"
                      className="absolute text-teal-500 right-0 top-8 active:outline-none !border-none focus:border-none hover:border-none focus:outline-none"
                      onClick={handleToggleVisibility}
                    >
                      {!visibility && (
                        <svg
                          className=""
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

                      {!!visibility && (
                        <svg
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

                    {!!loginForm._secret.length && (
                      <p className="text-sm mt-2 dark:text-black">
                        Make sure you store a copy of your secret somewhere
                        safe. Hyphens (-) are required. You cannot recover it
                        later.
                      </p>
                    )}
                  </label>
                  <div className="flex items-center justify-end mt-2">
                    <Toggle
                      label="Remember me?"
                      onChange={handleRememberMe}
                      checkedStatus={loginForm._rememberMe}
                    />
                  </div>
                  <div className="grid">
                    <button
                      disabled={loading}
                      type="submit"
                      className="mt-3 w-full bg-black text-white font-bold p-3 disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                      Login
                    </button>
                  </div>

                  <>
                    <div className="relative flex py-5 items-center">
                      <div className="flex-grow border-t border-gray-400"></div>
                      <p className="flex-shrink mx-4 text-black text-sm">OR</p>
                      <div className="flex-grow border-t border-gray-400"></div>
                    </div>

                    <div className="flex-col flex items-center">
                      <button
                        disabled={loading}
                        type="button"
                        onClick={handleGenerate}
                        className="w-full font-bold text-black bg-[#f7f7f7] max-w-[200px] flex justify-between dark:text-black disabled:cursor-not-allowed"
                      >
                        {loginForm._secret.length > 0
                          ? "Re-generate"
                          : "Generate"}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="28"
                          viewBox="0 -960 960 960"
                          width="28"
                        >
                          <path d="M280-400q-33 0-56.5-23.5T200-480q0-33 23.5-56.5T280-560q33 0 56.5 23.5T360-480q0 33-23.5 56.5T280-400Zm0 160q-100 0-170-70T40-480q0-100 70-170t170-70q67 0 121.5 33t86.5 87h352l120 120-180 180-80-60-80 60-85-60h-47q-32 54-86.5 87T280-240Zm0-80q56 0 98.5-34t56.5-86h125l58 41 82-61 71 55 75-75-40-40H435q-14-52-56.5-86T280-640q-66 0-113 47t-47 113q0 66 47 113t113 47Z" />
                        </svg>
                      </button>

                      {loginForm._secret && !loading && (
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
                          } relative items-center w-full mt-1 font-bold text-black bg-teal-300 max-w-[200px] flex justify-between dark:text-black`}
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
                      )}
                    </div>
                  </>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default Login;
