import { useContext, useState } from "react";
import styles from "./Dashboard.module.css";
import DesktopNav from "../../components/DesktopNav";
import Wallet from "../../components/Wallet";
import Send from "../../components/Send";
import DialogWithMessage from "../../components/DialogWithMessage";
import DialogWithError from "../../components/DialogWithError";
import Receive from "../../components/Receive";
import { appContext } from "../../AppContext";

import * as utils from "../../utils";
import isMobileDevice from "../../utils/isMobile";
import MobileFooterNav from "../../components/MobileFooterNav";
import AppThemeSwitch from "../../components/AppThemeSwitch";

const Dashboard = () => {
  const {
    promptLogout,
    loginForm,
    _promptLogoutDialog,
    promptLogoutDialog,
    notify,
    _keyUsages,
    _address,
  } = useContext(appContext);

  const [visibility, toggleVisiblity] = useState(false);

  const [copied, setCopied] = useState<{ seed: boolean; keys: boolean }>({
    seed: false,
    keys: false,
  });
  const handleToggleVisibility = () => {
    toggleVisiblity((prevState) => !prevState);
  };

  const handleCopy = async (value: string, key: string) => {
    setCopied((prevState) => ({ ...prevState, [key]: true }));
    const isMobile = isMobileDevice();

    if (!isMobile) {
      notify(`Copied to clipboard`);
    }

    utils.copyToClipboard(value);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setCopied((prevState) => ({ ...prevState, [key]: false }));
  };

  return (
    <div className="mt-[120px] mb-[200px] w-[650px] mx-auto bg-mediumDarkContrast p-6 rounded-lg">
      <h1 className="pt-0.5 text-3xl mb-5">Minima Public Wallet</h1>
      <div className="w-full h-[2px] bg-grey my-6" />
      <DesktopNav />
      <section>
        <DialogWithError />
        <DialogWithMessage />
        <Wallet />
        <Send />
        <Receive />
      </section>
    </div>
  );
};

export default Dashboard;
