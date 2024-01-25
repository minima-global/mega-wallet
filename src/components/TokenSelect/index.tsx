import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { appContext } from "../../AppContext";
import { useSpring, animated, config } from "react-spring";

import styles from "./TokenSelect.module.css";
import Dialog from "../UI/Dialog";
import Tokens from "../Tokens";

interface IProps {
  _balance: object[] | null;
}
const TokenSelect = ({ _balance }: IProps) => {
  const { _promptTokenSelectionDialog, promptTokenSelectionDialog } =
    useContext(appContext);
  const [active, setActive] = useState<null | any>(null);

  const springProps = useSpring({
    opacity: _promptTokenSelectionDialog ? 1 : 0,
    transform: _promptTokenSelectionDialog
      ? "translateY(0%) scale(1)"
      : "translateY(-50%) scale(0.8)",
    config: config.wobbly,
  });

  useEffect(() => {
    if (_balance && !active) {
      setActive(_balance[0]);
    }
  }, [_balance]);

  if (!_balance) {
    return <div>Loading...</div>;
  }

  const handleTokenSelection = (token: any) => {
    setActive(token);
    promptTokenSelectionDialog();
  };

  return (
    <>
      {/*   border: 2px solid #464C4F; */}
      <div
        className="px-4 py-2 bg-inherit border-2 border-[#464C4F] mb-2 rounded-full hover:bg-teal-500 hover:cursor-pointer"
        onClick={promptTokenSelectionDialog}
        id="active"
      >
        {active && active.tokenid === "0x00" && (
          <div className="grid grid-cols-[auto_1fr] gap-2">
            <img
              alt="minima-token"
              src="/assets/token.svg"
              className="w-[48px] h-[48px] rounded-full"
            />
            <div>
              <h3 className="font-bold">Minima</h3>
              <p className="font-mono">{active.confirmed}</p>
            </div>
          </div>
        )}
      </div>

      {_promptTokenSelectionDialog &&
        createPortal(
          <Dialog dismiss={promptTokenSelectionDialog}>
            <div className="h-full grid items-center">
              <animated.div style={springProps}>
                <div className="relative left-0 right-0 bottom-0 top-0 bg-transparent">
                  <div className="bg-black h-[50vh] w-full p-4 rounded">
                    <section className={styles["tokens"]}>
                      <div className="grid grid-cols-[1fr_auto] items-center">
                        <h1 className="text-lg">Select a token</h1>
                        <svg
                          className="text-gray-500"
                          onClick={promptTokenSelectionDialog}
                          xmlns="http://www.w3.org/2000/svg"
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
                          <path d="M18 6l-12 12" />
                          <path d="M6 6l12 12" />
                        </svg>
                      </div>
                      <input placeholder="Search tokens" type="search" />
                      <Tokens
                        selectionMode
                        selectToken={handleTokenSelection}
                      />
                    </section>
                  </div>
                </div>
              </animated.div>
            </div>
          </Dialog>,
          document.body
        )}
    </>
  );
};

export default TokenSelect;
