import { useContext } from "react";
import { appContext } from "../../AppContext";

const FetchBalanceButton = () => {
  const { _promptingFetchingBalance, getBalance } = useContext(appContext);

  const handleFetchBalance = () => {
    getBalance();
  };

  return (
    <button
      type="button"
      className={`h-[44px] w-[44px] p-0 border border-mediumDarkContrast rounded-full flex justify-center items-center bg-darkContrast active:scale-90 transition-all `}
      onClick={!_promptingFetchingBalance ? handleFetchBalance : () => null}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`hidden transition-all ${_promptingFetchingBalance ? "animate-spin" : ""}`}
      >
        <path
          d="M6.03206 11.5837C4.48165 11.5837 3.16352 11.0408 2.07769 9.95512C0.991717 8.86942 0.44873 7.55158 0.44873 6.00158C0.44873 4.45158 0.991717 3.13331 2.07769 2.04678C3.16352 0.960256 4.48165 0.416992 6.03206 0.416992C6.95081 0.416992 7.79297 0.623173 8.55852 1.03553C9.32394 1.44803 9.9604 1.99345 10.4679 2.67178V0.416992H11.5512V4.6797H7.28852V3.59658H9.80936C9.41186 2.95866 8.88269 2.44984 8.22186 2.07012C7.56116 1.69026 6.83123 1.50033 6.03206 1.50033C4.78206 1.50033 3.71956 1.93783 2.84456 2.81283C1.96956 3.68783 1.53206 4.75033 1.53206 6.00033C1.53206 7.25033 1.96956 8.31283 2.84456 9.18783C3.71956 10.0628 4.78206 10.5003 6.03206 10.5003C7.19873 10.5003 8.19873 10.1149 9.03206 9.34408C9.8654 8.57324 10.3446 7.62533 10.4696 6.50033H11.5785C11.4642 7.94366 10.879 9.15172 9.8229 10.1245C8.76679 11.0973 7.50318 11.5837 6.03206 11.5837Z"
          fill="#E9E9EB"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className={`transition-all w-[16px] h-[16px] ${_promptingFetchingBalance ? "animate-spin" : ""}`}
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
