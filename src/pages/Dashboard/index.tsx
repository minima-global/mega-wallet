import Send from "../../components/Send";
import Wallet from "../../components/Wallet";
import Receive from "../../components/Receive";
import DesktopNav from "../../components/DesktopNav";
import DialogWithMessage from "../../components/DialogWithMessage";
import DialogWithError from "../../components/DialogWithError";
import Logout from "../Logout";

const Dashboard = () => {
  return (
    <div className="mt-0 md:mt-[28px] md:max-w-[600px] w-full p-4 px-5 lg:px-4 rounded-lg mx-auto">
      <div className="container mx-auto">
        <h1 className="pt-0.5 text-2xl lg:text-3xl mb-6 text-black dark:text-white">
          Minima Public Wallet
        </h1>
        <DesktopNav />
        <section>
          <DialogWithError />
          <DialogWithMessage />
          <Wallet />
          <Send />
          <Receive />
        </section>
      </div>
      <Logout />
    </div>
  );
};

export default Dashboard;
