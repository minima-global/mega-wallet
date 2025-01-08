import { useState } from "react";
import { outlineFormButtonStyle, primaryFormButtonStyle } from "../../styles";
import { useNavigate } from "react-router-dom";
import TermsAndConditions from "../TermsAndConditions";
import HelpContent from "../../components/HelpContent";

const Welcome = () => {
  const navigate = useNavigate();
  const [showTerms, setShowTerms] = useState(false);

  const handleOnClick = () => {
    if (localStorage.getItem("first-time") === "true" || !localStorage.getItem("first-time")) {
      return setShowTerms(true);
    }

    navigate("/login");
  };

  if (showTerms) {
    return <TermsAndConditions />;
  }

  return (
    <div className="w-full flex items-center justify-center pb-24 lg:pb-6">
      <div className="w-full md:max-w-[600px] m-4 lg:mx-auto bg-grey10 dark:bg-mediumDarkContrast p-4 lg:p-6 rounded-lg text-black dark:text-white">
        <div className="flex flex-col">
          <HelpContent />
          <div className="mt-2">
            <div className="mt-1 flex flex-col gap-4">
              <button
                type="button"
                onClick={handleOnClick}
                className={primaryFormButtonStyle}
              >
                Continue
              </button>
              <a
                href="https://docs.minima.global/docs/user-guides/public-wallet"
                target="_blank"
                rel="noreferrer"
              >
                <button type="button" className={outlineFormButtonStyle}>
                  Learn more
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
