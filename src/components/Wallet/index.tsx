import { useContext, useEffect, useState } from "react";
import { appContext } from "../../AppContext";
import Tokens from "../Tokens";
import styles from "./Wallet.module.css";
import { useSpring, animated, config } from "react-spring";

const Wallet = () => {
  const { _currentNavigation, _promptLogin } = useContext(appContext);

  const [filter, setFilterText] = useState("");

  useEffect(() => {
    if (_currentNavigation !== "balance") {
      setFilterText("");
    }
  }, [_currentNavigation]);

  const springProps = useSpring({
    opacity: _currentNavigation === "balance" ? 1 : 0,
    transform:
      _currentNavigation === "balance"
        ? "translateY(0%) scale(1)"
        : "translateY(-50%) scale(1)",
    config: config.gentle,
  });

  const handleFilterTextChange = (evt) => {
    setFilterText(evt.target.value);
  };

  if (_currentNavigation !== "balance" || _promptLogin) {
    return null;
  }

  return (
    <animated.div style={springProps}>
      <section className={styles["tokens"]}>
        <h6>Your tokens</h6>

        <input
          onChange={handleFilterTextChange}
          placeholder="Search tokens"
          type="search"
        />
        <Tokens filterText={filter} selectionMode={false} />
      </section>
    </animated.div>
  );
};
export default Wallet;
