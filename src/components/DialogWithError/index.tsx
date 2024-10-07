import { useContext } from "react";
import { appContext } from "../../AppContext";
import { dismissableButtonStyle } from "../../styles";
import CloseIcon from "../UI/Icons/CloseIcon";

const DialogWithError = () => {
  const { _promptDialogWithError, promptDialogWithError } =
    useContext(appContext);

  const display = _promptDialogWithError;
  const dismiss = () => promptDialogWithError(null);

  return (
    <div
      className={`absolute top-0 left-0 z-50 w-full overflow-x-hidden transition-all duration-0 ${display ? "visible scale-100 opacity-100" : "invisible select-none scale-90"}`}
    >
      <div className="left-0 top-0 min-h-screen w-full flex items-center">
        <div
          onClick={dismiss}
          className="fixed z-30 top-0 left-0 bg-black backdrop-blur-lg opacity-80 w-screen h-screen"
        />
        <div className="relative lg:mt-10 bg-black rounded border border-darkContrast w-full max-w-[500px] mx-5 lg:mx-auto z-40 mb-10 p-6">
          <div
            onClick={dismiss}
            className="absolute top-5 right-5 dark:text-neutral-500 hover:text-white cursor-pointer"
          >
            <CloseIcon fill="currentColor" />
          </div>
          <h3 className="font-bold text-lg mb-3">Error</h3>
          <div className="flex flex-col flex-grow overflow-auto">
            <p className="break-all text-neutral-700 dark:text-neutral-300 mb-8">
              {_promptDialogWithError}
            </p>
            <div className="flex-grow" />
            <button
              onClick={dismiss}
              className="bg-lightOrange px-3 py-3 rounded text-black hover:bg-lighterOrange"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogWithError;
