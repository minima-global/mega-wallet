import { useContext } from "react";
import styles from "./Balance.module.css";
import { appContext } from "../../AppContext";
import useFormatMinimaNumber from "../../utils/useMakeNumber";

const Balance = () => {
  const { _balance } = useContext(appContext);
  const { makeMinimaNumber } = useFormatMinimaNumber();

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
      <p className="font-mono text-teal-500">
        {makeMinimaNumber(_balance[0].confirmed, 2000)}
      </p>
      <p>Minima balance</p>
    </section>
  );
};

export default Balance;
