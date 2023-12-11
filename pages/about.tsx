import type { NextPage } from "next";
import styles from "../styles/About.module.css";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import React from "react";
import { useRouter } from "next/router";
import {Helmet} from "react-helmet";
import Head from "next/head";

const About: NextPage = () => {
  const router = useRouter();

  return (
      <>
          <Head>
              <title>
                  About us - Turbokokona
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
                  <div className={styles.content}>
                      <div className={styles.titleBox}>
                          <h2 className={styles.subtitle}>Turbokokona</h2>
                          <h1 className={styles.title}>About us</h1>
                      </div>
                      <div className={styles.description}>
                        <p>Welcome to the heart of culinary innovation and excellence at Turbokokona. We are more than just a kitchen appliance manufacturer; we are a culinary movement dedicated to transforming the way you experience food.</p>

                        <h2>Our Mission</h2>
                        <p>At Turbokokona, our mission is simple yet profound: to elevate your culinary adventures to new heights. We believe that cooking should be a delightful and enchanting experience, and our products are designed to make that vision a reality.</p>

                        <h2>Who We Are</h2>
                        <p>We are a passionate team of culinary enthusiasts, engineers, and visionaries united by a shared love for exceptional food and innovative cooking technology. Our commitment to quality, creativity, and craftsmanship drives everything we do.</p>

                        <h2>Our Products</h2>
                        <p>Our range of Turbokokona cooking devices is a testament to our dedication to culinary excellence. Each product is meticulously crafted to bring precision, efficiency, and elegance to your kitchen. From the iconic Turbokokona Classic to the high-capacity Turbokokona Maxi, we offer options to suit every culinary need.</p>

                        <h2>Why Choose Turbokokona?</h2>
                        <p>What sets Turbokokona apart is not just our cutting-edge technology, but our unwavering commitment to your culinary journey. We believe that everyone can be a master in the kitchen, and our devices are designed to empower you to create dishes that leave a lasting impression.</p>

                        <h2>Our Community</h2>
                        <p>We are proud to have a vibrant and engaged community of Turbokokona enthusiasts. Join us in our forums, on social media, and at our culinary events to share your experiences, recipes, and culinary stories. Together, we&apos;re redefining the art of cooking.</p>

                        <h2>Experience the Future of Cooking</h2>
                        <p>Whether you&apos;re a seasoned chef or a beginner in the kitchen, Turbokokona welcomes you to embark on a culinary journey filled with innovation and flavor. Experience the future of cooking with us, and let your culinary adventures take flight.</p>
                    </div>
                  </div>
                  <Footer />
              </div>
          </main>
      </>
  );
};

export default About;
