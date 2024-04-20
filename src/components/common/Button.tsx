import styles from "./Button.module.scss";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  value: string;
  className?: React.HTMLAttributes<HTMLButtonElement>["className"];
  style?: React.HTMLAttributes<HTMLDivElement>["style"];
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ value, style, className, onClick, ...props }: Props) => {
  return (
    <button
      style={style}
      className={`${styles.container} ${className}`}
      onClick={onClick}
      {...props}
    >
      {value}
    </button>
  );
};

export default Button;
