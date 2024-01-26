import styles from "./Dashboard.module.css";
import DesktopNav from "../DesktopNav";
import Balance from "../Balance";
import Wallet from "../Wallet";
import Send from "../Send";
import DialogWithMessage from "../DialogWithMessage";
import DialogWithError from "../DialogWithError";
import Receive from "../Receive";
import { useContext } from "react";
import { appContext } from "../../AppContext";

const Dashboard = () => {
  const { promptLogout } = useContext(appContext);

  return (
    <div className={styles["grid"]}>
      <header>
        <img alt="icon" src="./assets/icon.svg" />
        <div>
          <button onClick={promptLogout} className="bg-orange-300 text-black ">
            Logout
          </button>
        </div>
      </header>
      <main>
        <section>
          <section />
          <DialogWithError />
          <DialogWithMessage />
          <Balance />
          <DesktopNav />
          <Wallet />
          <Receive />
          <Send />
        </section>
      </main>
      <footer>
        <div />
        <nav>
          <button className="bg-black">
            <img alt="send-icon" src="/assets/footer-send.svg" />
            <p>Send</p>
          </button>
          <button>
            <img alt="receive-icon" src="/assets/footer-received.svg" />
            <p>Receive</p>
          </button>
          <button>
            <img alt="history-icon" src="/assets/footer-history.svg" />
            <p>Balance</p>
          </button>
        </nav>
        <div />
      </footer>
    </div>
  );
};

export default Dashboard;
