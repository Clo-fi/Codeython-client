import { PropsWithChildren } from "react";
import styles from "./ListBallon.module.scss";

interface Props extends PropsWithChildren {
  title: string;
  width?: number | string;
  height?: number | string;
  style?: React.HTMLAttributes<HTMLElement>["style"];
  className?: React.HTMLAttributes<HTMLElement>["className"];
  isThin?: boolean;
}

const ListBallon = ({
  title,
  width,
  height,
  children,
  style,
  className,
  isThin,
}: Props) => {
  return (
    <section
      className={`${styles.container} ${className}`}
      style={{ ...style, width, height }}
    >
      <div className={styles.title}>{title}</div>
      <div className={isThin ? styles.thin_content : styles.content}>
        {children}
      </div>
    </section>
  );
};

export default ListBallon;
