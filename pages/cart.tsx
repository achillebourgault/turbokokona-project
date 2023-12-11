import type { NextPage } from "next";
import React from "react";
import styles from "../styles/Cart.module.css";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import ComputerParts from "../ComputerParts.json";
import Image from "next/image";
import { useRouter } from "next/router";

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

const Cart: NextPage = () => {
  const router = useRouter();

  function cart_tab() {
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
        (product: { id: number; quantity: number }) => {
          const productData = getProductById(product.id) as any;
          return (
            <div className={styles.product_line} key={product.id}>
              <div className={styles.picture_tab}>
                <Image src={productData.image_url} height={50} width={50} />
              </div>
              <div className={styles.product_tab}>{productData.name}</div>
              <div className={styles.price_tab}>${productData.price}</div>
              <div className={styles.quantity_tab}>{product.quantity}</div>
              <div className={styles.subtotal_tab}>
                ${product.quantity * productData.price}
              </div>
            </div>
          );
        }
      );
    }
  }

  return (
    <div className={styles.container}>
      <NavBar />
      <Header pageName="Cart" />
      <div className={styles.parent}>
        <div className={styles.wide}>
          <div className={styles.header_cart}>
            <div className={styles.product}>Product</div>
            <div className={styles.price}>Price</div>
            <div className={styles.quantity}>Quantity</div>
            <div className={styles.subtotal}>Subtotal</div>
          </div>
          <div className={styles.tab_cart}>{cart_tab()}</div>
        </div>
        <div className={styles.narrow}>
          <div className={styles.contactCard}>
            <h2 className={styles.titleCard}>Cart Total :</h2>
            <p className={styles.textCard}>$ {getSubTotalPrice()}</p>
            <button
              className={styles.button}
              onClick={() => {
                router.push("/checkout");
              }}
              style={{
                backgroundColor: "transparent",
                border: "1px solid white",
                color: "white",
                cursor: "pointer",
                padding: "0.7rem 1.8rem",
                marginBottom: "1rem",
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
