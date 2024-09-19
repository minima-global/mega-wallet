import { useContext } from "react";
import { appContext } from "../../AppContext";

const Help = () => {
  const { setHelp } = useContext(appContext);

  // Handler for the switch change event
  const handleSwitchChange = () => {
    setHelp((prevState) => !prevState);
  };

  return <div onClick={handleSwitchChange}>?</div>;
};

export default Help;
