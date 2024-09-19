import Decimal from "decimal.js";
import NFTDisplay from "../../NFTDisplay";
import AnimatedDialog from "../../UI/AnimatedDialog";
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
        ? token.token.url // Use the token URL if it's available and not empty
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

  return (
    <AnimatedDialog up={30} display={token !== null} dismiss={() => null}>
      <div>
        <div className="flex">
          <div className="flex-grow" />
          <span onClick={dismiss}>
            <CloseIcon fill="currentColor" />
          </span>
        </div>
        <div className="flex flex-col items-center space-y-6 p-4 justify-center">
          <NFTDisplay
            imageUrl={tokenImage}
            name={tokenName}
            description={tokenDescription}
            isTokenValidated={!!validateToken(token)}
          />
          <div className="w-full max-w-md space-y-4">
            <div className="flex gap-1 justify-center items-center">
              <h2 className="text-2xl font-bold text-center">{tokenName}</h2>
              {!!validateToken(token) && (
                <div className="!text-blue-500">
                  <CheckmarkIcon fill="currentColor" size={24} />
                </div>
              )}
            </div>

            <div className="bg-neutral-100 dark:bg-neutral-900 rounded-lg p-4 space-y-2 shadow-inner">
              <p className="text-sm text-neutral-600 dark:text-neutral-500">
                {tokenDescription}
              </p>

              <div className="flex justify-between">
                <span className="font-semibold text-neutral-900 dark:text-neutral-400">
                  Balance
                </span>
                <span className="dark:text-neutral-200">
                  {token &&
                    new Decimal(token.confirmed).gt(0) &&
                    token.confirmed}
                  {token && new Decimal(token.confirmed).isZero() && "0"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold text-neutral-900 dark:text-neutral-400">
                  Total Minted
                </span>
                <span className="dark:text-neutral-200">
                  {token && token.total}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold text-neutral-900 dark:text-neutral-400">
                  Creator
                </span>
                <span className="dark:text-neutral-200">{tokenCreator}</span>
              </div>

              <div className="flex">
                <span className="whitespace-nowrap font-semibold text-neutral-900 dark:text-neutral-400 max-w-max">
                  Token ID
                </span>

                <input
                  readOnly
                  className={`${wrappedInputStyle} dark:!text-neutral-200 truncate pl-4 text-right`}
                  value={token && token.tokenid}
                />
              </div>

              {!!tokenLink.length && (
                <div className="flex justify-between">
                  <span className="font-semibold text-neutral-900 dark:text-neutral-400">
                    Website
                  </span>
                  <a
                    href={tokenLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View
                  </a>
                </div>
              )}
            </div>

            {Object.keys(oToken.extraMetadata).length > 0 && (
              <div className="bg-neutral-100 dark:bg-neutral-900 rounded-lg p-4 space-y-2 shadow-inner">
                <h3 className="text-lg font-semibold mb-2 text-neutral-900 dark:text-neutral-400">
                  Extra Metadata
                </h3>
                <dl className="space-y-1">
                  {Object.entries(oToken.extraMetadata).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="font-semibold text-neutral-900 dark:text-neutral-400">
                        {key.substring(0, 1).toUpperCase() +
                          key.substring(1, key.length)}
                      </span>
                      <span className="dark:text-neutral-200 text-right">
                        {value.substring(0, 1).toUpperCase() +
                          value.substring(1, value.length)}
                      </span>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>
      </div>
    </AnimatedDialog>
  );
};

export default Details;
