import { useContext, useEffect, useState } from "react";
import { appContext } from "../../AppContext";
import Tokens from "../Tokens";
import FetchBalanceButton from "../FetchBalanceButton";

const Wallet = () => {
  const { _currentNavigation, _promptLogin } = useContext(appContext);

  const [filter, setFilterText] = useState("");

  useEffect(() => {
    if (_currentNavigation !== "balance") {
      setFilterText("");
    }
  }, [_currentNavigation]);

  const handleFilterTextChange = (evt) => {
    setFilterText(evt.target.value);
  };

  const page = "balance";

  return (
    <div
      className={`transition-opacity duration-200 ${_currentNavigation === page ? "opacity-100 w-full" : "opacity-0 w-full h-0 scale-0 pointer-events-none"}`}
    >
      <h6 className="text-2xl mt-1 lg:mt-3">Tokens</h6>

      <div className="my-6 flex gap-4">
        <div className="h-[44px] flex bg-grey10 dark:bg-darkContrast border border-grey40 dark:border-mediumDarkContrast rounded-full flex-1">
          <label
            className="flex items-center justify-center pl-4"
            htmlFor="search"
          >
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
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.2929 16.2929C16.6834 15.9024 17.3166 15.9024 17.7071 16.2929L21.7071 20.2929C22.0976 20.6834 22.0976 21.3166 21.7071 21.7071C21.3166 22.0976 20.6834 22.0976 20.2929 21.7071L16.2929 17.7071C15.9024 17.3166 15.9024 16.6834 16.2929 16.2929Z"
                fill="#464C4F"
              />
            </svg>
          </label>

          <input
            id="search"
            onChange={handleFilterTextChange}
            placeholder="Search tokens"
            type="search"
            className="w-full h-full appearance-none bg-transparent placeholder:text-sm pl-3 pr-5"
          />
        </div>
        <FetchBalanceButton />
      </div>

      <Tokens filterText={filter} selectionMode={false} />
    </div>
  );
};
export default Wallet;
