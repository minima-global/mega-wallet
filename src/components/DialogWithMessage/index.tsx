import { useContext } from "react";
import { useSpring, animated, config } from "react-spring";
import { appContext } from "../../AppContext";
import { createPortal } from "react-dom";
import Dialog from "../UI/Dialog";

const DialogWithMessage = () => {
  const { _promptDialogWithMessage, promptDialogWithMessage } =
    useContext(appContext);

  const springProps = useSpring({
    opacity: _promptDialogWithMessage ? 1 : 0,
    transform: _promptDialogWithMessage
      ? "translateY(0%) scale(1)"
      : "translateY(-50%) scale(0.8)",
    config: config.wobbly,
  });

  if (!_promptDialogWithMessage) {
    return null;
  }

  return (
    <>
      {_promptDialogWithMessage &&
        createPortal(
          <Dialog dismiss={() => promptDialogWithMessage(false)}>
            <div className="h-full grid items-center">
              <animated.div style={springProps}>
                <div className="bg-white shadow-xl dark:shadow-none dark:bg-black w-[calc(100%_-_16px)] md:w-full p-4 rounded mx-auto">
                  <div>
                    <h1 className="text-lg md:text-2xl">Status</h1>

                    <div className="grid grid-cols-1 grid-rows-[1fr_6fr]">
                      <p className="break-all">{_promptDialogWithMessage}</p>

                      <div className="flex justify-end items-end">
                        <button
                          onClick={() => promptDialogWithMessage(false)}
                          className="bg-black text-white dark:text-black dark:bg-white  font-bold h-max"
                        >
                          Ok
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

export default DialogWithMessage;
