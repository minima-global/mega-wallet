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

  const [_promptLogin, setPromptLogin] = useState<null | boolean>(null);
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
    _secret: undefined | string;
  }>({
    _seedPhrase: "",
    _rememberMe: false,
    _secret: "",
  });

  useEffect(() => {
    if (!loaded.current) {
      loaded.current = true;
      (window as any).MDS.init((msg) => {
        if (msg.event === "inited") {
          console.log(document.cookie);
          const rem = utils.getCookie("rememberme");

          if (rem === "true") {
            setLoginForm((prevState) => ({ ...prevState, _rememberMe: true })); // this'll keep the state of the checkbox

            const secretSauce = utils.getCookie("secretsauce");
            console.log(secretSauce);
            setLoginForm((prevState) => ({
              ...prevState,
              ["_seedPhrase"]: secretSauce,
            })); // this'll keep the state of the secret

            // Generate a key
            (window as any).MDS.cmd(
              `keys action:genkey phrase:"${secretSauce}"`,
              function (resp) {
                // Get the address
                const address = resp.response.miniaddress;
                console.log(address);

                // get their balance
                getBalance(address);

                // Jump to the main balance page
                setAddress(address);
                promptLogin();
              }
            );
          }
        }

        if (msg.event === "NEWBALANCE") {
          const hasSecretCode = loginForm._seedPhrase !== null;
          if (hasSecretCode) {
            // Generate a key
            (window as any).MDS.cmd(
              `keys action:genkey phrase:"${loginForm._seedPhrase}"`,
              function (resp) {
                // Get the address
                const address = resp.response.miniaddress;
                console.log(address);

                // get their balance
                getBalance(address);

                // Jump to the main balance page
                setAddress(address);
                promptLogin();
              }
            );
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

  const getBalance = (address: string) => {
    (window as any).MDS.cmd(`balance address:${address}`, function (resp) {
      console.log(resp);
      setBalance(resp.response);
    });
  };

  const generateSecret = () => {
    (window as any).MDS.cmd("random", (resp) => {
      console.log(resp);
      setLoginForm((prevState) => ({
        ...prevState,
        _secret: resp.response.keycode,
      })); // this'll keep the state of the secret
    });
  };

  return (
    <appContext.Provider
      value={{
        _promptLogin,
        promptLogin,

        _promptTokenSelectionDialog,
        promptTokenSelectionDialog,

        _promptDialogWithMessage,
        promptDialogWithMessage,

        _promptDialogWithError,
        promptDialogWithError,

        _currentNavigation,
        handleNavigation,

        loginForm,
        setLoginForm,

        generateSecret,

        _address,
        setAddress,

        _balance,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppProvider;
