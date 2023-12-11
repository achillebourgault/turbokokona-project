import styles from "./Footer.module.css";

interface Props {
  style?: React.CSSProperties;
}

const Footer = ({ style }: Props) => (
  <div className={styles.footer}>
    <div className={styles.top}>
      <div className={styles.section_container}>
        <h4>Free Delivery</h4>
        <p className={styles.grey_item}>
          For all orders over $50, Dinooz will delivery for free directly to your door with his skateboard.
        </p>
      </div>
      <div className={styles.top_section_container}>
        <h4>90 Days Return</h4>
        <p className={styles.grey_item}>
          If goods have problems, Dinooz will come to your house to take back your product and give you a new one.
        </p>
      </div>
      <div className={styles.section_container}>
        <h4>Secure Payment</h4>
        <p className={styles.grey_item}>
          100% secure payment, We use only paypal and payment cards to make sur the payment is completely secure.
        </p>
      </div>
    </div>
    <div className={styles.bottom}>
      <div className={styles.grey_item}>
        THIS IS A STUDENT PROJECT, MADE FOR EDUCATIONAL PURPOSES ONLY
        <br/>
        <a href="https://honokonutrition.vercel.app/">Visit Honokoko Nutrition</a>
      </div>
      <nav>
        <p className={styles.grey_item}>Links</p>
        <ul>
          <a href={"/"}>Home</a>
          <a href={"/shop"}>Shop</a>
          <a href={"/about"}>About</a>
          <a href={"/contact"}>Contact</a>
        </ul>
      </nav>
      <nav>
        <p className={styles.grey_item}>Others</p>
        <ul>
          <a href={"/blog"}>Recipes</a>
          <a href={"/blog"}>Blog</a>
          <a href={"#"}>Install as PWA</a>
        </ul>
      </nav>
      <div>
        <div className={styles.grey_item}>Newsletter</div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="Enter your email..."
            style={{
              width: "200px",
              height: "30px",
              borderRadius: "5px",
              border: "none",
              fontSize: "19px",
            }}
          ></input>
          <p
            onClick={() => {
              alert("Subscribed!");
            }}
            style={{
              cursor: "pointer",
            }}
          >
            SUBSCRIBE
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
