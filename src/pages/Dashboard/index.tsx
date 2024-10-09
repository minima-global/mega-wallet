import Send from "../../components/Send";
import Wallet from "../../components/Wallet";
import Receive from "../../components/Receive";
import DesktopNav from "../../components/DesktopNav";
import DialogWithMessage from "../../components/DialogWithMessage";
import DialogWithError from "../../components/DialogWithError";
import Logout from "../Logout";

const Dashboard = () => {
  return (
    <div className="lg:mt-[28px] lg:max-w-[600px] w-full mx-auto p-4 lg:p-6 lg:p-0 rounded-lg container mx-auto">
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
      <Logout />
    </div>
  );
};

export default Dashboard;
