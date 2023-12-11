import styles from "./NavBar.module.css";
import Logo from "../../public/logo.png";
import Image from "next/image";
import Account_vecor_icon from "../../public/account_vector_icon.svg";
import Cart_vecor_icon from "../../public/cart_vector_icon.svg";
import Like_vecor_icon from "../../public/like_vector_icon.svg";
import Search_vecor_icon from "../../public/search_vector_icon.svg";
import Cart_header_icon from "../../public/cart_header_icon.svg";
import { Key, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../../firebase';
import ComputerParts from "../../ComputerParts.json";
import { useRouter } from "next/router";
import DeleteIcon from "../../public/delete_icon.png";
import ProfileIcon from "../../public/user-profile.png"
import Button from "../Button/Button";
import {GrCart, GrFavorite, GrSearch} from "react-icons/gr";
import {BiAlarmAdd, BiCart, BiHeart, BiSearch} from "react-icons/bi";
import {IoMenuOutline} from "react-icons/io5";

interface Props {
  style?: React.CSSProperties;
}

const base64ToUint8Array = base64 => {
  const padding = '='.repeat((4 - (base64.length % 4)) % 4)
  const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(b64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

const getSubTotalPrice = () => {
  let total = 0;
  let products = null;

  if (typeof window !== "undefined")
    products = window.localStorage.getItem("cart");
  if (products === null || products.length === 0) return 0;

  JSON.parse(products).map(
    (product: { id: number; quantity: number; price: number }) => {
      const productData = getProductById(product.id) as any;
      if (productData) total += product.quantity * productData?.price;
    }
  );
  return total;
};

const getProductById = (id: any) => {
  let productFinal = undefined;
  try {
    ComputerParts.phone.map((product) => {
      if (product.id === parseInt(id)) productFinal = product;
    });
  } catch (e) {
    console.log("DEV ERROR: ProductID isn't satisfying. Got: [id:" + id + "]");
  }
  return productFinal;
};

const renderCartProducts = () => {
  let products = null;

  if (typeof window !== "undefined")
    products = window.localStorage.getItem("cart");
  if (products === null || products.length === 0) {
    return (
      <div>
        <p>No item in cart.</p>
      </div>
    );
  } else {
    return JSON.parse(products).map(
      (product: {
        id: Key;
        name: string;
        image_url: string;
        price: number;
        currency: string;
        quantity: number;
      }) => {
        const productData = getProductById(product.id) as any;
        return (
          <div key={product.id} className={styles.cartProduct}>
            <Image
              src={productData.image_url}
              alt="Cart Product"
              title="Cart Product"
              height={50}
              width={50}
              className={styles.cartProductLogo}
            />
            <div>
              <p>{productData.name}</p>
              <p>
                {product.quantity} x ${productData.price}
              </p>
            </div>
          </div>
        );
      }
    );
  }
};

const NavBar = ({ style }: Props) => {
  const [cartVisibility, setCartVisibility] = useState(false);
  const [profileVisibility, setProfileVisibility] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [MobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const [uid, setUid] = useState("");


  const [isSubscribed, setIsSubscribed] = useState(false)
  const [subscription, setSubscription] = useState(null)
  const [registration, setRegistration] = useState(null)

  const handleLogout = () => {
    signOut(auth).then(() => {
    // Sign-out successful.
        localStorage.removeItem("token");
        router.push("/");
        console.log("Signed out successfully")
    }).catch((error) => {
    // An error happened.
    });
  }

  useEffect(()=>{
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // run only in browser
      navigator.serviceWorker.ready.then(reg => {
        reg.pushManager.getSubscription().then(sub => {
          if (sub && !(sub.expirationTime && Date.now() > sub.expirationTime - 5 * 60 * 1000)) {
            setSubscription(sub)
            setIsSubscribed(true)
          }
        })
        setRegistration(reg)
      })
    }
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          console.log("uid", uid)
          setUid(user.uid);

          setLoggedIn(true);
        } else {
          // User is signed out
          // ...
          setLoggedIn(false);
          setProfileVisibility(false);
          console.log("user is logged out")
        }
      });

  }, [])

  const subscribeButtonOnClick = async event => {
    event.preventDefault()
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: base64ToUint8Array(process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY)
    })
    await fetch('/api/notification/subscribe', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        sub,
        uid: uid
      })
    }).then(async (res) => {
      if (res.status === 200) {
        setSubscription(sub)
        setIsSubscribed(true)
        console.log('web push subscribed!')
      }
    })
    // TODO: you should call your API to save subscription data on server in order to send web push notification from server
    
  }

  const unsubscribeButtonOnClick = async event => {
    event.preventDefault()
    await fetch('/api/notification/unsubscribe', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        uid: uid
      })
    }).then(async (res) => {
      if (res.status === 200) {
        await subscription.unsubscribe()
        setSubscription(null)
        setIsSubscribed(false)
        console.log('web push unsubscribed!')
      }
    })
  }

    const isDarkNavbar = () => {
        return router.route === "/contact" || router.route === "/about" || router.route.startsWith("/blog") || router.route.startsWith("/product") || router.route.startsWith("/recipe") || router.route === "/signUp"
    }

  return (
    <div
        className={isDarkNavbar() ? styles.navbarDark : styles.navbar}
        style={{
            height: MobileMenuOpen ? '100%' : 'inherit',
            background: MobileMenuOpen ? "#000000" : isDarkNavbar() ? "#000000" : "transparent"
    }}
    >
      <div className={styles.left}>
          <div className={styles.logo} onClick={() => router.push("/")}>
              <span>Turbokokona</span>
          </div>
          <nav>
              <ul className={styles.nav_link}>
                  <li className={styles.nav_tabs}>
                      <a href={"/"} onClick={() => setMobileMenuOpen(false)}>Home</a>
                  </li>
                  <li className={styles.nav_tabs}>
                      <a href={"/products"} onClick={() => setMobileMenuOpen(false)}>Shop</a>
                  </li>
                  <li className={styles.nav_tabs}>
                      <a href={"/about"} onClick={() => setMobileMenuOpen(false)}>About</a>
                  </li>
                  <li className={styles.nav_tabs}>
                      <a href={"/contact"} onClick={() => setMobileMenuOpen(false)}>Contact</a>
                  </li>
                  <li className={styles.nav_tabs}>
                      <a href={"/blog"} onClick={() => setMobileMenuOpen(false)}>Blog & Recipes</a>
                  </li>
              </ul>
          </nav>
      </div>
      <div className={styles.nav_icon}>
          <div className={styles.mobile_menu_icon} onClick={() => setMobileMenuOpen(!MobileMenuOpen)}>
              <IoMenuOutline size={26} />
          </div>
          {/*<BiCart size={30} onClick={() => setCartVisibility(!cartVisibility)} />
        <BiSearch size={30} />
          <BiHeart size={30} />*/}
        {loggedIn ? (
          <Image
            src={ProfileIcon}
            height={30}
            width={30}
            alt="Open profile"
            title="Profile"
            onClick={() => setProfileVisibility(!profileVisibility)}
          />
        ): (
          <div className={styles.button} onClick={() => router.push("/signUp")}>Login</div>
        )}
      </div>

        {MobileMenuOpen && (
            <div className={styles.mobile_menu}>
                <nav>
                    <ul className={styles.nav_link}>
                        <li className={styles.nav_tabs}>
                            <a href={"/"}>Home</a>
                        </li>
                        <li className={styles.nav_tabs}>
                            <a href={"/products"}>Shop</a>
                        </li>
                        <li className={styles.nav_tabs}>
                            <a href={"/about"}>About</a>
                        </li>
                        <li className={styles.nav_tabs}>
                            <a href={"/contact"}>Contact</a>
                        </li>
                        <li className={styles.nav_tabs}>
                            <a href={"/blog"}>Blog & Recipes</a>
                        </li>
                    </ul>
                </nav>
            </div>
            )
        }
      {profileVisibility ? (
        <div className={styles.cartDetails}>
          <div className={styles.cartDetailsHeader}>
            <h3>Profile</h3>
            <Image
              src={DeleteIcon}
              height={20}
              width={20}
              alt="Close Profile"
              title="Close"
              onClick={() => setProfileVisibility(!profileVisibility)}
              style={{ cursor: "pointer" }}
            />
          </div>
          <h4>Notifications:</h4>
          <button className={styles.subButton} onClick={subscribeButtonOnClick} disabled={isSubscribed}>
              Subscribe
            </button>
            <button className={styles.subButton} onClick={unsubscribeButtonOnClick} disabled={!isSubscribed}>
              Unsubscribe
            </button>
            <br/>
          <div className={styles.cartDetailsFooter}>
            <br/>
            <div className={styles.button} onClick={() => handleLogout()}>Logout</div>
          </div>
          <br/>
        </div>
      ): (
        <></>
      )}
      {cartVisibility ? (
        <div className={styles.cartDetails}>
          <div className={styles.cartDetailsHeader}>
            <h3>Shopping Cart</h3>
            <Image
              src={Cart_header_icon}
              height={50}
              alt="Cart Header"
              title="Cart"
              onClick={() => {
                window.localStorage.removeItem("cart");
                setCartVisibility(!cartVisibility);
              }}
              style={{ cursor: "pointer" }}
            />
            <Image
              src={DeleteIcon}
              height={20}
              width={20}
              alt="Delete Cart"
              title="Delete"
              onClick={() => setCartVisibility(!cartVisibility)}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className={styles.cartDetailsContent}>
            {renderCartProducts()}
          </div>
          {getSubTotalPrice() !== 0 ? (
            <div className={styles.cartDetailsFooter}>
              <p>
                Subtotal <span>${getSubTotalPrice()}</span>
              </p>
            </div>
          ) : (
            <></>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              width: "100%",
              marginBottom: "20px",
            }}
          >
              <Button href={"/chekout"}>
                  Checkout
              </Button>
            <Button href={"/cart"}>
              Cart
            </Button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default NavBar;
