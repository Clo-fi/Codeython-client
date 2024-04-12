import styles from "./Button.module.scss";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  value: string;
  style?: React.HTMLAttributes<HTMLDivElement>["style"];
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ value, style, onClick, ...props }: Props) => {
  return (
    <button
      className={styles.container}
      style={style}
      onClick={onClick}
      {...props}
    >
      {value}
    </button>
  );
};

export default Button;
