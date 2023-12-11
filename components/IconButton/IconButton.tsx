import styles from './IconButton.module.css';
import Link from "next/link";

interface Props {
    isDisabled?: boolean;
    style?: React.CSSProperties;
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    icon?: React.ReactNode;
}

const IconButton = ({
   isDisabled = false,
   children,
   onClick,
   href,
    style,
   icon,
                    }: Props) => (
    href ? (
        <a href={href} className={styles.button} style={style}>
            {children}
            {icon}
        </a>
    ) : (
        <button
            className={styles.button}
            disabled={isDisabled}
            onClick={onClick}
            style={style}
        >
            <span>{children}</span>
            {icon}
        </button>
    )
);


export default IconButton;
