import { useContext, useEffect, useState } from "react";
import { appContext } from "../../AppContext";
import Dialog from "../../components/UI/Dialog";

import * as utils from "../../utils";
import {
  inputIconStyle,
  inputWrapperStyle,
  primaryFormButtonStyle,
  wrappedInputStyle,
} from "../../styles";
import VisibleIcon from "../../components/UI/Icons/VisibleIcon";
import HideIcon from "../../components/UI/Icons/HideIcon";
import KeyIcon from "../../components/UI/Icons/KeyIcon";
import ModernCheckbox from "../../components/UI/Toggle";
import HelpIcon from "../../components/UI/Icons/HelpIcon";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import InfoBox from "../../components/UI/InfoBox";
import DoNotShareModal from "../../components/DoNotShareModal";
import { removeLocalStorage, setLocalStorage } from "../../utils/localStorage";

const Login = () => {
  const {
    _promptMegaMMR,
    promptLogin,
    loginForm,
    setLoginForm,
    generateSecret,
    createAccount,
    handleNavigation,
    notify,
  } = useContext(appContext);

  const navigate = useNavigate();
  const [generated, setGenerated] = useState(false);
  const [promptDoNotShare, setPromptDoNotShare] = useState(false);

  const [params] = useSearchParams();

  const [copied, setCopied] = useState(false);

  const [loading, setLoading] = useState(false);
  const [visibility, toggleVisiblity] = useState(false);

  const handleToggleVisibility = () => {
    toggleVisiblity((prevState) => !prevState);
  };

  useEffect(() => {
    const secret = params.get("secret");
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

  useEffect(() => {
    if (_promptMegaMMR) {
      document.body.classList.add("overflow-hidden");
    }
  }, []);

  const handleCopy = () => {
    setCopied(true);

    utils.copyToClipboard(loginForm._secret);
  };

  const handleRememberMe = () => {
    // if the user is checking the remember me checkbox, show the do not share modal
    if (!loginForm._rememberMe) {
      setPromptDoNotShare(true);
    }

    setLoginForm((prevData) => ({
      ...prevData,
      ["_rememberMe"]: !prevData._rememberMe,
    }));
  };

  const handleGenerate = async (evt) => {
    evt.preventDefault();
    // generate a new secret
    const secret = await generateSecret();
    setGenerated(true);
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

  const handleKeyDown = (e) => {
    if (e.key === "Backspace") {
      setGenerated(false);
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setLoading(true);

    const isRememberMeChecked = loginForm._rememberMe;
    const secretKey = loginForm._seedPhrase.trim();

    if (isRememberMeChecked) {
      utils.setCookie("rememberme", "true", 7);
      setLocalStorage("sk", secretKey);
    }

    if (!isRememberMeChecked) {
      utils.setCookie("rememberme", "", 365);
      removeLocalStorage("sk");
    }

    // generate a key, set our balance, navigate to dashboard
    createAccount(secretKey);

    handleNavigation("balance");
    promptLogin();

    navigate("/dashboard");

    if (visibility) handleToggleVisibility();

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  if (_promptMegaMMR) {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen z-50">
        <Dialog>
          <div className="text-white h-full w-full flex items-center">
            <div className="z-[1000] bg-black rounded-lg w-full text-white p-6 mb-12">
              <svg
                width="42"
                height="39"
                viewBox="0 0 42 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`fill-black transition-all dark:fill-white -mt-2 w-[28px] mb-2`}
              >
                <path
                  d="M13.1247 12.7367L24.6192 17.3141L31.658 14.5108L34.1184 3.78496L24.6192 7.56748L6.56361 0.377441L0 28.9856L10.342 24.8667L13.1247 12.7367Z"
                  fill="#currentColor"
                />
                <path
                  d="M31.6582 14.511L28.8755 26.641L17.381 22.0636L10.3422 24.8669L7.88184 35.5927L17.381 31.8102L35.4366 39.0003L42.0002 10.3921L31.6582 14.511Z"
                  fill="#currentColor"
                />
              </svg>
              <h1 className="text-2xl mb-4">
                Minima Web Wallet is unavailable!
              </h1>
              <p className="text-sm mt-1">
                A <code>-megammr</code> node is required to use this Wallet.
              </p>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center pb-24 lg:pb-14">
      <DoNotShareModal display={promptDoNotShare} dismiss={() => setPromptDoNotShare(false)} />
      <div className="w-full md:w-[600px] m-4 lg:-mt-4 lg:mx-auto bg-grey10 dark:bg-mediumDarkContrast p-4 lg:p-6 rounded-lg text-black dark:text-white">
        <h1 className="pt-0.5 text-2xl lg:text-3xl mb-3">
          Minima Web Wallet
        </h1>
        <p className="block lg:flex text-sm dark:text-grey40 gap-2">
          Login with your secret key or{" "}
          <span className="hidden lg:inline-flex">
            <KeyIcon fill="currentColor" />
          </span>
          generate a new one.
        </p>
        <div className="w-full h-[2px] bg-grey40 dark:bg-grey my-5 lg:my-6" />
        <form className="" onSubmit={handleSubmit}>
          <div
            className={`flex flex-col lg:flex-row ${generated ? "gap-3" : "gap-0"}`}
          >
            <div
              className={`${inputWrapperStyle} flex-1 transition-all dark:!border-neutral-100 dark:!border`}
            >
              <div className="flex">
                <input
                  type={`${visibility ? "text" : "password"}`}
                  placeholder="Enter a secret key or generate one"
                  name="_seedPhrase"
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
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
                </div>
              </div>
            </div>
            <div
              role="button"
              onClick={handleCopy}
              className={`flex justify-center select-none items-center active:scale-[99%] gap-3 text-sm text-black rounded-lg transition-colors ${copied ? "bg-green" : "bg-white hover:bg-grey40"} origin-center lg:origin-right ${generated ? "scale-100 px-6 py-3 w-full lg:w-fit" : "scale-0 h-[0] w-[0] p-0 m-0"}`}
            >
              Copy
              <svg
                width="13"
                height="16"
                viewBox="0 0 13 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`fill-black transition-all h-[20px]`}
              >
                <path
                  d="M4.04813 12.5833C3.67299 12.5833 3.3559 12.4538 3.09687 12.1948C2.83785 11.9358 2.70833 11.6187 2.70833 11.2435V1.75645C2.70833 1.38131 2.83785 1.06423 3.09687 0.805199C3.3559 0.546171 3.67299 0.416656 4.04813 0.416656H11.5352C11.9103 0.416656 12.2274 0.546171 12.4865 0.805199C12.7455 1.06423 12.875 1.38131 12.875 1.75645V11.2435C12.875 11.6187 12.7455 11.9358 12.4865 12.1948C12.2274 12.4538 11.9103 12.5833 11.5352 12.5833H4.04813ZM4.04813 11.5H11.5352C11.5994 11.5 11.6581 11.4733 11.7115 11.4198C11.7649 11.3664 11.7917 11.3077 11.7917 11.2435V1.75645C11.7917 1.69228 11.7649 1.63353 11.7115 1.5802C11.6581 1.52673 11.5994 1.49999 11.5352 1.49999H4.04813C3.98396 1.49999 3.92521 1.52673 3.87188 1.5802C3.8184 1.63353 3.79167 1.69228 3.79167 1.75645V11.2435C3.79167 11.3077 3.8184 11.3664 3.87188 11.4198C3.92521 11.4733 3.98396 11.5 4.04813 11.5ZM1.46479 15.1667C1.08965 15.1667 0.772569 15.0371 0.513542 14.7781C0.254514 14.5191 0.125 14.202 0.125 13.8269V3.25645H1.20833V13.8269C1.20833 13.891 1.23507 13.9498 1.28854 14.0031C1.34188 14.0566 1.40062 14.0833 1.46479 14.0833H10.0352V15.1667H1.46479Z"
                  fill="#currentColor"
                />
              </svg>
            </div>
          </div>
          {loginForm._seedPhrase.length > 0 && (
            <div className="mt-6">
              <InfoBox>
                Make sure you store a copy of your secret key somewhere safe.
                Hyphens (-) are required. You cannot recover it later.<br/> <strong className="pt-5">Do not share this key with anyone!</strong>
              </InfoBox>
            </div>
          )}

          <div className="mt-3 mb-6">
            <div className="flex items-center mb-4">
              <div className="flex-grow ">
                <ModernCheckbox
                  label="Remember me"
                  onChange={handleRememberMe}
                  checked={loginForm._rememberMe}
                />
              </div>
              <Link to="/info">
                <button
                  type="button"
                  className="p-0 m-0 dark:text-white font-bold  hover:opacity-90 flex text-sm gap-1 items-center"
                >
                  Help
                  <HelpIcon fill="currentColor" />
                </button>
              </Link>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-1 gap-2 flex flex-col">
            <button
              disabled={loading || loginForm._seedPhrase.length === 0}
              type="submit"
              className={primaryFormButtonStyle}
            >
              Login
            </button>
            <div className="flex items-center gap-6 py-2 text-sm">
              <div className="h-[1px] w-full bg-grey40 dark:bg-grey"></div>
              <div>OR</div>
              <div className="h-[1px] w-full bg-grey40 dark:bg-grey"></div>
            </div>
            <button
              onClick={handleGenerate}
              type="button"
              disabled={loading}
              className="text-white text-sm lg:text-base dark:text-white bg-black hover:bg-darkContrast w-full flex gap-2 items-center justify-center py-3.5"
            >
              {generated ? "Regenerate" : "Generate"} secret key{" "}
              <KeyIcon fill="currentColor" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
