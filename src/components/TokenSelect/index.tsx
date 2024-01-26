import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { appContext } from "../../AppContext";
import { useSpring, animated, config } from "react-spring";

import styles from "./TokenSelect.module.css";
import Dialog from "../UI/Dialog";
import Tokens from "../Tokens";
import { useFormikContext } from "formik";
import useFormatMinimaNumber from "../../utils/useMakeNumber";

interface IProps {
  _balance: object[] | null;
}
const TokenSelect = ({ _balance }: IProps) => {
  const formik: any = useFormikContext();
  const { makeMinimaNumber } = useFormatMinimaNumber();
  const { _promptTokenSelectionDialog, promptTokenSelectionDialog } =
    useContext(appContext);

  const [filter, setFilterText] = useState("");

  const handleFilterTextChange = (evt) => {
    setFilterText(evt.target.value);
  };

  const springProps = useSpring({
    opacity: _promptTokenSelectionDialog ? 1 : 0,
    transform: _promptTokenSelectionDialog
      ? "translateY(0%) scale(1)"
      : "translateY(-50%) scale(0.8)",
    config: config.wobbly,
  });

  useEffect(() => {
    if (_balance && !formik.values.token) {
      formik.setFieldValue("token", _balance[0]);
    }
  }, [_balance]);

  if (!_balance) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="animate-spin mx-auto mb-2"
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

  const handleTokenSelection = (token: any) => {
    formik.setFieldValue("token", token);
    promptTokenSelectionDialog();
  };

  const active = formik.values.token;

  return (
    <>
      <div
        className="px-4 py-2 bg-inherit border-2 border-[#464C4F] mb-2 rounded-full hover:bg-teal-500 hover:cursor-pointer"
        onClick={promptTokenSelectionDialog}
        id="active"
      >
        {active && active.tokenid === "0x00" && (
          <div className="grid grid-cols-[auto_1fr] gap-2">
            <img
              alt="minima-token"
              src="./assets/token.svg"
              className="w-[48px] h-[48px] rounded-full"
            />
            <div>
              <div className="grid grid-cols-[auto_1fr]">
                <h6 className="font-bold">Minima</h6>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-blue-500 ml-1"
                  width="18"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7c.412 .41 .97 .64 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1c0 .58 .23 1.138 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1" />
                  <path d="M9 12l2 2l4 -4" />
                </svg>
              </div>
              <p className="font-mono">
                {makeMinimaNumber(active.confirmed, 2000)}
              </p>
            </div>
          </div>
        )}

        {active && active.tokenid !== "0x00" && (
          <div className="grid grid-cols-[auto_1fr] gap-2">
            <img
              alt="minima-token"
              src={
                "url" in active.token && active.token.url.length
                  ? active.token.url
                  : `https://robohash.org/${active.tokenid}`
              }
              className="w-[48px] h-[48px] rounded-full"
            />
            <div>
              <h3 className="font-bold">
                {"name" in active.token && typeof active.token.name === "string"
                  ? active.token.name
                  : "N/A"}
              </h3>
              <p className="font-mono">
                {makeMinimaNumber(active.confirmed, 2000)}
              </p>
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
                  <div
                    className={`bg-black w-[calc(100%_-_16px)] overflow-auto mx-auto md:w-full p-4 rounded ${
                      _balance.length < 5 ? "h-[50vh]" : "h-auto max-h-[50vh]"
                    }`}
                  >
                    <section className={styles["tokens"]}>
                      <div className="grid grid-cols-[1fr_auto] items-center">
                        <h1 className="text-lg text-white dark:text-teal-500">
                          Select a token
                        </h1>
                        <svg
                          className="text-gray-500 hover:scale-105 hover:text-gray-600 hover:cursor-pointer hover:outline-offset-2"
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
                      <input
                        value={filter}
                        onChange={handleFilterTextChange}
                        placeholder="Search tokens"
                        type="search"
                      />
                      <Tokens
                        filterText={filter}
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
