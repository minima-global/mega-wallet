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

  const [_promptLogin, setPromptLogin] = useState(false);
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
          }
        }
      });
    }
  }, [loaded]);

  const promptLogin = () => {
    setPromptLogin((prevState) => !prevState);
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

        loginForm,
        setLoginForm,

        generateSecret,

        _address,
        setAddress,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppProvider;
