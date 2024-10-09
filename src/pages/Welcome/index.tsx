import { primaryFormButtonStyle } from "../../styles";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    localStorage.setItem("first-time", "false");
    navigate("/login");
  };

  return (
      <div className="h-fit lg:h-full m-0 flex md:items-center justify-center">
        <div
            className="lg:mb-[80px] w-full lg:w-[600px] m-3 lg:mx-auto bg-grey10 dark:bg-mediumDarkContrast p-4 lg:p-6 rounded-lg text-black dark:text-white">
          <div className="flex flex-col">
            <h1 className="pt-0.5 text-2xl lg:text-3xl">Minima Public Wallet</h1>
            <div className="w-full h-[2px] bg-grey40 dark:bg-grey my-5 lg:my-5"/>
            <div className="flex flex-col gap-4 text-xs lg:text-sm tracking-[0.2px] dark:text-grey40 mb-4">
              <p className="text-lg lg:text-xl lg:mb-1.5">
                This wallet allows you to send, receive, and store Minima, custom
                tokens, and NFTs without needing to run a Minima node.
              </p>
              <p>
                On your first use, you will generate a secret key. Keep this key
                secure, as it will not be shown again after logging out. Losing
                this key means losing access to your assets.
              </p>
              <p>For future access, log in using this same secret key.</p>
              <p>
                If you decide to run your own Minima node, simply transfer your
                assets to your new node.
              </p>
              <p>
                Please note: Public wallet providers do not store or record any
                private data, however, websites can be compromised or manipulated
                so please only use wallet providers you trust.
              </p>
            </div>

            <div className="mt-auto md:mt-4">
              <div className="mt-1">
                <button
                    type="button"
                    onClick={handleOnClick}
                    className={primaryFormButtonStyle}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Welcome;
