import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Button from "../components/Button/Button";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import shop_parts from "../public/vector_shop_parts.svg";
import shop_accessories from "../public/vector_shop_accessories.svg";
import ComputerParts from "../ComputerParts.json";
import React from "react";
import shop_center from "../public/shop_center.png";
import vector_shop_center from "../public/vector_shop_center.svg";
import vector_instagram from "../public/vector_insta.svg";
import vector_facebook from "../public/vector_facebook.svg";
import vector_twitter from "../public/vector_twitter.svg";
import { useRouter } from "next/router";
import HomeHeader from "../components/HomeHeader/HomeHeader";
import ValueBanner from "../components/ValueBanner/ValueBanner";

const Home: NextPage = () => {
  const [viewMore, setViewMore] = React.useState(4);
  const router = useRouter();

  return (
      <>
          <Head>
              <title>
                  Honokokona cooking device - Turbokokona
              </title>
              <meta name="description" content="Turbokokona Website, the Honokokona cooking device" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta name="theme-color" content="#000000" />
              <meta name="keywords" content="Honokokona, Honokokona Cooking Device, Turbokokona, cooking device, cooking, device, Turbokokona Honokokona, Turbokokona cooking device Honokokona" />

              <link rel="icon" href="/favicon.ico" />
              <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
              <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
              <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
              <link rel="manifest" href="/manifest.json" />
              <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
              <meta name="msapplication-TileColor" content="#da532c" />
              <link
                  rel="canonical"
                  href="https://www.turbokokona.com/"
                  key="canonical"
              />
          </Head>
              <main>
                  <div className={styles.container}>
                      <NavBar />
                      <HomeHeader />
                      <ValueBanner />
                      <Footer />
                  </div>
              </main>
          </>
    
  );
};

export default Home;
