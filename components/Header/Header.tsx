// import styles from "./Header.module.css";
import styles from "../../styles/Products.module.css";

interface Props {
  style?: React.CSSProperties;
  pageName: string;
}

const Header = ({ style, pageName }: Props) => (
  <div className={styles.shopBanner}>
    <h3>{pageName}</h3>
    <p>
      <span>Home {">"}</span> {pageName}
    </p>
  </div>
);

export default Header;
