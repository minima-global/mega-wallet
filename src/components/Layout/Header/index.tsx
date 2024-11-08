import { useContext } from "react";
import { appContext } from "../../../AppContext.tsx";
import { useLocation } from "react-router-dom";
import useAndroidTitleBar from "./useAndroidShowTitleBar.tsx";

const Header = () => {
  const openTitleBar = useAndroidTitleBar();
  const { topBlock, setIsDarkMode, setPromptLogoutDialog } =
    useContext(appContext);
  const location = useLocation();
  const { _isPublic } = useContext(appContext);

  const toggleDarkMode = () => {
    if (document.body.classList.contains("dark")) {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }

    localStorage.setItem(
      "darkMode",
      (!!document.body.classList.contains("dark")).toString(),
    );
    setIsDarkMode(document.body.classList.contains("dark"));
  };

  const handleLogout = (evt) => {
    evt.stopPropagation();
    window.scrollTo(0, 0);
    setPromptLogoutDialog(true);
  };

  const handleTheme = (evt) => {
    evt.stopPropagation();
    toggleDarkMode();
  };

  return (
    <>
      <header className="h-[64px] lg:h-[84px]">
        <div
          className={`h-full  border-[hsla(0, 0%, 100%, 1)] flex items-center border-b bg-white px-5 transition-all dark:border-lightDarkContrast dark:bg-black`}
        >
          <div
            className="container relative z-50 mx-auto"
            onClick={openTitleBar}
          >
            <div className="grid w-full grid-cols-12">
              <div className="col-span-4 flex items-center">
                <div className="flex items-center gap-5 text-xs">
                  <svg
                    width="42"
                    height="39"
                    viewBox="0 0 42 39"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-[32px] lg:w-[42px] fill-black transition-all dark:fill-white`}
                  >
                    <path
                      d="M13.1247 12.7367L24.6192 17.3141L31.658 14.5108L34.1184 3.78496L24.6192 7.56748L6.56361 0.377441L0 28.9856L10.342 24.8667L13.1247 12.7367Z"
                      fill="#currentColor"
                    />
                    <path
                      d="M31.6582 14.511L28.8755 26.641L17.381 22.0636L10.3422 24.8669L7.88184 35.5927L17.381 31.8102L35.4366 39.0003L42.0002 10.3921L31.6582 14.511Z"
                      fill="#currentColor"
                    />
                  </svg>
                  <div className="mt-1">
                    <span className="flex">
                      <div className="gradient-border flex items-center bg-white -mt-0.5 lg:mt-0 text-[11px] lg:text-xs text-black dark:bg-black dark:text-white">
                        <span className="hidden md:block">Block</span>
                        {!topBlock && (
                          <div className="skele skele--light ml-2 h-[14px] w-[43px]" />
                        )}
                        {topBlock && (
                          <span className="md:ml-1 font-bold text-orange dark:text-lightOrange">
                            {topBlock}
                          </span>
                        )}
                      </div>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-span-8 flex items-center justify-end">
                <nav className="cursor-pointer lg:block">
                  <ul
                    className={`gap-3 lg:gap-4 flex items-center text-sm transition-all`}
                  >
                    {_isPublic && (
                     <a target="_blank" href="https://docs.minima.global/docs/runanode/get_started/">
                        <button className="text-xs lg:text-sm font-bold text-black dark:text-white rounded py-1.5 lg:py-2 px-2 lg:px-3 transition-colors border border-black dark:border-white hover:bg-white hover:text-black">
                          Run a node
                        </button>
                      </a>
                    )}
                    {location.pathname === "/dashboard" && (
                      <li>
                        <button
                          className="text-xs lg:text-sm font-bold text-black dark:text-white rounded py-1.5 lg:py-2 px-2 lg:px-3 transition-colors border border-black dark:border-white hover:bg-white hover:text-black"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    )}
                    <li className="hidden iphone:block" onClick={handleTheme}>
                      <div
                        className={`relative flex h-[32px] w-[32px] lg:h-[44px] lg:w-[44px] scale-100 items-center justify-center rounded-full border border-grey80 bg-white from-[#17191C] to-[#37393F] transition-all duration-75 hover:bg-grey10 active:scale-75 dark:border-mediumDarkContrast dark:bg-darkContrast dark:hover:bg-transparent dark:hover:bg-gradient-to-t`}
                      >
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-[18px] h-[18px] lg:w-[22px] lg:h-[22px] invisible absolute scale-0 transition-all delay-150 duration-150 dark:visible dark:scale-100"
                        >
                          <path
                            d="M11 14C11.8333 14 12.5417 13.7083 13.125 13.125C13.7083 12.5417 14 11.8333 14 11C14 10.1667 13.7083 9.45833 13.125 8.875C12.5417 8.29167 11.8333 8 11 8C10.1667 8 9.45833 8.29167 8.875 8.875C8.29167 9.45833 8 10.1667 8 11C8 11.8333 8.29167 12.5417 8.875 13.125C9.45833 13.7083 10.1667 14 11 14ZM11 15.5C9.75133 15.5 8.68917 15.0622 7.8135 14.1865C6.93783 13.3108 6.5 12.2487 6.5 11C6.5 9.75133 6.93783 8.68917 7.8135 7.8135C8.68917 6.93783 9.75133 6.5 11 6.5C12.2487 6.5 13.3108 6.93783 14.1865 7.8135C15.0622 8.68917 15.5 9.75133 15.5 11C15.5 12.2487 15.0622 13.3108 14.1865 14.1865C13.3108 15.0622 12.2487 15.5 11 15.5ZM4 11.75H0.25V10.25H4V11.75ZM21.75 11.75H18V10.25H21.75V11.75ZM10.25 4V0.25H11.75V4H10.25ZM10.25 21.75V18H11.75V21.75H10.25ZM5.573 6.577L3.23075 4.3155L4.2905 3.20575L6.54625 5.523L5.573 6.577ZM17.7095 18.7943L15.4385 16.4615L16.427 15.423L18.7693 17.6845L17.7095 18.7943ZM15.423 5.573L17.6845 3.23075L18.7943 4.2905L16.477 6.54625L15.423 5.573ZM3.20575 17.7095L5.5385 15.4385L6.55775 16.427L4.30575 18.7788L3.20575 17.7095Z"
                            fill="#E9E9EB"
                          />
                        </svg>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-[18px] h-[18px] lg:w-[22px] lg:h-[22px] visible absolute scale-100 transition-all delay-150 duration-150 dark:invisible dark:scale-0"
                        >
                          <path
                            d="M9.02905 17.5C6.66805 17.5 4.66113 16.6736 3.0083 15.0207C1.35563 13.3681 0.529297 11.3611 0.529297 8.99998C0.529297 6.73714 1.29688 4.79647 2.83205 3.17797C4.36721 1.55931 6.24696 0.68264 8.4713 0.547974C8.61496 0.547974 8.75605 0.55314 8.89455 0.563474C9.03288 0.573807 9.16871 0.589224 9.30205 0.609724C8.79188 1.08656 8.38555 1.66281 8.08305 2.33847C7.78038 3.01414 7.62905 3.73464 7.62905 4.49997C7.62905 6.13881 8.20271 7.53189 9.35005 8.67922C10.4972 9.82639 11.8902 10.4 13.529 10.4C14.3047 10.4 15.0278 10.2487 15.6983 9.94623C16.3688 9.64356 16.9393 9.23714 17.4098 8.72697C17.4303 8.86031 17.4457 8.99623 17.456 9.13473C17.4662 9.27306 17.4713 9.41406 17.4713 9.55772C17.3431 11.7821 16.4698 13.6618 14.8513 15.197C13.2326 16.7323 11.2919 17.5 9.02905 17.5ZM9.02905 16C10.4957 16 11.8124 15.5958 12.979 14.7875C14.1457 13.9791 14.9957 12.925 15.529 11.625C15.1957 11.7083 14.8624 11.775 14.529 11.825C14.1957 11.875 13.8624 11.9 13.529 11.9C11.479 11.9 9.73321 11.1791 8.29155 9.73747C6.84988 8.29581 6.12905 6.54997 6.12905 4.49997C6.12905 4.16664 6.15405 3.83331 6.20405 3.49997C6.25405 3.16664 6.32071 2.83331 6.40405 2.49997C5.10405 3.03331 4.04988 3.88331 3.24155 5.04997C2.43321 6.21664 2.02905 7.53331 2.02905 8.99998C2.02905 10.9333 2.71238 12.5833 4.07905 13.95C5.44571 15.3166 7.09571 16 9.02905 16Z"
                            fill="#08090B"
                          />
                        </svg>
                      </div>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
