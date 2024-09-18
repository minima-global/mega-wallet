import { useContext, useEffect, useState } from "react";
import { appContext } from "../../AppContext";

import * as utils from "../../utils";
import useFormatMinimaNumber from "../../utils/useMakeNumber";
import { tokenAmountStyle, tokenNameStyle, tokenStyle } from "../../styles";
import Details from "./Details";
import CheckmarkIcon from "../UI/Icons/CheckmarkIcon";

interface IProps {
  selectionMode: boolean;
  selectToken?: any;
  filterText: string;
}
const Tokens = ({ selectToken, selectionMode = false, filterText }: IProps) => {
  const { _balance, getBalance } = useContext(appContext);
  const [viewToken, setViewToken] = useState<null | any>(null);
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

  const validateToken = (token: any): boolean => {
    (window as any).MDS.cmd(
      "tokenvalidate tokenid:" + token.tokenid,
      (resp) => {
        if (!resp.status) {
          return true;
        }

        if (resp.response.valid) {
          return true;
        } else {
          return false;
        }
      },
    );

    return false;
  };

  return (
    <>
      <Details token={viewToken} dismiss={() => setViewToken(null)} />
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
                onClick={
                  selectionMode
                    ? () => selectToken(token)
                    : () => setViewToken(token)
                }
                className={`${tokenStyle} ${selectionMode ? "" : ""}`}
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
                  <div className="flex">
                    <h6 className={tokenNameStyle}>Minima</h6>
                    <div className="!text-blue-500 my-auto ml-1">
                      <CheckmarkIcon fill="currentColor" size={16} />
                    </div>
                  </div>
                  {!selectionMode && (
                    <p className={tokenAmountStyle}>
                      {makeMinimaNumber(token.confirmed, 2000)}
                      {token.unconfirmed != "0"
                        ? "/" + makeMinimaNumber(token.unconfirmed, 2000)
                        : null}
                    </p>
                  )}
                  {selectionMode && <p className={tokenAmountStyle}>MINIMA</p>}
                </div>
              </li>
            ) : (
              <li
                onClick={
                  selectionMode
                    ? () => selectToken(token)
                    : () => setViewToken(token)
                }
                className={`${tokenStyle} ${selectionMode ? "" : ""}`}
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
                  <div className="flex">
                    <h6 className={tokenNameStyle}>
                      {"name" in token.token &&
                      typeof token.token.name === "string"
                        ? token.token.name
                        : "N/A"}
                    </h6>
                    {validateToken(token) && (
                      <div className="!text-blue-500 my-auto ml-1">
                        <CheckmarkIcon fill="currentColor" size={16} />
                      </div>
                    )}
                  </div>

                  {!selectionMode && (
                    <p className={tokenAmountStyle}>
                      {makeMinimaNumber(token.confirmed, 2000)}
                      {token.unconfirmed != "0"
                        ? "/" + makeMinimaNumber(token.unconfirmed, 2000)
                        : null}
                    </p>
                  )}
                  {selectionMode && (
                    <p className={tokenAmountStyle}>
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
    </>
  );
};

export default Tokens;
