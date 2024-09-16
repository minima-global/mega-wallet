import { useContext, useEffect } from "react";
import { appContext } from "../../AppContext";

import * as utils from "../../utils";
import useFormatMinimaNumber from "../../utils/useMakeNumber";

interface IProps {
  selectionMode: boolean;
  selectToken?: any;
  filterText: string;
}
const Tokens = ({ selectToken, selectionMode = false, filterText }: IProps) => {
  const { _balance, getBalance } = useContext(appContext);
  const { makeMinimaNumber } = useFormatMinimaNumber();

  useEffect(() => {
    getBalance();
  }, []);

  if (!_balance) {
    return (
      <div>
        <p className="text-center text-sm text-neutral-400">
          Balance not available
        </p>
      </div>
    );
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
          filterText,
        ) || utils.containsText(t.tokenid, filterText),
    ).length === 0
  ) {
    return (
      <div>
        <p className="text-center text-sm text-neutral-400">No results found</p>
      </div>
    );
  }

  return (
    <ul>
      {_balance
        .filter(
          (t) =>
            utils.containsText(
              t.tokenid === "0x00"
                ? t.token
                : "name" in t.token
                  ? t.token.name
                  : "",
              filterText,
            ) || utils.containsText(t.tokenid, filterText),
        )
        .map((token) =>
          token.tokenid === "0x00" ? (
            <li
              onClick={selectToken ? () => selectToken(token) : () => null}
              className={`grid grid-cols-[auto_1fr] border border-neutral-600 hover:border-neutral-500 items-center gap-2 bg-white dark:bg-[#1b1b1b] p-1 mb-2 rounded-lg ${
                selectionMode ? "" : ""
              }`}
              key={token.tokenid}
            >
              <div className="aspect-square w-12 h-12 overflow-hidden">
                <img
                  alt="token-icon"
                  src="./assets/token.svg"
                  className="w-full h-full"
                />
              </div>
              <div className="overflow-hidden border-l border-l-neutral-600 px-2">
                <div className="grid grid-cols-[auto_1fr]">
                  <h6 className="font-bold truncate text-neutral-400">
                    Minima
                  </h6>
                </div>
                {!selectionMode && (
                  <p className="text-sm truncate text-neutral-300">
                    {makeMinimaNumber(token.confirmed, 2000)}
                    {token.unconfirmed != "0"
                      ? "/" + makeMinimaNumber(token.unconfirmed, 2000)
                      : null}
                  </p>
                )}
                {selectionMode && (
                  <p className="font-bold text-sm text-neutral-300">MINIMA</p>
                )}
              </div>
            </li>
          ) : (
            <li
              onClick={selectToken ? () => selectToken(token) : () => null}
              className={`grid grid-cols-[auto_1fr] border border-neutral-600 hover:border-neutral-500 items-center gap-2 bg-white dark:bg-[#1b1b1b] p-1 mb-2 rounded-lg ${
                selectionMode ? "" : ""
              }`}
              key={token.tokenid}
            >
              <div className="aspect-square w-12 h-12 overflow-hidden">
                <img
                  alt="token-icon"
                  src={
                    "url" in token.token && token.token.url.length
                      ? token.token.url
                      : `https://robohash.org/${token.tokenid}`
                  }
                  className="w-full h-full"
                />
              </div>

              <div className="overflow-hidden border-l border-l-neutral-600 px-2">
                <h6 className="font-bold truncate text-neutral-400">
                  {"name" in token.token && typeof token.token.name === "string"
                    ? token.token.name
                    : "N/A"}
                </h6>
                {!selectionMode && (
                  <p className="text-sm truncate text-neutral-300">
                    {makeMinimaNumber(token.confirmed, 2000)}
                    {token.unconfirmed != "0"
                      ? "/" + makeMinimaNumber(token.unconfirmed, 2000)
                      : null}
                  </p>
                )}
                {selectionMode && (
                  <p className="text-sm truncate text-neutral-300">
                    {token.token && "ticker" in token.token
                      ? token.token.ticker
                      : ""}
                  </p>
                )}
              </div>
            </li>
          ),
        )}
    </ul>
  );
};

export default Tokens;
