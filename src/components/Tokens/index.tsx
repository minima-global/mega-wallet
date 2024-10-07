import { useContext, useEffect, useState } from "react";
import { appContext } from "../../AppContext";

import * as utils from "../../utils";
import useFormatMinimaNumber from "../../utils/useMakeNumber";
import { tokenAmountStyle, tokenNameStyle } from "../../styles";
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
    return null;
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
      <ul className="flex flex-col gap-1.5">
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
                className="cursor-pointer bg-grey10 dark:bg-darkContrast relative w-full flex items-center p-3 rounded"
                key={token.tokenid}
              >
                <div className="w-[48px] h-[48px] border border-darkConstrast dark:border-grey80 rounded overflow-hidden">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="48" height="48" fill="white" />
                    <path
                      d="M32.4428 16.759L31.2053 22.2329L29.6226 15.6286L24.0773 13.3795L22.578 19.9957L21.2571 12.2371L15.7119 10L10 35.2512H16.0569L17.8062 27.4926L19.1271 35.2512H25.1959L26.6834 28.6349L28.266 35.2512H34.323L38 18.9962L32.4428 16.759Z"
                      fill="black"
                    />
                  </svg>
                </div>
                <div className="overflow-hidden px-4">
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
                className="cursor-pointer bg-grey10 dark:bg-darkContrast relative w-full flex p-3 rounded"
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
                    className="border-grey80 dark:border-mediumDarkContrast border rounded w-full h-full"
                  />
                </div>

                <div className="overflow-hidden flex flex-col items-start justify-center px-4">
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
