import { useContext } from "react";
import { appContext } from "../../AppContext";

const FetchBalanceButton = () => {
  const { _promptingFetchingBalance, getBalance } = useContext(appContext);

  const handleFetchBalance = () => {
    getBalance(true);
  };

  return (
    <button
      type="button"
      className={`h-[44px] w-[44px] p-0 border border-grey40 dark:border-mediumDarkContrast rounded-full flex justify-center items-center bg-grey10 dark:bg-darkContrast active:scale-90 transition-all `}
      onClick={!_promptingFetchingBalance ? handleFetchBalance : () => null}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all w-[16px] h-[16px] ${_promptingFetchingBalance ? "animate-spin" : ""}`}
      >
        <polyline points="23 4 23 10 17 10"></polyline>
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`hidden transition-all w-[16px] h-[16px] ${_promptingFetchingBalance ? "animate-spin" : ""}`}
      >
        <line x1="12" y1="2" x2="12" y2="6"></line>
        <line x1="12" y1="18" x2="12" y2="22"></line>
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
        <line x1="2" y1="12" x2="6" y2="12"></line>
        <line x1="18" y1="12" x2="22" y2="12"></line>
        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
      </svg>
    </button>
  );
};

export default FetchBalanceButton;
