import { useContext, useEffect, useRef, useState } from "react";
import styles from "./Receive.module.css";
import { appContext } from "../../AppContext";
import { useSpring, animated, config } from "react-spring";
import QRCode from "react-qr-code";
import * as utils from "../../utils";

const Receive = () => {
  const { _currentNavigation, _address, _promptLogin } = useContext(appContext);
  const inputRef = useRef(null);

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
    utils.copyToClipboard(_address);
  };

  const handleDoubleClick = () => {
    handleCopy();
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
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
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
      <section className={styles["tokens"]}>
        <div className="mx-auto">
          <QRCode value={_address} />

          <input
            ref={inputRef}
            readOnly
            value={_address}
            type="text"
            name="amount"
            placeholder="Your amount"
            className="mb-2 w-full mt-8"
            onDoubleClick={handleDoubleClick}
          />
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
            } text-black mx-auto relative items-center w-full mt-1 font-bold text-grey bg-teal-300 max-w-[200px] flex justify-between dark:text-black`}
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
        </div>
      </section>
    </animated.div>
  );
};

export default Receive;
