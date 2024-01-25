import { useContext } from "react";
import { appContext } from "../../AppContext";
import Tokens from "../Tokens";
import styles from "./Wallet.module.css";

const Wallet = () => {
  const { _currentNavigation } = useContext(appContext);

  if (_currentNavigation !== "balance") {
    return null;
  }

  return (
    <section className={styles["tokens"]}>
      <h6>Your tokens</h6>

      <input placeholder="Search tokens" type="search" />
      <Tokens selectionMode={false} />
    </section>
  );
};
export default Wallet;
