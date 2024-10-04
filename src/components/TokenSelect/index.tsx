import { useContext, useEffect, useState } from "react";
import { appContext } from "../../AppContext";

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
        className={`${
          formik.isSubmitting ? "opacity-40 cursor-not-allowed" : ""
        }`}
      >
        {active && active.tokenid === "0x00" && (
          <div
            className="bg-darkContrast relative w-full flex p-3 border border-lightDarkContrast rounded"
            onClick={() => {
              promptTokenSelectionDialog();
            }}
          >
            <div className="w-[42px] h-[42px] overflow-hidden">
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
            <div className="w-[42px] h-[42px] overflow-hidden">
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

      <div
        className={`fixed top-0 left-0 z-50 transition-all duration-75 ${_promptTokenSelectionDialog ? "visible scale-100 opacity-100" : "invisible select-none scale-90"}`}
      >
        <div className="h-screen w-screen flex p-3 lg:p-0 lg:items-center">
          <div
            onClick={promptTokenSelectionDialog}
            className="fixed z-30 top-0 left-0 bg-black opacity-70 w-screen h-screen"
          />
          <div className="relative bg-black rounded border border-darkContrast w-full max-w-[500px] min-h-[500px] mx-auto z-40 mb-10 p-6">
            <section>
              <div className="absolute top-5 right-5">
                <svg
                  className="stroke-white text-gray-500 hover:scale-105 hover:text-gray-600 hover:cursor-pointer hover:outline-offset-2"
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
              <h3 className="-mt-1 mb-1 text-xl">Select a token</h3>
              <div className="grid grid-cols-[1fr_auto] items-center"></div>

              <div className="h-[46px] flex border border-mediumDarkContrast bg-darkContrast rounded-full flex-1 mt-5 mb-7">
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
                      stroke-width="2"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
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
                  className="w-full h-full appearance-none bg-transparent pl-3 pr-5"
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
    </>
  );
};

export default TokenSelect;
