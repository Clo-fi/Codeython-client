import { PropsWithChildren } from "react";
import styles from "./Box.module.scss";

interface Props extends PropsWithChildren {
  title: string;
  width?: number;
  height?: number;
  style?: React.HTMLAttributes<HTMLElement>["style"];
  className?: React.HTMLAttributes<HTMLElement>["className"];
}

const Box = ({ title, width, height, children, style, className }: Props) => {
  return (
    <section
      className={`${styles.container} ${className}`}
      style={{ ...style, width, height }}
    >
      <div className={styles.title}>{title}</div>
      {children}
    </section>
  );
};

export default Box;
