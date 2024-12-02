import { outlineFormButtonStyle, primaryFormButtonStyle } from "../../../styles";
import Backdrop from "../../Backdrop";
import HelpContent from "../../HelpContent";

const SettingsHelp: React.FC<{ display: boolean, dismiss: () => void }> = ({ display, dismiss }) => {
  const handleOnClick = () => dismiss();

  return (
    <div
      className={`absolute z-50 top-0 left-0 w-full ${display ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <Backdrop />
      <div className="h-screen w-full flex p-3 lg:p-0 items-center pb-6">
        <div className={`relative z-50 w-full lg:w-[600px] m-4 lg:mx-auto bg-grey10 dark:bg-mediumDarkContrast p-4 lg:p-6 rounded-lg text-black dark:text-white transition-all delay-100 ${display ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[5px]"}`}>
          <div className="flex flex-col">
            <HelpContent />
            <div className="mt-auto">
              <div className="mt-1 flex flex-col gap-4">
                <button
                  type="button"
                  onClick={handleOnClick}
                  className={primaryFormButtonStyle}
                >
                  Continue
                </button>
                <a
                  href="https://docs.minima.global/docs/user-guides/public-wallet"
                  target="_blank"
                  rel="noreferrer"
                >
                  <button type="button" className={outlineFormButtonStyle}>
                    Learn more
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default SettingsHelp;
