import { useContext } from "react";
import { appContext } from "../../../AppContext.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import useAndroidTitleBar from "./useAndroidShowTitleBar.tsx";
import BookmarkThisSite from "../../BookmarkThisSite/index.tsx";

const Header = () => {
  const navigate = useNavigate();

  const openTitleBar = useAndroidTitleBar();
  const { topBlock, setPromptLogoutDialog } = useContext(appContext);
  const location = useLocation();
  const { _isPublic } = useContext(appContext);

  const handleLogout = (evt) => {
    evt.stopPropagation();
    window.scrollTo(0, 0);
    setPromptLogoutDialog(true);
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
                    className={`gap-2 lg:gap-4 flex items-center text-sm transition-all`}
                  >
                    {_isPublic && (
                      <a target="_blank" href="https://docs.minima.global/docs/runanode/get_started/">
                        <button className="p-0 text-xs lg:text-sm font-bold text-black dark:text-white transition-colors hover:text-grey40">
                          Run a node
                        </button>
                      </a>
                    )}
                    {(location.pathname === "/dashboard" || location.pathname === "/settings") && (
                      <>
                        <li>
                          <button
                            onClick={() => navigate("/settings")}
                            className={`relative p-2 flex h-[32px] w-[32px] lg:h-[44px] lg:w-[44px] scale-100 items-center justify-center rounded-full border border-grey80 bg-white from-[#17191C] to-[#37393F] transition-all duration-75 hover:bg-grey10 active:scale-[95%] dark:border-mediumDarkContrast dark:bg-darkContrast dark:hover:bg-transparent dark:hover:bg-gradient-to-t`}
                          >
                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                          </button>
                        </li>
                        <BookmarkThisSite />
                        <li className="hidden iphone:block" onClick={handleLogout}>
                          <div
                            className={`relative flex h-[32px] w-[32px] lg:h-[44px] lg:w-[44px] scale-100 items-center justify-center rounded-full border border-grey80 bg-white from-[#17191C] to-[#37393F] transition-all duration-75 hover:bg-grey10 active:scale-75 dark:border-mediumDarkContrast dark:bg-darkContrast dark:hover:bg-transparent dark:hover:bg-gradient-to-t`}
                          >
                            <svg className="ml-1 lg:ml-1 w-[16px] lg:w-[18px]" width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M17.3713 9.75H5.577V8.25H17.3713L15.552 6.43075L16.6057 5.34625L20.2595 9L16.6057 12.6538L15.552 11.5693L17.3713 9.75ZM12.202 5.86525V2.30775C12.202 2.21792 12.1732 2.14417 12.1155 2.0865C12.0577 2.02883 11.9839 2 11.8943 2H2.30775C2.21792 2 2.14417 2.02883 2.0865 2.0865C2.02883 2.14417 2 2.21792 2 2.30775V15.6923C2 15.7821 2.02883 15.8558 2.0865 15.9135C2.14417 15.9712 2.21792 16 2.30775 16H11.8943C11.9839 16 12.0577 15.9712 12.1155 15.9135C12.1732 15.8558 12.202 15.7821 12.202 15.6923V12.1348H13.702V15.6923C13.702 16.1909 13.5253 16.6169 13.172 16.9703C12.8188 17.3234 12.3929 17.5 11.8943 17.5H2.30775C1.80908 17.5 1.38308 17.3234 1.02975 16.9703C0.676583 16.6169 0.5 16.1909 0.5 15.6923V2.30775C0.5 1.80908 0.676583 1.38308 1.02975 1.02975C1.38308 0.676583 1.80908 0.5 2.30775 0.5H11.8943C12.3929 0.5 12.8188 0.676583 13.172 1.02975C13.5253 1.38308 13.702 1.80908 13.702 2.30775V5.86525H12.202Z" fill="currentColor" />
                            </svg>
                          </div>
                        </li>
                      </>
                    )}
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
