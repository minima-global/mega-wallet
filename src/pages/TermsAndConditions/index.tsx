import { useState } from "react";
import ModernCheckbox from "../../components/UI/Toggle";
import { primaryFormButtonStyle } from "../../styles";
import { useNavigate } from "react-router-dom";

const TermsAndConditions = () => {
  const navigate = useNavigate();
  const [acccepted, setAccepted] = useState(false);

  const handleOnClick = () => {
    localStorage.setItem("first-time", "false");
    navigate("/login");
  };

  return (
    <div className="w-full flex items-center justify-center pb-24 lg:pb-14">
      <div className="w-full lg:w-[600px] m-4 lg:mx-auto bg-grey10 dark:bg-mediumDarkContrast p-4 lg:p-6 rounded-lg text-black dark:text-white">
        <div className="flex flex-col">
          <h1 className="pt-0.5 text-2xl lg:text-3xl">
            Public Wallet Disclaimer
          </h1>
          <div className="w-full h-[2px] bg-grey40 dark:bg-grey my-5 lg:my-5" />
          <div className="flex flex-col gap-4 text-xs lg:text-sm tracking-[0.2px] dark:text-grey40 mb-4">
            <p className="text-lg lg:text-xl lg:mb-1.5">
              Please carefully review and confirm your acceptance of the
              following Minima Terms of Use by checking the box provided:
            </p>
            <label>
              <ModernCheckbox
                label="On your first use, you will generate a secret key. Keep this key
                secure, as it will not be shown again after logging out. Losing
                this key means losing access to your assets."
                onChange={() => setAccepted((prevState) => !prevState)}
                checked={acccepted}
              />
            </label>
          </div>

          <div className="mt-auto md:mt-4">
            <div className="mt-1">
              <button
                type="button"
                onClick={handleOnClick}
                disabled={!acccepted}
                className={primaryFormButtonStyle}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
