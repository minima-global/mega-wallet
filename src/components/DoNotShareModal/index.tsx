import CloseIcon from "../UI/Icons/CloseIcon";

const DoNotShareModal = ({ display, dismiss }) => {
  return (
    <div
      className={`absolute top-0 left-0 z-50 w-full overflow-x-hidden transition-all duration-0 ${display ? "visible scale-100 opacity-100" : "invisible select-none scale-90"}`}
    >
      <div className="left-0 top-0 min-h-screen w-full flex items-center px-4 lg:px-0">
        <div
          onClick={dismiss}
          className="fixed z-30 top-0 left-0 bg-black backdrop-blur-lg opacity-80 w-screen h-screen"
        />
        <div className="relative mx-auto lg:mt-10 bg-white dark:bg-black rounded border border-darkContrast w-full max-w-[500px] mx-5 md:mx-auto z-40 mb-10 p-6">
          <div
            onClick={dismiss}
            className="absolute top-5 right-5 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-white cursor-pointer"
          >
            <CloseIcon fill="currentColor" />
          </div>
          <h3 className="font-bold text-lg mb-3">Using a shared or public device</h3>
          <div className="flex flex-col flex-grow overflow-auto">
            <p className="mt-3 text-neutral-700 dark:text-neutral-300 mb-8">
              When accessing this application/website on a shared or public device, do not select the "Remember me" option to protect your funds. Always log out after use.
            </p>
            <div className="flex-grow" />
            <button
              onClick={dismiss}
              className="bg-lightOrange px-3 py-3 rounded text-black hover:bg-lighterOrange"
            >
              I understand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoNotShareModal;
