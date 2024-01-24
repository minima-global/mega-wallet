import { useContext, useState } from "react";
import { appContext } from "../../AppContext";
import Dialog from "../UI/Dialog";

import * as utils from "../../utils";
import Toggle from "../UI/Toggle";

const Login = () => {
  const {
    _promptLogin,
    loginForm,
    setLoginForm,
    generateSecret,
    setAddress,
    promptLogin,
  } = useContext(appContext);

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const handleCopy = () => {
    utils.copyToClipboard(loginForm._secret);
  };

  const handleRememberMe = () => {
    setLoginForm((prevData) => ({
      ...prevData,
      ["_rememberMe"]: !prevData._rememberMe,
    }));
  };

  const handleGenerate = () => {
    // generate a new secret
    generateSecret();
    // un-hide password field
    setHidePassword(false);
    // set it to the input automatically
    setLoginForm((prevData) => ({
      ...prevData,
      ["_seedPhrase"]: loginForm._secret,
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
    console.log("secretSauce", secretSauce);
    console.log(isRememberMeChecked);
    if (isRememberMeChecked) {
      utils.setCookie("rememberme", "true", 7);
      utils.setCookie("secretsauce", secretSauce, 7);
    }

    if (!isRememberMeChecked) {
      utils.setCookie("rememberme", "", 365);
      utils.setCookie("secretsauce", "", 365);
    }

    // Generate a key
    (window as any).MDS.cmd(
      `keys action:genkey phrase:"${loginForm._seedPhrase}"`,
      function (resp) {
        // Get the address
        const address = resp.response.miniaddress;

        // Jump to the main balance page
        setAddress(address);
        promptLogin();
      }
    );
  };

  if (_promptLogin) {
    return null;
  }

  return (
    <Dialog>
      <div className="h-full grid items-center">
        <div className="bg-white rounded-lg mx-4 md:mx-0 min-h-[40vh] p-4 dark:bg-black text-left grid grid-cols-1 grid-rows-[auto_1fr]">
          <div className="grid grid-cols-[auto_1fr] gap-2 items-center">
            <img alt="brand-icon" src="/assets/icon.svg" className="w-8" />
            <h1 className="text-2xl text-black dark:text-white font-bold">
              Wallet
            </h1>
          </div>
          {step === 0 && (
            <>
              <p className="text-sm mt-4">
                Login with your secret or click generate to create a new one.
              </p>
              <div className="mt-4">
                <form className="grid gap-1" onSubmit={handleSubmit}>
                  <label className="grid">
                    <span className="mb-1 font-bold">Secret</span>
                    <input
                      type={hidePassword ? "password" : "text"}
                      className="bg-slate-200 text-black p-3 rounded-lg focus:bg-white hover:bg-white hover:outline-black focus:outline hover:outline"
                      placeholder="Your secret phrase"
                      name="_seedPhrase"
                      onChange={handleInputChange}
                      value={loginForm._seedPhrase}
                    />

                    {loginForm._secret && (
                      <p className="text-sm mt-2">
                        Make sure you store a copy of your secret somewhere
                        safe. Hyphens (-) are required. You cannot recover it
                        later.
                      </p>
                    )}
                  </label>

                  <div className="grid">
                    <button className="mt-3 w-full bg-black text-white font-bold p-3 dark:bg-white dark:text-black">
                      Login
                    </button>

                    <div className="flex items-center justify-end mt-2">
                      <Toggle
                        label="Remember me?"
                        onChange={handleRememberMe}
                        checkedStatus={loginForm._rememberMe}
                      />
                    </div>
                  </div>

                  <div className="relative flex py-5 items-center">
                    <div className="flex-grow border-t border-gray-400"></div>
                    <p className="flex-shrink mx-4 text-black text-sm">OR</p>
                    <div className="flex-grow border-t border-gray-400"></div>
                  </div>

                  <div className="flex-col flex items-center">
                    <button
                      type="button"
                      onClick={handleGenerate}
                      className="w-full font-bold text-grey bg-[#f7f7f7] max-w-[200px] flex justify-between dark:text-black"
                    >
                      {loginForm._secret ? "Re-generate" : "Generate"}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="28"
                        viewBox="0 -960 960 960"
                        width="28"
                      >
                        <path d="M280-400q-33 0-56.5-23.5T200-480q0-33 23.5-56.5T280-560q33 0 56.5 23.5T360-480q0 33-23.5 56.5T280-400Zm0 160q-100 0-170-70T40-480q0-100 70-170t170-70q67 0 121.5 33t86.5 87h352l120 120-180 180-80-60-80 60-85-60h-47q-32 54-86.5 87T280-240Zm0-80q56 0 98.5-34t56.5-86h125l58 41 82-61 71 55 75-75-40-40H435q-14-52-56.5-86T280-640q-66 0-113 47t-47 113q0 66 47 113t113 47Z" />
                      </svg>
                    </button>

                    {loginForm._secret && (
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="w-full mt-1 font-bold text-grey bg-green-200 max-w-[200px] flex justify-between dark:text-black"
                      >
                        Copy
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="28"
                          viewBox="0 -960 960 960"
                          width="28"
                        >
                          <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
                        </svg>
                      </button>
                    )}
                  </div>
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
