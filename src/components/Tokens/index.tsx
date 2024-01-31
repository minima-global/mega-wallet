import { useContext } from "react";
import { appContext } from "../../AppContext";

import * as utils from "../../utils";
import useFormatMinimaNumber from "../../utils/useMakeNumber";

interface IProps {
  selectionMode: boolean;
  selectToken?: any;
  filterText: string;
}
const Tokens = ({ selectToken, selectionMode = false, filterText }: IProps) => {
  const { _balance } = useContext(appContext);
  const { makeMinimaNumber } = useFormatMinimaNumber();

  if (!_balance) {
    return <div>No tokens available.</div>;
  }

  if (
    _balance.filter(
      (t) =>
        utils.containsText(
          t.tokenid === "0x00"
            ? t.token
            : "name" in t.token
            ? t.token.name
            : "",
          filterText
        ) || utils.containsText(t.tokenid, filterText)
    ).length === 0
  ) {
    return <div className="mx-auto ">No tokens found matching your search</div>;
  }

  return (
    <ul className="">
      {_balance
        .filter(
          (t) =>
            utils.containsText(
              t.tokenid === "0x00"
                ? t.token
                : "name" in t.token
                ? t.token.name
                : "",
              filterText
            ) || utils.containsText(t.tokenid, filterText)
        )
        .map((token) =>
          token.tokenid === "0x00" ? (
            <li
              onClick={selectToken ? () => selectToken(token) : () => null}
              className={`grid grid-cols-[auto_1fr] items-center gap-2 bg-white dark:bg-black p-1 mb-2 rounded ${
                selectionMode ? "hover:bg-teal-500 border-teal-500 border" : ""
              }`}
              key={token.tokenid}
            >
              <img
                alt="token-icon"
                src="./assets/token.svg"
                className="w-14 min-w-14"
              />
              <div className="overflow-hidden">
                <div className="grid grid-cols-[auto_1fr]">
                  <h6 className="font-bold truncate">Minima</h6>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-blue-500 text-black ml-1"
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
                {!selectionMode && (
                  <p className="text-sm font-mono truncate">
                    {makeMinimaNumber(token.unconfirmed, 2000)}
                    {token.unconfirmed != "0"
                      ? "/" + makeMinimaNumber(token.unconfirmed, 2000)
                      : null}
                  </p>
                )}
                {selectionMode && <p className="font-bold text-sm">MINIMA</p>}
              </div>
            </li>
          ) : (
            <li
              onClick={selectToken ? () => selectToken(token) : () => null}
              className={`grid grid-cols-[auto_1fr] items-center gap-2 bg-white dark:bg-black p-1 mb-2 rounded ${
                selectionMode ? "hover:bg-teal-500 border-teal-500 border" : ""
              }`}
              key={token.tokenid}
            >
              <img
                alt="token-icon"
                src={
                  "url" in token.token && token.token.url.length
                    ? token.token.url
                    : `https://robohash.org/${token.tokenid}`
                }
                className="bg-[#080A0B] w-[56px] min-w-[56px] h-[56px] min-h-[56px]"
              />
              <div className="overflow-hidden">
                <h6 className="font-bold truncate">
                  {"name" in token.token && typeof token.token.name === "string"
                    ? token.token.name
                    : "N/A"}
                </h6>
                {!selectionMode && (
                  <p className="text-sm font-mono truncate">
                    {makeMinimaNumber(token.confirmed, 2000)}
                    {token.unconfirmed != "0"
                      ? "/" + makeMinimaNumber(token.unconfirmed, 2000)
                      : null}
                  </p>
                )}
                {selectionMode && (
                  <p className="text-sm font-bold">
                    {token.token && "ticker" in token.token
                      ? token.token.ticker
                      : ""}
                  </p>
                )}
              </div>
            </li>
          )
        )}
    </ul>
  );
};

export default Tokens;
