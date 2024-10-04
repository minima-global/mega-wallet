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
      <div className="bg-darkContrast py-3 rounded-lg text-center">
        <p className="text-sm text-neutral-400">No results found</p>
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
      <ul className="flex flex-col gap-3">
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
                className="bg-darkContrast relative w-full flex items-center p-3 border border-lightDarkContrast rounded"
                key={token.tokenid}
              >
                <div className="w-[44px] h-[42px] overflow-hidden">
                  <svg
                    width="42"
                    height="42"
                    viewBox="0 0 42 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="42" height="42" rx="2" fill="white" />
                    <path
                      d="M29.4428 14.759L28.2053 20.2329L26.6226 13.6286L21.0773 11.3795L19.578 17.9957L18.2571 10.2371L12.7119 8L7 33.2512H13.0569L14.8062 25.4926L16.1271 33.2512H22.1959L23.6834 26.6349L25.266 33.2512H31.323L35 16.9962L29.4428 14.759Z"
                      fill="black"
                    />
                  </svg>
                </div>
                <div className="overflow-hidden px-3">
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
                className="bg-darkContrast relative w-full flex p-3 border border-lightDarkContrast rounded"
                key={token.tokenid}
              >
                <div className="aspect-square w-12 h-12 overflow-hidden">
                  <img
                    alt="token-icon"
                    src={
                      "url" in token.token && token.token.url.length
                        ? decodeURIComponent(token.token.url)
                        : `https://robohash.org/${token.tokenid}`
                    }
                    className="w-full h-full"
                  />
                </div>

                <div className="overflow-hidden flex flex-col items-start justify-center px-3">
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
                    <>
                      {token.token && token.token.ticker ? (
                        <p className={tokenAmountStyle}>
                          {token.token && "ticker" in token.token
                            ? token.token.ticker
                            : ""}
                        </p>
                      ) : (
                        <p className="text-grey80">-</p>
                      )}
                    </>
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
