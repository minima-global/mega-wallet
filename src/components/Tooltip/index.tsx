import { ReactElement } from "react";
import styles from "./Tooltip.module.css";

interface IProps {
  message: string;

  children: ReactElement;
}
const Tooltip = ({ message, children }: IProps) => {
  return (
    <div className={styles["tooltip-container"]}>
      {children}
      <div className={styles["tooltip-content"]}>{message}</div>
    </div>
  );
};

export default Tooltip;
