import { useContext, useState } from "react";
import { appContext } from "../../AppContext";
import Tokens from "../Tokens";
import styles from "./Wallet.module.css";

const Wallet = () => {
  const { _currentNavigation } = useContext(appContext);

  const [filter, setFilterText] = useState("");

  const handleFilterTextChange = (evt) => {
    setFilterText(evt.target.value);
  };

  if (_currentNavigation !== "balance") {
    return null;
  }

  return (
    <section className={styles["tokens"]}>
      <h6>Your tokens</h6>

      <input
        onChange={handleFilterTextChange}
        placeholder="Search tokens"
        type="search"
      />
      <Tokens filterText={filter} selectionMode={false} />
    </section>
  );
};
export default Wallet;
