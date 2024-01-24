import styles from "./Toggle.module.css";

interface IProps {
  onChange: any;
  label: string;
  checkedStatus: boolean;
}
const Toggle = ({ onChange, checkedStatus, label }: IProps) => {
  return (
    <div className={styles.checkboxContainer}>
      <label className={`${styles.checkboxLabel} text-sm`}>{label}</label>
      <input
        checked={checkedStatus}
        type="checkbox"
        onChange={onChange}
        className={styles.checkbox}
      />
      <div className={styles.checkboxIcon}></div>
    </div>
  );
};

export default Toggle;
