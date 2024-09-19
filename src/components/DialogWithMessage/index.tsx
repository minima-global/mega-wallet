import { useContext } from "react";
import { appContext } from "../../AppContext";
import { dismissableButtonStyle } from "../../styles";
import AnimatedDialog from "../UI/AnimatedDialog";

const DialogWithMessage = () => {
  const { _promptDialogWithMessage, promptDialogWithMessage } =
    useContext(appContext);

  return (
    <>
      <AnimatedDialog display={_promptDialogWithMessage} dismiss={() => null}>
        <div className="flex flex-col h-[80vh] sm:h-[50vh]">
          <h3 className="font-bold text-lg mb-4 text-black dark:text-white">
            Status
          </h3>
          <div className="flex flex-col flex-grow overflow-auto">
            <p className="break-all text-neutral-700 dark:text-neutral-300 mb-4">
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
      </AnimatedDialog>
    </>
  );
};

export default DialogWithMessage;
