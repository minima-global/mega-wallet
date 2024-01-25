import { useContext, useEffect, useRef, useState } from "react";
import styles from "./Balance.module.css";
import { appContext } from "../../AppContext";
import TokenSelect from "../TokenSelect";
import * as utils from "../../utils";

const Send = () => {
  const {
    _currentNavigation,
    loginForm,
    _balance,
    _address,
    promptDialogWithMessage,
    promptDialogWithError,
  } = useContext(appContext);
  const [visibility, toggleVisiblity] = useState(false);

  const myForm = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const [sendForm, setSendForm] = useState<{
    token: null;
    amount: number;
    address: string;
    code: string;
  }>({ token: null, amount: 0, address: "", code: loginForm._seedPhrase });

  useEffect(() => {
    if (sendForm.token === null && _balance !== null) {
      setSendForm((prevData) => ({
        ...prevData,
        ["token"]: _balance[0],
        ["code"]: loginForm._seedPhrase,
      }));
    }
  }, [_balance]);

  if (_currentNavigation !== "send") {
    return null;
  }

  const handleToggleVisibility = () => {
    toggleVisiblity((prevState) => !prevState);
  };

  // Handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the corresponding property in the state object
    setSendForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    setLoading(true);
    const { token, address, amount, code } = sendForm;

    (window as any).MDS.cmd(
      `keys action:genkey phrase:"${code}"`,
      function (resp) {
        (window as any).MDS.log(JSON.stringify(resp));
        const { script, privatekey } = resp.response;
        const keyuses = utils.randomInteger(0, 200000);

        const rawTransaction = `swerendfrom fromaddress:${_address} address:${address} amount:${amount} tokenid:${token.tokenid} script:"${script}" privatekey:${privatekey} keyuses:${keyuses}`;

        (window as any).MDS.cmd(rawTransaction, function (respo) {
          console.log(respo);
          if (!respo.status) {
            setLoading(false);

            promptDialogWithError(respo.error as string);
            return;
          }

          if (respo.status) {
            setLoading(false);

            if (myForm.current) {
              myForm.current.reset();
            }

            promptDialogWithMessage(
              "Your transaction has been successfully sent!"
            );
          }
        });
      }
    );
  };

  return (
    <>
      <section className={styles["tokens"]}>
        <h6>Transfer tokens</h6>
        <form ref={myForm} onSubmit={handleSubmit} className="grid">
          <TokenSelect _balance={_balance} />
          <input
            onChange={handleInputChange}
            value={sendForm.amount}
            type="number"
            name="amount"
            placeholder="Your amount"
            className="mb-2"
          />
          <input
            autoComplete="off"
            onChange={handleInputChange}
            value={sendForm.address}
            type="text"
            name="address"
            placeholder="Recipient address"
            className="mb-2"
          />
          <label className="grid gap-1 relative">
            <span className="mx-4 text-sm text-teal-500">Secret code</span>
            <input
              readOnly
              autoComplete="off"
              onChange={handleInputChange}
              value={sendForm.code}
              name="code"
              type={`${visibility ? "text" : "password"}`}
              placeholder="Secret code"
              className="mb-4"
            />
            <button
              className="absolute text-green-500 right-0 top-8 active:outline-none !border-none focus:border-none hover:border-none focus:outline-none"
              onClick={handleToggleVisibility}
            >
              {!visibility && (
                <svg
                  className=""
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                  <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                </svg>
              )}

              {!!visibility && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                  <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                  <path d="M3 3l18 18" />
                </svg>
              )}
            </button>
          </label>
          <button
            disabled={loading}
            type="submit"
            className="p-4 bg-teal-500 text-lg font-bold mt-4 disabled:cursor-not-allowed"
          >
            {loading && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="animate-spin text-yellow-800 mx-auto"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 20.777a8.942 8.942 0 0 1 -2.48 -.969" />
                <path d="M14 3.223a9.003 9.003 0 0 1 0 17.554" />
                <path d="M4.579 17.093a8.961 8.961 0 0 1 -1.227 -2.592" />
                <path d="M3.124 10.5c.16 -.95 .468 -1.85 .9 -2.675l.169 -.305" />
                <path d="M6.907 4.579a8.954 8.954 0 0 1 3.093 -1.356" />
                <path d="M12 9l-2 3h4l-2 3" />
              </svg>
            )}

            {!loading && "Send"}
          </button>
        </form>
      </section>
    </>
  );
};

export default Send;
