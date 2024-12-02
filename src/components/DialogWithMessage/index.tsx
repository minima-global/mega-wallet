import { useContext } from "react";
import { appContext } from "../../AppContext";
import { dismissableButtonStyle } from "../../styles";
import CloseIcon from "../UI/Icons/CloseIcon";

const DialogWithMessage = () => {
  const { _promptDialogWithMessage, promptDialogWithMessage } =
    useContext(appContext);

  const display = _promptDialogWithMessage;
  const dismiss = () => promptDialogWithMessage(null);

  return (
    <div
      className={`absolute top-0 left-0 z-50 w-full overflow-x-hidden transition-all duration-0 ${display ? "visible scale-100 opacity-100" : "invisible select-none scale-90"}`}
    >
      <div className="left-0 top-0 min-h-screen w-full flex items-center">
        <div
          onClick={dismiss}
          className="fixed z-30 top-0 left-0 bg-black opacity-70 w-screen h-screen"
        />
        <div className="relative lg:mt-10 bg-white dark:bg-black rounded border border-darkContrast w-full max-w-[500px] mx-5 md:mx-auto z-40 mb-10 p-6">
          <div
            onClick={dismiss}
            className="absolute top-5 right-5 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-white cursor-pointer"
          >
            <CloseIcon fill="currentColor" />
          </div>
          <h3 className="font-bold text-lg -mt-2 mb-4 text-black dark:text-white">
            Success
          </h3>
          <div className="flex flex-col flex-grow overflow-auto">
            <p className="break-all text-neutral-700 dark:text-neutral-300 mb-6">
              {_promptDialogWithMessage}
            </p>
            <div className="flex-grow" />
            <button
              onClick={() => promptDialogWithMessage(false)}
              className={dismissableButtonStyle}
            >
              Okay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogWithMessage;
