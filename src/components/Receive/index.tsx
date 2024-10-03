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
    <div className="bg-darkContrast p-10">
      <div className="w-full max-w-[450px] mx-auto">
        <div className="bg-white w-fit mx-auto p-4">
          <QRCode value={_address} size={200} />
        </div>
        <div className="mt-6 bg-mediumDarkContrast py-3 px-4 rounded text-sm break-all">
          {_address}
        </div>
        <div className="mt-4">
          <button
            type="button"
            onClick={handleCopy}
            className={`w-full text-sm py-3 pb-3.5 flex items-center justify-center ${
              copied
                ? "bg-mediumDarkContrast dark:font-bold"
                : "bg-mediumDarkContrast text-white dark:font-bold"
            }`}
          >
            Copy
            <svg
              width="13"
              height="16"
              viewBox="0 0 13 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-white ml-3"
            >
              <path
                d="M4.04813 12.5834C3.67299 12.5834 3.3559 12.4538 3.09687 12.1948C2.83785 11.9358 2.70833 11.6187 2.70833 11.2436V1.75648C2.70833 1.38134 2.83785 1.06426 3.09687 0.805229C3.3559 0.546201 3.67299 0.416687 4.04813 0.416687H11.5352C11.9103 0.416687 12.2274 0.546201 12.4865 0.805229C12.7455 1.06426 12.875 1.38134 12.875 1.75648V11.2436C12.875 11.6187 12.7455 11.9358 12.4865 12.1948C12.2274 12.4538 11.9103 12.5834 11.5352 12.5834H4.04813ZM4.04813 11.5H11.5352C11.5994 11.5 11.6581 11.4733 11.7115 11.4198C11.7649 11.3665 11.7917 11.3077 11.7917 11.2436V1.75648C11.7917 1.69231 11.7649 1.63356 11.7115 1.58023C11.6581 1.52676 11.5994 1.50002 11.5352 1.50002H4.04813C3.98396 1.50002 3.92521 1.52676 3.87188 1.58023C3.8184 1.63356 3.79167 1.69231 3.79167 1.75648V11.2436C3.79167 11.3077 3.8184 11.3665 3.87188 11.4198C3.92521 11.4733 3.98396 11.5 4.04813 11.5ZM1.46479 15.1667C1.08965 15.1667 0.772569 15.0372 0.513542 14.7781C0.254514 14.5191 0.125 14.202 0.125 13.8269V3.25648H1.20833V13.8269C1.20833 13.8911 1.23507 13.9498 1.28854 14.0031C1.34188 14.0566 1.40062 14.0834 1.46479 14.0834H10.0352V15.1667H1.46479Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Receive;
