import styles from "./Button.module.scss";

interface Props {
  value: string;
  style?: React.HTMLAttributes<HTMLDivElement>["style"];
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ value, style, onClick }: Props) => {
  return (
    <button className={styles.container} style={style} onClick={onClick}>
      {value}
    </button>
  );
};

export default Button;
