import { useContext } from "react";
import { appContext } from "../../AppContext";
import AnimatedDialog from "../UI/AnimatedDialog";
import { dialogTitleStyle, primaryFormButtonStyle } from "../../styles";
import WarningIcon from "../UI/Icons/WarningIcon";

const Welcome = () => {
  const { firstTime, setFirstTime } = useContext(appContext);

  return (
    <AnimatedDialog up={9999} display={firstTime} dismiss={() => null}>
      <div className="min-h-[calc(100vh_-_100px)] flex flex-col md:block pb-8">
        <div className="flex gap-2 justify-start">
          <div className="w-8 h-8 overflow-hidden rounded-lg flex">
            <img
              alt="brand-icon"
              src="./assets/icon-white.svg"
              className="h-full w-full aspect-square block"
            />
          </div>
          <h1 className={dialogTitleStyle}>Public Wallet</h1>
        </div>

        <div className="my-4 space-y-4 text-black dark:text-neutral-300 tracking-wide">
          <p className=" font-bold text-left">Welcome to the Public Wallet!</p>
          <p>
            This wallet enables you to send, receive, and store Minima, custom
            tokens, and NFTs without running a Minima node.
          </p>
          <p>
            On first use, generate a secret key and keep it safe. After logging
            out it won't be shown again and if lost, you will lose access to
            your assets.
          </p>
          <p>
            On subsequent uses, log in with the same secret to access your
            wallet.
          </p>
          <p>
            Anyone can host a public wallet, and you can use any public wallet,
            but you must ensure you trust the node owner before logging in.
          </p>
          <p>
            If in future you decide to start your own Minima node, simply
            transfer your assets to your new node.
          </p>

          <div className="my-4 mx-auto bg-yellow-100 border-l-4 border-yellow-400 p-4 rounded-r-lg shadow-inner dark:bg-neutral-900 dark:border-yellow-600">
            <div className="flex items-center">
              <span className="h-6 w-6 text-yellow-600 dark:text-yellow-500 mr-4">
                <WarningIcon />
              </span>
              <div className="text-sm text-yellow-700 dark:text-yellow-200 space-y-2">
                <p className="font-bold tracking-wide flex flex-wrap items-center gap-1 justify-center text-left">
                  The node owner must run a mega MMR node for accurate balances.
                </p>
                <p className="font-bold tracking-wide flex flex-wrap items-center gap-1 justify-start text-left">
                  Always trust the node owner.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto md:my-8">
          <div className="mt-1">
            <button
              onClick={() => {
                localStorage.setItem("first-time", "false");
                setFirstTime(false);
              }}
              type="button"
              className={primaryFormButtonStyle}
            >
              Begin
            </button>
          </div>
        </div>
      </div>
    </AnimatedDialog>
  );
};

export default Welcome;
