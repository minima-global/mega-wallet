import { useContext } from "react";
import { appContext } from "../../AppContext";
import RefreshIcon from "../UI/Icons/RefreshIcon";

const FetchBalanceButton = () => {
  const { _promptingFetchingBalance, getBalance } = useContext(appContext);

  const handleFetchBalance = () => {
    getBalance();
  };

  return (
    <div
      className="h-[44px] w-[44px] rounded-full flex items-center justify-center bg-darkContrast active:scale-90 transition-all"
      onClick={!_promptingFetchingBalance ? handleFetchBalance : () => null}
    >
      <RefreshIcon
        fill="currentColor"
        extraClass={`${_promptingFetchingBalance && "animate-spin"}`}
      />
    </div>
  );
};

export default FetchBalanceButton;
