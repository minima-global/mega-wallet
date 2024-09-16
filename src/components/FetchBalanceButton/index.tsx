import { useContext } from "react";
import { appContext } from "../../AppContext";
import RefreshIcon from "../UI/Icons/RefreshIcon";

const FetchBalanceButton = () => {
  const { _promptingFetchingBalance, getBalance } = useContext(appContext);

  const handleFetchBalance = () => {
    getBalance();
  };

  return (
    <a
      className={`text-black dark:text-neutral-300 ${
        _promptingFetchingBalance ? "animate-pulse" : ""
      } hover:cursor-pointer flex items-center gap-1 text-sm p-0 !hover:border-none !hover:outline-none hover:text-teal-300`}
      onClick={!_promptingFetchingBalance ? handleFetchBalance : undefined}
    >
      <RefreshIcon
        fill="currentColor"
        extraClass={`${_promptingFetchingBalance && "animate-spin"}`}
      />
      Refresh tokens
    </a>
  );
};

export default FetchBalanceButton;
