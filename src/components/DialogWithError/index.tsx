import { useContext } from "react";
import { appContext } from "../../AppContext";
import AnimatedDialog from "../UI/AnimatedDialog";
import { dismissableButtonStyle } from "../../styles";

const DialogWithError = () => {
  const { _promptDialogWithError, promptDialogWithError } =
    useContext(appContext);

  return (
    <>
      <AnimatedDialog display={_promptDialogWithError} dismiss={() => null}>
        <div className="flex flex-col h-[80vh] sm:h-[50vh]">
          <h3 className="font-bold text-lg mb-4 text-black">Status</h3>
          <div className="flex flex-col flex-grow overflow-auto">
            <p className="break-all text-neutral-700 mb-4">
              {_promptDialogWithError}
            </p>
            <div className="flex-grow" />
            <button
              onClick={() => promptDialogWithError(false)}
              className={dismissableButtonStyle}
            >
              Back
            </button>
          </div>
        </div>
      </AnimatedDialog>
    </>
  );
};

export default DialogWithError;
