import { useContext } from "react";
import { useSpring, animated, config } from "react-spring";
import { appContext } from "../../AppContext";
import { createPortal } from "react-dom";
import Dialog from "../UI/Dialog";

const DialogWithError = () => {
  const { _promptDialogWithError, promptDialogWithError } =
    useContext(appContext);

  const springProps = useSpring({
    opacity: _promptDialogWithError ? 1 : 0,
    transform: _promptDialogWithError
      ? "translateY(0%) scale(1)"
      : "translateY(-50%) scale(0.8)",
    config: config.wobbly,
  });

  if (!_promptDialogWithError) {
    return null;
  }

  return (
    <>
      {_promptDialogWithError &&
        createPortal(
          <Dialog dismiss={() => promptDialogWithError(false)}>
            <div className="h-full grid items-center">
              <animated.div style={springProps}>
                <div className="bg-black w-[calc(100%_-_16px)] md:w-full p-4 rounded mx-auto">
                  <div>
                    <h1 className="text-lg md:text-2xl">Status</h1>

                    <div className="grid grid-cols-1 grid-rows-[1fr_6fr]">
                      <p className="break-all">{_promptDialogWithError}</p>

                      <div className="flex justify-end items-end">
                        <button
                          onClick={() => promptDialogWithError(false)}
                          className="bg-white text-black font-bold h-max"
                        >
                          Back
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </animated.div>
            </div>
          </Dialog>,
          document.body
        )}
    </>
  );
};

export default DialogWithError;
