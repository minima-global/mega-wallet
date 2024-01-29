import { createContext, useRef, useEffect, useState } from "react";

import * as utils from "./utils";
import { sql } from "./utils/SQL";

export const appContext = createContext({} as any);

interface IProps {
  children: any;
}
interface KeyUsages {
  address: number;
}

const AppProvider = ({ children }: IProps) => {
  const loaded = useRef(false);

  /** This is the main address we use after giving the secret key */
  const [_address, setAddress] = useState<null | string>(null);
  const [_balance, setBalance] = useState<null | object[]>(null);
  const [_privateKey, setPrivateKey] = useState<null | string>(null);
  const [_keyUsages, setKeyUsages] = useState<KeyUsages[]>([]);
  const [_script, setScript] = useState<null | string>(null);

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

          (async () => {
            await sql(
              `CREATE TABLE IF NOT EXISTS cache (name varchar(255), data longtext);`
            );

            const keyUsage: any = await sql(
              `SELECT * FROM cache WHERE name = 'KEYUSAGE'`
            );

            if (keyUsage) {
              setKeyUsages(JSON.parse(keyUsage.DATA));
            }
          })();
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
        const { miniaddress, privatekey, script } = resp.response;
        setPrivateKey(privatekey);
        setScript(script);
        setAddress(miniaddress);

        (window as any).MDS.cmd(
          `balance address:${miniaddress}`,
          function (resp) {
            setBalance(resp.response);
          }
        );
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

  const updateKeyUsage = async (address: string, count: number) => {
    const updatedData = {
      ..._keyUsages,
      [address]: count,
    };

    setKeyUsages(updatedData);

    const rows = await sql(`SELECT * FROM cache WHERE name = 'KEYUSAGE'`);

    if (!rows) {
      await sql(
        `INSERT INTO cache (name, data) VALUES ('KEYUSAGE', '${JSON.stringify(
          updatedData
        )}')`
      );
    } else {
      await sql(
        `UPDATE cache SET data = '${JSON.stringify(
          updatedData
        )}' WHERE name = 'KEYUSAGE'`
      );
    }
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

        _privateKey,
        _script,

        _address,
        setAddress,

        _keyUsages,
        updateKeyUsage,

        createAccount,

        _balance,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppProvider;
