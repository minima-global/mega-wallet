import { useContext, useEffect, useState } from "react";
import { appContext } from "../../AppContext";
import { useSpring, animated, config } from "react-spring";

import styles from "./TokenSelect.module.css";
import Tokens from "../Tokens";
import { useFormikContext } from "formik";
import useFormatMinimaNumber from "../../utils/useMakeNumber";
import AnimatedSelect from "../UI/AnimatedSelect";
import {
  searchInputStyle,
  selectableTokenWrapperStyle,
  titleStyle,
} from "../../styles";
import CaretIcon from "../UI/Icons/CaretIcon";

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

  const handleTokenSelection = (token: any) => {
    formik.setFieldValue("token", token);
    promptTokenSelectionDialog();
  };

  const active = formik.values.token;

  return (
    <>
      <div
        className={`${
          formik.isSubmitting ? "opacity-40 cursor-not-allowed" : ""
        }`}
      >
        {active && active.tokenid === "0x00" && (
          <div
            className={`${selectableTokenWrapperStyle}`}
            onClick={() => {
              promptTokenSelectionDialog();
            }}
          >
            <div className="w-9 h-9 rounded-full overflow-hidden">
              <img
                src="./assets/token.svg"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="my-auto py-1">
              <p className="font-bold">MINIMA</p>
              {/*
              <span className="text-xs">
                {makeMinimaNumber(active.confirmed, 2000)}
                {active.unconfirmed != "0"
                  ? "/" + makeMinimaNumber(active.unconfirmed, 2000)
                  : null}
              </span>

              */}
            </div>
            <CaretIcon />
          </div>
        )}

        {active && active.tokenid !== "0x00" && (
          <div className="grid grid-cols-[auto_1fr] gap-2">
            <div className="w-9 h-9 rounded-full overflow-hidden">
              <img
                alt="minima-token"
                src={
                  "url" in active.token && active.token.url.length
                    ? active.token.url
                    : `https://robohash.org/${active.tokenid}`
                }
                className="w-full h-full object-cover"
              />
            </div>
            <div className="my-auto py-1">
              <p className="font-bold">
                {"name" in active.token && typeof active.token.name === "string"
                  ? active.token.name
                  : "N/A"}
              </p>
              {/*
              <p className="font-mono truncate">
                {makeMinimaNumber(active.confirmed, 2000)}
                {active.unconfirmed != "0"
                  ? "/" + makeMinimaNumber(active.unconfirmed, 2000)
                  : null}
              </p>

              */}
            </div>
          </div>
        )}
      </div>

      <AnimatedSelect
        display={_promptTokenSelectionDialog}
        dismiss={() => null}
      >
        <div className="relative left-0 right-0 bottom-0 top-0 bg-transparent">
          <div
            className={`overflow-auto mx-auto md:w-full p-4 rounded ${
              _balance.length < 5 ? "h-[50vh]" : "h-auto max-h-[50vh]"
            }`}
          >
            <section>
              <div className="grid grid-cols-[1fr_auto] items-center">
                <h3 className={titleStyle}>Select a token</h3>
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
                className={searchInputStyle}
              />
              <Tokens
                filterText={filter}
                selectionMode
                selectToken={handleTokenSelection}
              />
            </section>
          </div>
        </div>
      </AnimatedSelect>
    </>
  );
};

export default TokenSelect;
