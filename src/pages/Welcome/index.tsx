import { useState } from "react";
import { outlineFormButtonStyle, primaryFormButtonStyle } from "../../styles";
import { useNavigate } from "react-router-dom";
import TermsAndConditions from "../TermsAndConditions";

const Welcome = () => {
  const navigate = useNavigate();
  const [showTerms, setShowTerms] = useState(false);

  const handleOnClick = () => {
    if (localStorage.getItem("first-time") === "true") {
      return setShowTerms(true);
    }

    navigate("/login");
  };

  if (showTerms) {
    return <TermsAndConditions />;
  }

  return (
    <div className="w-full flex items-center justify-center pb-24 lg:pb-14">
      <div className="w-full lg:w-[600px] m-4 lg:mx-auto bg-grey10 dark:bg-mediumDarkContrast p-4 lg:p-6 rounded-lg text-black dark:text-white">
        <div className="flex flex-col">
          <h1 className="pt-0.5 text-2xl lg:text-3xl">Minima Public Wallet</h1>
          <div className="w-full h-[2px] bg-grey40 dark:bg-grey my-5 lg:my-5" />
          <div className="flex flex-col gap-4 text-xs lg:text-sm tracking-[0.2px] dark:text-grey40 mb-4">
            <p className="text-lg lg:text-xl lg:mb-1.5">
              This is the official Public Wallet provided by Minima Global. It
              is non-custodial and no private data is stored or recorded by
              Minima.
            </p>
            <p>
              This wallet allows you to send, receive, and store Minima, custom
              tokens, and NFTs without needing to run a Minima node.
            </p>
            <p className="font-bold">
              On first use, you will generate a secret key. Keep this key secure, as it will not be shown again after logging out. Losing this key means losing access to your assets.
            </p>
            <p>
              For future access, log in using this same secret key.
            </p>
            <p>
              If you decide to run your own Minima node, simply send your assets
              to your new node wallet address.
            </p>
            <div className="my-2 lg:my-4 mx-auto dark:text-main bg-yellow dark:bg-lightDarkContrast border-l-4 border-main px-5 py-3 rounded-[4px]">
              <div className="flex items-center justify-center">
                <span className="pr-5 hidden lg:block">
                  <svg width="22" height="18" viewBox="0 0 22 18" xmlns="http://www.w3.org/2000/svg" className="dark:fill-main">
                    <path d="M0.865234 17.5L10.9997 0L21.1342 17.5H0.865234ZM3.44973 16H18.5497L10.9997 3L3.44973 16ZM10.9997 14.8077C11.2286 14.8077 11.4204 14.7303 11.5752 14.5755C11.7301 14.4207 11.8075 14.2288 11.8075 14C11.8075 13.7712 11.7301 13.5793 11.5752 13.4245C11.4204 13.2697 11.2286 13.1923 10.9997 13.1923C10.7709 13.1923 10.5791 13.2697 10.4242 13.4245C10.2694 13.5793 10.192 13.7712 10.192 14C10.192 14.2288 10.2694 14.4207 10.4242 14.5755C10.5791 14.7303 10.7709 14.8077 10.9997 14.8077ZM10.2497 12.1923H11.7497V7.19225H10.2497V12.1923Z" fill="#currentColor"></path>
                  </svg>
                </span>
                <p className="text-xs lg:text-sm">If you prefer not to use the official Public Wallet and are unable to run your own node, you may ask someone running a Minima node on a server to set up a public wallet on your behalf. However, always exercise caution—websites can be compromised or manipulated, so only use wallet providers you know and trust.</p>
              </div>
            </div>
          </div>
          <div className="mt-auto">
            <div className="mt-1 flex flex-col gap-4">
              <button
                type="button"
                onClick={handleOnClick}
                className={primaryFormButtonStyle}
              >
                Continue
              </button>
              <a href="https://docs.minima.global/docs/user-guides/public-wallet" target="_blank" rel="noreferrer">
                <button
                  type="button"
                  className={outlineFormButtonStyle}
                >
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
