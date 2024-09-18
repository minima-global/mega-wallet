import { createContext, useRef, useEffect, useState } from "react";

import * as utils from "./utils";
import { sql } from "./utils/SQL";

import { toast } from "react-toastify";

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
  const [_promptLogoutDialog, setPromptLogoutDialog] = useState<boolean>(false);
  const [_promptDialogWithMessage, setPromptDialogWithMessage] = useState<
    false | string
  >(false);
  const [_promptDialogWithError, setPromptDialogWithError] = useState<
    false | string
  >(false);
  const [_promptTokenSelectionDialog, setPromptTokenSelection] = useState<
    null | boolean
  >(null);
  const [_promptingFetchingBalance, setPromptFetchBalance] = useState<
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

  const getBalance = () => {
    if (!_address) return;

    setPromptFetchBalance(true);
    (window as any).MDS.cmd(
      `balance megammr:true address:${_address}`,
      function (resp) {
        resp.response.map(createImages);

        setBalance(resp.response);

        setTimeout(() => {
          setPromptFetchBalance(false);
        }, 2500);
      },
    );
  };

  useEffect(() => {
    if (_address) {
      getBalance();
    }
  }, [_currentNavigation, _address, _promptTokenSelectionDialog]);

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
              `CREATE TABLE IF NOT EXISTS cache (name varchar(255), data longtext);`,
            );

            const keyUsage: any = await sql(
              `SELECT * FROM cache WHERE name = 'KEYUSAGE'`,
            );

            if (keyUsage) {
              setKeyUsages(JSON.parse(keyUsage.DATA));
            }
          })();
        }
      });
    }
  }, [loaded]);

  useEffect(() => {
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
  }, []);

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

  const promptLogoutDialog = () => {
    setPromptLogoutDialog((prevState) => !prevState);
  };

  const promptLogout = () => {
    setPromptLogoutDialog(false);
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
          `balance megammr:true address:${miniaddress}`,
          function (resp) {
            resp.response.map(createImages);

            setBalance(resp.response);
          },
        );
      },
    );
  };

  const createImages = async (t: any) => {
    const customToken = t.tokenid !== "0x00";

    if (customToken) {
      const hasImage = t.token && "url" in t.token && t.token.url.length > 0;

      if (hasImage) {
        const tokenUrl = t.token.url;
        const compressedImage = tokenUrl.startsWith("<artimage>", 0);
        const ipfsImage = tokenUrl.startsWith("https://ipfs.io/ipns/", 0);

        if (compressedImage) {
          t.token.url = utils.makeTokenImage(t.token.url, t.tokenid);
        }

        if (ipfsImage) {
          t.token.url = await utils.fetchIPFSImageUri(t.token.url);
        }
      }
    }
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
          updatedData,
        )}')`,
      );
    } else {
      await sql(
        `UPDATE cache SET data = '${JSON.stringify(
          updatedData,
        )}' WHERE name = 'KEYUSAGE'`,
      );
    }
  };

  const notify = (message: string) =>
    toast(message, {
      position: "bottom-center",
      theme: "light",
      bodyClassName: "font-bold text-center",
      draggablePercent: 90,
    });

  return (
    <appContext.Provider
      value={{
        notify,
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
        _promptLogoutDialog,
        promptLogoutDialog,

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
        getBalance,
        _promptingFetchingBalance,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppProvider;
