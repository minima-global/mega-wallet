import { useEffect, useState, useContext } from "react";
import { appContext } from "../../AppContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import VisibleIcon from "../../components/UI/Icons/VisibleIcon";
import HideIcon from "../../components/UI/Icons/HideIcon";
import InfoBox from "../../components/UI/InfoBox";
import isMobileDevice from "../../utils/isMobile";
import { copyToClipboard } from "../../utils";
import {
  inputIconStyle,
  inputWrapperStyle,
  primaryFormButtonStyle,
  wrappedInputStyle,
} from "../../styles";
import Backdrop from "../../components/Backdrop";

const Logout = () => {
  const {
    loginForm,
    setLoginForm,
    _address,
    _keyUsages,
    resetAccount,
    notify,
    _promptLogoutDialog,
    setPromptLogoutDialog,
  } = useContext(appContext);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [visibility, toggleVisiblity] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedKeyUses, setCopiedKeyUses] = useState(false);
  const isMobile = isMobileDevice();

  const handleOnCopy = () => {
    setCopied(true);
    copyToClipboard(loginForm._seedPhrase);

    if (!isMobile) {
      notify("Copied your address to clipboard");
    }
  };

  const handleCopyKeyUses = () => {
    setCopiedKeyUses(true);
    copyToClipboard(_keyUsages[_address] ? _keyUsages[_address] : 1);

    if (!isMobile) {
      notify("Copied your address to clipboard");
    }
  };

  const handleToggleVisibility = () => {
    toggleVisiblity((prevState) => !prevState);
  };

  useEffect(() => {
    if (copied) {
      const interval = setTimeout(() => {
        setCopied(false);
      }, 2000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [copied]);

  useEffect(() => {
    if (copiedKeyUses) {
      const interval = setTimeout(() => {
        setCopiedKeyUses(false);
      }, 2000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [copiedKeyUses]);

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
  }, [params, setLoginForm]);

  const handleOnClick = () => {
    resetAccount();
    setPromptLogoutDialog(false);
    navigate("/login");
  };

  const dismiss = () => {
    setPromptLogoutDialog(false);
  };

  return (
    <div
      className={`absolute z-50 top-0 left-0 ${_promptLogoutDialog ? "block" : "hidden"}`}
    >
      <div className="lg:h-screen w-screen flex p-3 lg:p-0 lg:items-center">
        <Backdrop onClick={dismiss}/>
        <div
            className="relative z-50 bg-grey10 dark:bg-mediumDarkContrast rounded border dark:border-darkContrast w-full max-w-[640px] min-h-[500px] mx-auto lg:mb-10 p-4 lg:p-6">
          <h1 className="pt-0.5 text-xl lg:text-2xl mb-5">
            Log out of this session
          </h1>
          <div className="w-full h-[2px] bg-grey40 dark:bg-grey my-3 lg:my-6"/>
          <p className="dark:text-grey40 text-sm lg:text-sm mb-6 mt-4 flex items-center gap-2">
            If you haven't stored your secret code then this is your last
            chance!
          </p>
          <div className="flex flex-row gap-3">
            <div className={`${inputWrapperStyle} flex-1`}>
              <div className="flex">
                <input
                    readOnly={true}
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
                        <VisibleIcon fill="currentColor" size={22}/>
                    )}
                    {visibility && <HideIcon fill="currentColor" size={22}/>}
                  </span>
                </div>
              </div>
            </div>
            {loginForm._seedPhrase.length > 0 && (
                <div
                    role="button"
                    onClick={handleOnCopy}
                    className={`lg:w-fit py-3 flex select-none justify-center items-center active:scale-[95%] gap-3 text-sm bg-opacity-30 rounded-lg px-6 text-black transition-all ${copied ? "bg-green" : "bg-white hover:bg-grey40"}`}
                >
                  <span className="hidden lg:block">Copy</span>
                  <svg
                      width="13"
                      height="16"
                      viewBox="0 0 13 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`${copied ? "fill-black" : "fill-black"} transition-all h-[20px]`}
                  >
                    <path
                        d="M4.04813 12.5833C3.67299 12.5833 3.3559 12.4538 3.09687 12.1948C2.83785 11.9358 2.70833 11.6187 2.70833 11.2435V1.75645C2.70833 1.38131 2.83785 1.06423 3.09687 0.805199C3.3559 0.546171 3.67299 0.416656 4.04813 0.416656H11.5352C11.9103 0.416656 12.2274 0.546171 12.4865 0.805199C12.7455 1.06423 12.875 1.38131 12.875 1.75645V11.2435C12.875 11.6187 12.7455 11.9358 12.4865 12.1948C12.2274 12.4538 11.9103 12.5833 11.5352 12.5833H4.04813ZM4.04813 11.5H11.5352C11.5994 11.5 11.6581 11.4733 11.7115 11.4198C11.7649 11.3664 11.7917 11.3077 11.7917 11.2435V1.75645C11.7917 1.69228 11.7649 1.63353 11.7115 1.5802C11.6581 1.52673 11.5994 1.49999 11.5352 1.49999H4.04813C3.98396 1.49999 3.92521 1.52673 3.87188 1.5802C3.8184 1.63353 3.79167 1.69228 3.79167 1.75645V11.2435C3.79167 11.3077 3.8184 11.3664 3.87188 11.4198C3.92521 11.4733 3.98396 11.5 4.04813 11.5ZM1.46479 15.1667C1.08965 15.1667 0.772569 15.0371 0.513542 14.7781C0.254514 14.5191 0.125 14.202 0.125 13.8269V3.25645H1.20833V13.8269C1.20833 13.891 1.23507 13.9498 1.28854 14.0031C1.34188 14.0566 1.40062 14.0833 1.46479 14.0833H10.0352V15.1667H1.46479Z"
                        fill="#currentColor"
                    />
                  </svg>
                </div>
            )}
          </div>

          <div className="mt-4 mb-6">
            <InfoBox>
              Make sure you store a copy of your secret somewhere safe. Hyphens
              (-) are required. You cannot recover it later.
            </InfoBox>
          </div>

          <div>
            <h5 className="mb-3">Key uses</h5>
            <div className="flex flex-row gap-3">
              <div className={`${inputWrapperStyle} flex-1`}>
                <div className="flex">
                  <input
                      readOnly={true}
                      placeholder="Your secret phrase"
                      name="_seedPhrase"
                      value={_keyUsages[_address] ? _keyUsages[_address] : 1}
                      className={`${wrappedInputStyle} flex-grow`}
                  />
                </div>
              </div>
              <div
                  role="button"
                  onClick={handleCopyKeyUses}
                  className={`lg:w-fit py-3 flex select-none justify-center items-center active:scale-[95%] gap-3 text-sm bg-opacity-30 rounded-lg px-6 text-black transition-all ${copied ? "bg-green" : "bg-white hover:bg-grey40"}`}
              >
                <span className="hidden lg:block">Copy</span>
                <svg
                    width="13"
                    height="16"
                    viewBox="0 0 13 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${copiedKeyUses ? "fill-black" : "fill-black"} transition-all h-[20px]`}
                >
                  <path
                      d="M4.04813 12.5833C3.67299 12.5833 3.3559 12.4538 3.09687 12.1948C2.83785 11.9358 2.70833 11.6187 2.70833 11.2435V1.75645C2.70833 1.38131 2.83785 1.06423 3.09687 0.805199C3.3559 0.546171 3.67299 0.416656 4.04813 0.416656H11.5352C11.9103 0.416656 12.2274 0.546171 12.4865 0.805199C12.7455 1.06423 12.875 1.38131 12.875 1.75645V11.2435C12.875 11.6187 12.7455 11.9358 12.4865 12.1948C12.2274 12.4538 11.9103 12.5833 11.5352 12.5833H4.04813ZM4.04813 11.5H11.5352C11.5994 11.5 11.6581 11.4733 11.7115 11.4198C11.7649 11.3664 11.7917 11.3077 11.7917 11.2435V1.75645C11.7917 1.69228 11.7649 1.63353 11.7115 1.5802C11.6581 1.52673 11.5994 1.49999 11.5352 1.49999H4.04813C3.98396 1.49999 3.92521 1.52673 3.87188 1.5802C3.8184 1.63353 3.79167 1.69228 3.79167 1.75645V11.2435C3.79167 11.3077 3.8184 11.3664 3.87188 11.4198C3.92521 11.4733 3.98396 11.5 4.04813 11.5ZM1.46479 15.1667C1.08965 15.1667 0.772569 15.0371 0.513542 14.7781C0.254514 14.5191 0.125 14.202 0.125 13.8269V3.25645H1.20833V13.8269C1.20833 13.891 1.23507 13.9498 1.28854 14.0031C1.34188 14.0566 1.40062 14.0833 1.46479 14.0833H10.0352V15.1667H1.46479Z"
                      fill="#currentColor"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-4 mb-6">
              <InfoBox>
                We recommend taking a note of your key uses. This should be increased each time you use the public
                wallet.
              </InfoBox>
            </div>
          </div>

          <div className="mt-auto md:mt-4 flex flex-col gap-4">
            <button onClick={handleOnClick} className={primaryFormButtonStyle}>
              Logout
            </button>
            <button
                onClick={dismiss}
                className="w-full text-white bg-black py-3.5 transition-all hover:bg-darkContrast"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;
