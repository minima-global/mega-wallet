import Send from "../../components/Send";
import Wallet from "../../components/Wallet";
import Receive from "../../components/Receive";
import DesktopNav from "../../components/DesktopNav";
import DialogWithMessage from "../../components/DialogWithMessage";
import DialogWithError from "../../components/DialogWithError";

const Dashboard = () => {
  return (
    <div className="lg:mt-[80px] mb-[200px] max-w-[600px] w-full mx-auto p-6 rounded-lg">
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
