import { useContext, useEffect, useState } from "react";
import { appContext } from "../../AppContext";

import Tokens from "../Tokens";
import { useFormikContext } from "formik";
import useFormatMinimaNumber from "../../utils/useMakeNumber";
import Backdrop from "../Backdrop";

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
  }, [_balance, formik]);

  // do not let body scroll if modal is open
  useEffect(() => {
    if (_promptTokenSelectionDialog) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [_promptTokenSelectionDialog]);

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
        className={`fixed top-0 left-0 z-50 transition-all duration-75 ${_promptTokenSelectionDialog ? "visible opacity-100" : "invisible select-none"}`}
      >
        <div className="h-screen w-screen flex p-3 lg:p-0 lg:items-center">
          <Backdrop onClick={promptTokenSelectionDialog} />
          <div className="relative bg-white dark:bg-black rounded border dark:border-darkContrast w-full max-w-[648px] min-h-[500px] mx-auto z-40 mb-10 p-6">
            <section>
              <div className="absolute top-5 right-5">
                <svg
                  className="stroke-black dark:stroke-white text-gray-500 hover:scale-105 hover:text-gray-600 hover:cursor-pointer hover:outline-offset-2"
                  onClick={promptTokenSelectionDialog}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
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
              <h3 className="mb-1 text-xl">Select a token</h3>
              <div className="grid grid-cols-[1fr_auto] items-center"></div>

              <div className="h-[46px] flex border border-grey40 dark:border-mediumDarkContrast bg-grey10 dark:bg-darkContrast rounded-full flex-1 mt-5 mb-7">
                <label className="flex items-center justify-center pl-4">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.3913 10.6957C18.3913 14.9458 14.9459 18.3913 10.6957 18.3913C6.44546 18.3913 3 14.9458 3 10.6957C3 6.44546 6.44546 3 10.6957 3C14.9459 3 18.3913 6.44546 18.3913 10.6957Z"
                      stroke="#464C4F"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.2929 16.2929C16.6834 15.9024 17.3166 15.9024 17.7071 16.2929L21.7071 20.2929C22.0976 20.6834 22.0976 21.3166 21.7071 21.7071C21.3166 22.0976 20.6834 22.0976 20.2929 21.7071L16.2929 17.7071C15.9024 17.3166 15.9024 16.6834 16.2929 16.2929Z"
                      fill="#464C4F"
                    ></path>
                  </svg>
                </label>
                <input
                  id="search"
                  value={filter}
                  onChange={handleFilterTextChange}
                  placeholder="Search tokens"
                  type="search"
                  className="w-full h-full appearance-none bg-transparent placeholder:text-sm pl-3 pr-5"
                />
              </div>

              <div className="relative mb-1">
                <Tokens
                  filterText={filter}
                  selectionMode
                  selectToken={handleTokenSelection}
                />
              </div>
            </section>
          </div>
        </div>
      </div>

      <div
        className={`${
          formik.isSubmitting ? "opacity-40 cursor-not-allowed" : ""
        }`}
      >
        {active && active.tokenid === "0x00" && (
          <div
            className="bg-grey10 dark:bg-darkContrast relative w-full flex p-3 border border-grey40 dark:border-lightDarkContrast rounded"
            onClick={() => {
              promptTokenSelectionDialog();
            }}
          >
            <div className="w-[48px] h-[48px] border border-grey80 rounded overflow-hidden">
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
            <div className="my-auto px-4">
              <p className="font-bold dark:text-neutral-100 -mt-0.5">Minima</p>
              <p className="text-sm truncate dark:text-neutral-200">
                {makeMinimaNumber(active.confirmed, 2000)}
                {active.unconfirmed != "0"
                  ? "/" + makeMinimaNumber(active.unconfirmed, 2000)
                  : null}
              </p>
            </div>
            <span className="absolute top-0 right-6 h-full flex items-center">
              <svg
                width="8"
                height="4"
                viewBox="0 0 8 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.00001 3.71113L0.496887 0.208008H7.50314L4.00001 3.71113Z"
                  fill="#E9E9EB"
                />
              </svg>
            </span>
          </div>
        )}

        {active && active.tokenid !== "0x00" && (
          <div
            className="bg-darkContrast relative w-full flex p-3 border border-lightDarkContrast rounded"
            onClick={() => {
              promptTokenSelectionDialog();
            }}
          >
            <div className="w-[48px] h-[48px] border border-grey80 rounded overflow-hidden">
              <img
                alt="minima-token"
                src={
                  "url" in active.token && active.token.url.length
                    ? decodeURIComponent(active.token.url)
                    : `https://robohash.org/${active.tokenid}`
                }
                className="w-full h-full object-cover"
              />
            </div>
            <div className="my-auto px-4">
              <p className="font-bold truncate max-w-[15ch] dark:text-neutral-100">
                {"name" in active.token && typeof active.token.name === "string"
                  ? active.token.name
                  : "N/A"}
              </p>

              <p className="font-mono truncate text-xs dark:text-neutral-200">
                {makeMinimaNumber(active.confirmed, 2000)}
                {active.unconfirmed != "0"
                  ? "/" + makeMinimaNumber(active.unconfirmed, 2000)
                  : null}
              </p>
            </div>
            <span className="absolute top-0 right-6 h-full flex items-center">
              <svg
                width="8"
                height="4"
                viewBox="0 0 8 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.00001 3.71113L0.496887 0.208008H7.50314L4.00001 3.71113Z"
                  fill="#E9E9EB"
                />
              </svg>
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default TokenSelect;
