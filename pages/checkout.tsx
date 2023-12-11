import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Checkout.module.css";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import React, { useEffect } from "react";
import Header from "../components/Header/Header";
import ComputerParts from "../ComputerParts.json";

type Props = {
  isSmall: boolean;
  content?: string;
  name?: string;
};

const InfoButton = ({ isSmall, content, name }: Props) => {
  return (
    <div>
      <p>{name}</p>
      <input
        type="text"
        className={styles.infoButton}
        style={{
          width: isSmall ? "215px" : "450px",
        }}
        placeholder={content}
      ></input>
    </div>
  );
};

const Products: NextPage = () => {
  const [isPayPalSelected, setIsPayPalSelected] = React.useState(false);
  const [products, setProducts] = React.useState(null);

  useEffect(() => {
    if (typeof window !== "undefined")
      setProducts(window.localStorage.getItem("cart") as any);
  }, []);

  const getProductById = (id: any) => {
    let productFinal = undefined;
    try {
      ComputerParts.phone.map((product) => {
        if (product.id === parseInt(id)) productFinal = product;
      });
    } catch (e) {
      console.log(
        "DEV ERROR: ProductID isn't satisfying. Got: [id:" + id + "]"
      );
    }

    console.log(productFinal);
    return productFinal;
  };

  const totalPrice = () => {
    let total = 0;
    products !== null &&
      JSON.parse(products as string).map(
        (product: { id: number; quantity: number }) => {
          const productData = getProductById(product.id) as any;
          total += product.quantity * productData.price;
        }
      );
    return total as unknown as string;
  };

  const handleSubmit = () => {
    window.localStorage.removeItem("cart");
    alert("Thank you for your purchase!");
    setProducts(null);
  };

  return (
    <div>
      <NavBar />
      <Header pageName="Checkout" />
      <div className={styles.container}>
        <div>
          <h1>Billing details</h1>
          <div
            style={{
              display: "flex",
              gap: "20px",
            }}
          >
            <InfoButton
              isSmall={true}
              content={"First Name"}
              name={"First Name"}
            />
            <InfoButton
              isSmall={true}
              content={"Last Name"}
              name={"Last Name"}
            />
          </div>
          <InfoButton
            isSmall={false}
            content={"Country / Region"}
            name={"Country / Region"}
          />
          <InfoButton
            isSmall={false}
            content={"Street Adress"}
            name={"Street Adress"}
          />
          <InfoButton
            isSmall={false}
            content={"Town / City"}
            name={"Town / City"}
          />
          <InfoButton isSmall={false} content={"Province"} name={"Province"} />
          <InfoButton isSmall={false} content={"ZIP Code"} name={"ZIP Code"} />
          <InfoButton isSmall={false} content={"Phone"} name={"Phone"} />
          <InfoButton
            isSmall={false}
            content={"Email Adress"}
            name={"Email Adress"}
          />
          <InfoButton
            isSmall={false}
            content={"Additional Information"}
            name={"Additional Information"}
          />
        </div>
        <div>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <h2>Product</h2>
                <h2>Subtotal</h2>
              </div>
              {products !== null &&
                JSON.parse(products as string).map((product: any) => (
                  <div
                    key={product.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      {/* @ts-ignore */}
                      <p>{getProductById(product.id)?.name} x </p>
                      {/* @ts-ignore */}
                      <p>{product.quantity}</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                      }}
                    >
                      {/* @ts-ignore */}
                      <p>{getProductById(product.id)?.price}</p>
                      {/* @ts-ignore */}
                      <p>{getProductById(product.id)?.currency}</p>
                    </div>
                  </div>
                ))}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p>Subtotal</p>
                <p>{totalPrice()} USD</p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p>Shipping</p>
                <p>FREE</p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p>Total</p>
                <p>{totalPrice()} USD</p>
              </div>
            </div>
          </div>
          <div
            style={{
              border: "1px solid grey",
            }}
          />
          <div
            style={{
              display: "flex",
            }}
          >
            <input
              type="checkbox"
              onChange={() => setIsPayPalSelected(!isPayPalSelected)}
              checked={!isPayPalSelected}
            />
            <p>Credit / Debit Card</p>
          </div>
          <p
            style={{
              color: "grey",
              maxWidth: "400px",
            }}
          >
            Make your payment directly into our bank account. Please use your
            Order ID as the payment reference. Your order will not be shipped
            until the funds have cleared in our account.
          </p>
          <div
            style={{
              display: "flex",
            }}
          >
            <input
              type="checkbox"
              onChange={() => setIsPayPalSelected(true)}
              checked={isPayPalSelected}
            />
            <p>Paypal</p>
          </div>
          <p
            style={{
              color: "grey",
              maxWidth: "400px",
            }}
          >
            Your personal data will be used to support your experience
            throughout this website, to manage access to your account, and for
            other purposes described in our{" "}
            <span
              style={{
                color: "black",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              privacy policy.
            </span>
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button className={styles.button} onClick={() => handleSubmit()}>
              Place Order
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
  // }
};

export default Products;
