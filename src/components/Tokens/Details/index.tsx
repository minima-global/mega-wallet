import Decimal from "decimal.js";
import NFTDisplay from "../../NFTDisplay";
import CloseIcon from "../../UI/Icons/CloseIcon";
import { wrappedInputStyle } from "../../../styles";
import CheckmarkIcon from "../../UI/Icons/CheckmarkIcon";

const Details = ({ token, dismiss }) => {
  const filterExtraMetadata = (token) => {
    if (token && token.tokenid === "0x00") return false;
    const defaultProperties = [
      "name",
      "url",
      "description",
      "owner",
      "external_url",
      "webvalidate",
    ];

    // Check if token.token exists and is not null
    if (token && token.token) {
      // Filter out the default properties
      const extraMetadata = Object.fromEntries(
        Object.entries(token.token).filter(
          ([key]) => !defaultProperties.includes(key),
        ),
      );

      return extraMetadata;
    }
    return {}; // Return an empty object if token.token is null
  };

  const validateToken = (token: any): boolean => {
    if (!token) return false;

    if (token.tokenid === "0x00") return true;

    (window as any).MDS.cmd(
      "tokenvalidate tokenid:" + token.tokenid,
      (resp) => {
        if (!resp.status) {
          return true;
        }

        if (resp.response.valid) {
          return true;
        } else {
          return false;
        }
      },
    );

    return false;
  };

  // Filtered extra metadata
  const oToken = {
    extraMetadata: filterExtraMetadata(token),
  };

  const tokenImage =
    token && token.tokenid === "0x00"
      ? "./assets/token.svg" // Use default image for token id "0x00"
      : token?.token?.url && token.token.url.length > 0
        ? decodeURIComponent(token.token.url) // Use the token URL if it's available and not empty
        : "./assets/default-token.svg"; // Fallback to a default image
  const tokenName =
    token && token.tokenid === "0x00"
      ? "Minima"
      : token?.token?.name && token?.token?.name.length > 0
        ? token.token.name
        : "No Name";
  const tokenDescription =
    token && token.tokenid === "0x00"
      ? "Minima's Official Token"
      : token?.token?.description && token?.token?.description.length > 0
        ? token.token.description
        : "";

  const tokenCreator =
    token && token === "0x00"
      ? "-"
      : token?.token?.owner && token?.token?.owner.length > 0
        ? token.token.owner
        : "Anonymous";

  const tokenLink =
    token && token === "0x00"
      ? "SpartacusRex"
      : token?.token?.external_url && token?.token?.external_url.length > 0
        ? token.token.external_url
        : "";

  const display = token;

  return (
    <div
      className={`absolute top-0 left-0 z-50 w-full overflow-x-hidden transition-all duration-0 ${display ? "visible scale-100 opacity-100" : "invisible select-none scale-90"}`}
    >
      <div className="left-0 top-0 min-h-screen w-full flex items-center">
        <div
          onClick={dismiss}
          className="fixed z-30 top-0 left-0 bg-black opacity-70 w-screen h-screen"
        />
        <div className="relative lg:mt-10 bg-black rounded border border-darkContrast w-full max-w-[500px] mx-5 lg:mx-auto z-40 mb-10 p-6">
          <div
            onClick={dismiss}
            className="absolute top-5 right-5 dark:text-neutral-500 hover:text-white cursor-pointer"
          >
            <CloseIcon fill="currentColor" />
          </div>
          <div className="flex flex-col items-center space-y-6 justify-center">
            <NFTDisplay
              imageUrl={tokenImage}
              name={tokenName}
              description={tokenDescription}
              isTokenValidated={!!validateToken(token)}
            />

            <div className="w-full max-w-md space-y-4">
              <div className="text-center">
                <div className="flex gap-1 justify-center items-center mb-2">
                  <h2 className="text-2xl font-bold text-center dark:text-white">
                    {tokenName}
                  </h2>
                  {!!validateToken(token) && (
                    <div className="!text-blue-500">
                      <CheckmarkIcon fill="currentColor" size={24} />
                    </div>
                  )}
                </div>
                <h5>{tokenDescription}</h5>
              </div>
              <div className="font-bold">Details</div>
              <div className="bg-darkContrast p-4 rounded text-white text-sm flex flex-col gap-4">
                <div>
                  <p className="text-grey80 mb-1.5">Balance</p>
                  <p>
                    {token &&
                      new Decimal(token.confirmed).gt(0) &&
                      token.confirmed}
                    {token && new Decimal(token.confirmed).isZero() && "0"}
                  </p>
                </div>
                <div>
                  <p className="text-grey80 mb-1.5">Total Minted</p>
                  <p>{token && token.total}</p>
                </div>
                <div>
                  <p className="text-grey80 mb-1.5">Creator</p>
                  <p>{tokenCreator}</p>
                </div>
                <div>
                  <p className="text-grey80 mb-1.5">Token ID</p>
                  <p className="break-all">{token && token.tokenid}</p>
                </div>
                {tokenLink.length > 0 && (
                  <div>
                    <p className="text-grey80 mb-1.5">Website</p>
                    <p className="break-all">
                      <a
                        href={tokenLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {tokenLink || "N/A"}
                      </a>
                    </p>
                  </div>
                )}
              </div>

              {Object.keys(oToken.extraMetadata).length > 0 && (
                <div>
                  <div className="font-bold mt-2 mb-4">Other</div>
                  <div className="bg-darkContrast p-4 rounded text-white text-sm flex flex-col gap-4">
                    {Object.entries(oToken.extraMetadata).map(
                      ([key, value]) => (
                        <div key={key}>
                          <p className="text-grey80 mb-1.5">
                            {key.substring(0, 1).toUpperCase() +
                              key.substring(1, key.length)}
                          </p>
                          <p className="break-all">
                            {value.substring(0, 1).toUpperCase() +
                              value.substring(1, value.length)}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                  <dl className="space-y-1"></dl>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
