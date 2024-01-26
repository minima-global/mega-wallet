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

  const [_promptMegaMMR, setPromptMegaMMR] = useState<null | boolean>(null);
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
    if (_address) {
      (window as any).MDS.cmd(`balance address:${_address}`, function (resp) {
        // console.log("got respective balance", resp.response);
        setBalance(resp.response);
      });
    }
  }, [_currentNavigation, _promptTokenSelectionDialog]);

  useEffect(() => {
    if (!loaded.current) {
      loaded.current = true;

      (window as any).MDS.init((msg) => {
        if (msg.event === "inited") {
          (window as any).MDS.cmd("megammr", (resp) => {
            if (!resp.response.enabled) {
              setPromptMegaMMR(true);
            }
            if (resp.response.enabled) {
              setPromptMegaMMR(false);
            }
          });

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
        }
        /** Does not work with this wallet */
        // if (msg.event === "NEWBALANCE") {
        //   // console.log(`new balance!`);

        //   const secretSauce: any = utils.getCookie("secretsauce");
        //   // console.log("we got the secretSUACE", secretSauce);
        //   (window as any).MDS.cmd(
        //     `keys action:genkey phrase:"${secretSauce}"`,
        //     function (resp) {
        //       // console.log("got addressed", resp.response.miniaddress);
        //       // Get the address
        //       const address = resp.response.miniaddress;
        //       setAddress(address);

        //       (window as any).MDS.cmd(
        //         `balance address:${address}`,
        //         function (resp) {
        //           // console.log("got respective balance", resp.response);
        //           setBalance(resp.response);
        //         }
        //       );
        //     }
        //   );
        // }
      });
    }
  }, [loaded]);

  const promptLogin = () => {
    setPromptLogin((prevState) => !prevState);
  };

  const promptTokenSelectionDialog = () => {
    setPromptTokenSelection((prevState) => !prevState);
  };

  const promptMegaMMR = () => {
    setPromptMegaMMR((prevState) => !prevState);
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
    setPromptLogin(true);
    resetAccount();
  };

  const resetAccount = () => {
    setAddress(null);
    setBalance(null);
    const rem = utils.getCookie("rememberme");

    if (rem !== "true") {
      setLoginForm({ _seedPhrase: "", _rememberMe: false, _secret: "" });
    }
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
        _promptMegaMMR,
        promptMegaMMR,

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
