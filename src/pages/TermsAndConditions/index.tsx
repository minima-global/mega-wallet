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
            Please carefully review and confirm your acceptance of the following Minima <a target="_blank" rel="noreferrer" className="underline" href="https://docs.minima.global/docs/terms/minidappterms/#section-d-minidapp-for-transacting-public-mega-wallet">Terms of Use</a> by checking the box provided:
            </p>
            <div>
              <div>
                I confirm that I have fully read and understood the Minima Terms of Use, specifically <a target="_blank" rel="noreferrer" className="underline" href="https://docs.minima.global/docs/terms/minidappterms/#section-a-general-terms-applicable-to-all-minidapps">Section A - General Terms Applicable to all MiniDapps</a>, <a target="_blank" rel="noreferrer" className="underline" href="https://docs.minima.global/docs/terms/minidappterms/#section-d-minidapp-for-transacting-public-mega-wallet">Section D - Public Wallet</a> and <a target="_blank" rel="noreferrer" className="underline" href="https://docs.minima.global/docs/terms/minidappterms/#section-p-dealing-in-minima">Section P - Dealing in Minima</a>. I unconditionally agree to comply with the Terms of Use, including any future changes. This commitment is irrevocable and applies to all my interactions with Minima, eliminating the need for repeated confirmations with each use.
              </div>
              <div className="mt-6">
                <ModernCheckbox
                  label="I agree to the terms and conditions"
                  onChange={() => setAccepted((prevState) => !prevState)}
                  checked={acccepted}
                />
              </div>
            </div>
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
