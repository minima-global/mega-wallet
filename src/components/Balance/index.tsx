import { useContext } from "react";
import styles from "./Balance.module.css";
import { appContext } from "../../AppContext";

const Balance = () => {
  const { _balance } = useContext(appContext);

  if (!_balance) {
    return (
      <section className={styles["balance"]}>
        <h6>Hello Minimalist</h6>
        <p>-</p>
        <p>Minima balance</p>
      </section>
    );
  }

  return (
    <section className={styles["balance"]}>
      <h6>Hello Minimalist</h6>
      <p className="font-mono">{_balance[0].confirmed}</p>
      <p>Minima balance</p>
    </section>
  );
};

export default Balance;
