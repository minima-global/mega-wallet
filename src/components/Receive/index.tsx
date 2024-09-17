import { useContext, useEffect, useRef, useState } from "react";
import { appContext } from "../../AppContext";
import { useSpring, animated, config } from "react-spring";
import QRCode from "react-qr-code";
import * as utils from "../../utils";
import { titleStyle } from "../../styles";
import isMobileDevice from "../../utils/isMobile";

const Receive = () => {
  const { _currentNavigation, _address, _promptLogin, notify } =
    useContext(appContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const [copied, setCopied] = useState(false);

  const springProps = useSpring({
    opacity: _currentNavigation === "receive" ? 1 : 0,
    transform:
      _currentNavigation === "receive"
        ? "translateY(0%) scale(1)"
        : "translateY(-50%) scale(1)",
    config: config.gentle,
  });

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
      notify("Copied your address to clipboard");
    }
    utils.copyToClipboard(_address);
  };

  const handleDoubleClick = () => {
    handleCopy();
    if (inputRef.current) {
      inputRef.current.select();
    }
  };

  if (_currentNavigation !== "receive" || _promptLogin) {
    return null;
  }

  if (!_address) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="animate-spin mx-auto"
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
        <path d="M10 20.777a8.942 8.942 0 0 1 -2.48 -.969" />
        <path d="M14 3.223a9.003 9.003 0 0 1 0 17.554" />
        <path d="M4.579 17.093a8.961 8.961 0 0 1 -1.227 -2.592" />
        <path d="M3.124 10.5c.16 -.95 .468 -1.85 .9 -2.675l.169 -.305" />
        <path d="M6.907 4.579a8.954 8.954 0 0 1 3.093 -1.356" />
      </svg>
    );
  }

  return (
    <animated.div style={springProps}>
      <div className="max-w-md mx-auto p-6 rounded-lg">
        <div className="flex flex-col items-center space-y-6">
          <div className="bg-white dark:bg-[#1b1b1b] p-4 rounded-lg shadow-inner shadow-neutral-200 dark:shadow-[#1b1b1b]">
            <QRCode value={_address} size={200} />
          </div>

          <div className="w-full space-y-2">
            <label htmlFor="address" className={titleStyle}>
              Your Address
            </label>
            <div className="flex text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:border-transparent dark:bg-[#1b1b1b] dark:text-white dark:border-neutral-700 rounded-r-lg">
              <input
                ref={inputRef}
                id="address"
                readOnly
                value={_address}
                type="text"
                className="w-full bg-transparent focus:outline-none px-3 truncate"
                onDoubleClick={handleDoubleClick}
              />
              <button
                type="button"
                onClick={handleCopy}
                className={`rounded-l-none text-sm rounded-md transition-all duration-200 ${
                  copied
                    ? "bg-teal-500 text-white dark:text-[#1b1b1b]"
                    : "bg-teal-500 text-white hover:bg-teal-600 dark:text-[#1b1b1b]"
                }`}
              >
                {copied ? (
                  <span className="flex items-center">
                    Copied
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                ) : (
                  "Copy"
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Double-click to copy the entire address
            </p>
          </div>
        </div>
      </div>
    </animated.div>
  );
};

export default Receive;
