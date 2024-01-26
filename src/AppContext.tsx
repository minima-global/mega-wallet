import { createContext, useRef, useEffect, useState } from "react";

import * as utils from "./utils";

export const appContext = createContext({} as any);

interface IProps {
  children: any;
}
const AppProvider = ({ children }: IProps) => {
  const loaded = useRef(false);

  /** This is the main address we use after giving the secret key */
  const [_address, setAddress] = useState<null | string>(null);
  const [_balance, setBalance] = useState<null | object[]>(null);

  const [_currentNavigation, setCurrentNavigation] = useState("balance");
  const [_promptLogin, setPromptLogin] = useState<boolean>(true);
  const [_promptDialogWithMessage, setPromptDialogWithMessage] = useState<
    false | string
  >(false);
  const [_promptDialogWithError, setPromptDialogWithError] = useState<
    false | string
  >(false);
  const [_promptTokenSelectionDialog, setPromptTokenSelection] = useState<
    null | boolean
  >(null);
  const [loginForm, setLoginForm] = useState<{
    _seedPhrase: string;
    _rememberMe: boolean;
    _secret: string;
  }>({
    _seedPhrase: "",
    _rememberMe: false,
    _secret: "",
  });

  const [_currencyFormat, setCurrencyFormat] = useState<{
    decimal: string;
    thousands: string;
  }>({
    decimal: ".",
    thousands: ",",
  });

  useEffect(() => {
    if (!loaded.current) {
      loaded.current = true;

      (window as any).MDS.init((msg) => {
        if (msg.event === "inited") {
          try {
            const rem = utils.getCookie("rememberme");

            if (rem === "true") {
              setLoginForm((prevState) => ({
                ...prevState,
                _rememberMe: true,
              })); // this'll keep the state of the checkbox

              const secretSauce: any = utils.getCookie("secretsauce");

              setLoginForm((prevState) => ({
                ...prevState,
                _seedPhrase: secretSauce,
              })); // this'll keep the state of the checkbox

              createAccount(secretSauce);
            }
          } catch (error) {
            setPromptLogin(true);
          }
        }

        if (msg.event === "NEWBALANCE") {
          console.log(`new balance!`);
          console.log(_address);
          // get their balance
          if (_address) {
            getBalance(_address);
          }
        }
      });
    }
  }, [loaded]);

  const promptLogin = () => {
    setPromptLogin((prevState) => !prevState);
  };

  const promptTokenSelectionDialog = () => {
    setPromptTokenSelection((prevState) => !prevState);
  };

  const promptDialogWithMessage = (message: string | false) => {
    setPromptDialogWithMessage(message ? message : false);
  };

  const promptDialogWithError = (message: string | false) => {
    setPromptDialogWithError(message ? message : false);
  };

  const handleNavigation = (page: string) => {
    setCurrentNavigation(page);
  };

  const promptLogout = () => {
    utils.setCookie("rememberme", "false", 365);
    utils.setCookie("secretsauce", "", 365);
    setPromptLogin(true);
    resetAccount();
  };

  const getBalance = (address: string) => {
    (window as any).MDS.cmd(`balance address:${address}`, function (resp) {
      console.log(resp);
      setBalance(resp.response);
    });
  };

  const resetAccount = () => {
    setAddress(null);
    setBalance(null);
    setLoginForm({ _seedPhrase: "", _rememberMe: false, _secret: "" });
  };

  const createAccount = (secretCode: string) => {
    // Generate a key
    (window as any).MDS.cmd(
      `keys action:genkey phrase:"${secretCode}"`,
      function (resp) {
        // Get the address
        const address = resp.response.miniaddress;
        setAddress(address);

        (window as any).MDS.cmd(`balance address:${address}`, function (resp) {
          setBalance(resp.response);

          promptLogin();
        });
      }
    );
  };

  const generateSecret = () => {
    return new Promise((resolve) => {
      (window as any).MDS.cmd("random", (resp) => {
        resolve(resp.response.keycode);
      });
    });
  };

  return (
    <appContext.Provider
      value={{
        _promptLogin,
        promptLogin,

        _currencyFormat,
        setCurrencyFormat,

        _promptTokenSelectionDialog,
        promptTokenSelectionDialog,

        _promptDialogWithMessage,
        promptDialogWithMessage,

        _promptDialogWithError,
        promptDialogWithError,

        _currentNavigation,
        handleNavigation,

        promptLogout,

        loginForm,
        setLoginForm,

        generateSecret,

        _address,
        setAddress,

        createAccount,

        _balance,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppProvider;
