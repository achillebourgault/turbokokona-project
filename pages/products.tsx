import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Products.module.css";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import React, {useState} from "react";
import ComputerParts from "../ComputerParts.json";
import shop_banner from "../public/shop_banner.svg";
import Header from "../components/Header/Header";
import Link from "next/link";

const Products: NextPage = () => {

  return (
      <>
          <Head>
              <title>
                  Honokokona Cookers - Turbokokona
              </title>
              <meta name="description" content="Turbokokona Website, the Honokokona cooking device" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta name="theme-color" content="#000000" />
              <meta name="keywords" content="Honokokona, Honokokona Cooking Device, Turbokokona, cooking device, cooking, device, Turbokokona Honokokona, Turbokokona cooking device Honokokona" />

              <link rel="icon" href="/favicon.ico" />
              <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
              <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
              <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
              <link rel="manifest" href="/site.webmanifest" />
              <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
              <meta name="msapplication-TileColor" content="#da532c" />
          </Head>
          <main>
              <div className={styles.container}>
                  <NavBar />
                  <Header pageName="Shop" />

                  <div className={styles.shopGridWrapper}>
                      <div className={styles.shopGrid}>
                          {ComputerParts.phone.map((item) => {
                              return (
                                  <a
                                      key={item.id}
                                      href={`/product/${item.id}`}
                                  >
                                      <div className={styles.productBox}>
                                          <div className={styles.productHeader}>
                                              <Image
                                                  alt={item?.alt}
                                                  src={item.image_url}
                                                  height={300}
                                                  width={300}
                                              />
                                          </div>
                                          <span className={styles.bolder}>{item.name}</span>
                                          <span className={styles.itemPrice}>
                                              Starting at
                                              {item.currency !== "USD" ? (" " + item.currency + " ") : " $"}
                                              {item.price}
                        </span>
                                      </div>
                                  </a>
                              )
                          })}

                      </div>

                  </div>

                  <Footer />
              </div>
          </main>
      </>
    );
};

export default Products;
