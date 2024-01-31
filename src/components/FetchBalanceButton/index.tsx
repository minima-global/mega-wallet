import { useContext } from "react";
import { appContext } from "../../AppContext";

const FetchBalanceButton = () => {
  const { _promptingFetchingBalance, getBalance } = useContext(appContext);

  const handleFetchBalance = () => {
    getBalance();
  };

  return (
    <a
      className={`text-black dark:text-white ${
        _promptingFetchingBalance ? "animate-pulse" : ""
      } hover:cursor-pointer flex items-center gap-1 text-sm p-0 !hover:border-none !hover:outline-none hover:text-teal-300`}
      onClick={!_promptingFetchingBalance ? handleFetchBalance : undefined}
    >
      <svg
        className={`${_promptingFetchingBalance ? "animate-spin" : ""}`}
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="#FFA010"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
        <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
      </svg>
      Refresh tokens
    </a>
  );
};

export default FetchBalanceButton;
