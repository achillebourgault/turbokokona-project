import styles from './Button.module.css';

interface Props {
  style?: React.CSSProperties;
  children: React.ReactNode;
  href: any
}

const Button = ({
  style,
  children,
  href,
}: Props) => (
  <a
    className={styles.button}
    style={style}
    href={href}
  >
    <span>{children}</span>
  </a>
);

export default Button;
