import type { NextPage, GetServerSideProps } from "next";
import Image from "next/image";
import styles from "../../styles/Product.module.css";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import React, { useState } from "react";
import ComputerParts from "../../ComputerParts.json";
import { useRouter } from "next/router";

import { Helmet } from "react-helmet";
import Head from "next/head";
import ShareButton from "../../components/ShareButton/ShareButton";

// @ts-ignore
const getProductById = (id) => {
    return ComputerParts.phone.find(product => product.id === parseInt(id));
};
const addToCart = (product: any, qty: number) => {
    if (typeof window !== "undefined") {
        if (
            window.localStorage.getItem("cart") &&
            window.localStorage.getItem("cart") !== null &&
            window.localStorage.getItem("cart") !== undefined
        ) {
            //Cart update
            let products = window.localStorage.getItem("cart") as any;

            const tmpProducts = JSON.parse(products);
            let isIncreased = false;
            //Increase quantity
            tmpProducts.map((tmp: any) => {
                if (tmp.id === product.id) {
                    tmp.quantity += qty;
                    isIncreased = true;
                }
            });
            if (!isIncreased) tmpProducts.push({ id: product.id, quantity: qty });
            window.localStorage.setItem("cart", JSON.stringify(tmpProducts));
        } else {
            //New cart
            window.localStorage.setItem(
                "cart",
                JSON.stringify([{ id: product.id, quantity: 1 }])
            );
        }
        alert("Add " + product.name + "[" + product.id + "] to cart.");
    }
};

interface ProductProps {
    product: any;
}

// @ts-ignore
const Product: NextPage<ProductProps> = ({ product }) => {
    const router = useRouter();
    const { id } = router.query;
    const [quantity, setQuantity] = useState(1);
    const [viewMore, setViewMore] = React.useState(4);

    return (
        <>
            <Head>
                <title>
                    {product?.name ? `${product?.name} - Turbokokona` : 'Turbokokona'}
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

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "http://schema.org",
                        "@type": "Product",
                        "name": product?.name,
                        "description": product?.description,
                        "image": product?.image_url,
                        "sku": "SS001",
                        "brand": {
                            "@type": "Brand",
                            "name": "Turbokokona"
                        },
                        "offers": {
                            "@type": "Offer",
                            "price": product?.price,
                            "priceCurrency": "USD",
                            "availability": "http://schema.org/InStock"
                        }
                    })}
                </script>
            </Head>
            <main>
                <div className={styles.container}>
                    <NavBar />

                    <Helmet>
                        <title>
                            {product?.name ? `${product?.name} - Turbokokona` : 'Turbokokona'}
                        </title>
                        <script type="application/ld+json">
                            {JSON.stringify({
                                "@context": "http://schema.org",
                                "@type": "Product",
                                "name": product?.name,
                                "description": product?.description,
                                "image": product?.image_url,
                                "sku": "SS001",
                                "brand": {
                                    "@type": "Brand",
                                    "name": "Turbokokona"
                                },
                                "offers": {
                                    "@type": "Offer",
                                    "price": product?.price,
                                    "priceCurrency": "USD",
                                    "availability": "http://schema.org/InStock"
                                }
                            })}
                        </script>
                    </Helmet>

                    <div className={styles.headerBreadcrumb}>
                        <p>
          <span className={styles.headerBreadCrumbNav}>
            <a href={"/"}>Home</a>
            <span>{">"}</span>
            <a href={"/products"}>Shop</a>
            <span>{">"}</span>
          </span>
                            {product?.name}
                        </p>
                    </div>

                    <div className={styles.productContent}>
                        <div className={styles.productContentImageSection}>
                            {product?.image_url ? (
                                <Image
                                    src={product?.image_url}
                                    height={360}
                                    width={360}
                                    className={styles.productImage}
                                    alt={product?.alt}
                                />
                            ) : (
                                <div />
                            )}
                        </div>
                        <div className={styles.productContentSection}>
                            <h3>{product?.name}</h3>
                            <span>{product?.currency !== "USD" ? "€" : "$"}
                                {product?.price}</span>
                            <div className={styles.productCustomersData}>
                                <div className={styles.productCustomersDataRating}>
                                </div>
                                <a href={"#"} className={styles.productCustomersDataReview}>
                                    61 Customer Reviews
                                </a>
                            </div>

                            <p className={styles.productContentSectionDetailsText}>
                                {product?.description}
                            </p>

                            <p className={styles.productContentSectionDetailsTitle}>
                                Included:
                                <span className={styles.productContentSectionDetailsText}>
              Turbokokona Classic Toolset
            </span>
                            </p>

                            <div className={styles.productContentSectionDetails}>
                                <p className={styles.productContentSectionDetailsTitle}>Color</p>
                                <div className={styles.inputColorSection}>
                                    <div className={styles.color1} />
                                    <div className={styles.color2} />
                                    <div className={styles.color3} />
                                </div>
                            </div>

                            <div className={styles.productMetaData}>
                                <div className={styles.metadata}>
                                    <ShareButton title={"turbokokona.com"} text={product.name} url={`https://turbokokona.com/product/${product.id}`} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.productInfo}>
                        <div>
                            <h1>The World of Turbokokona Cooking Devices</h1>
                            <p>Welcome to the culinary revolution where innovation meets culinary artistry. In this comprehensive guide, we delve deep into the world of Turbokokona cooking devices, showcasing the exquisite range of options that redefine cooking technology.</p>
                            <h2>Turbokokona Classic: A Timeless Icon</h2>
                            <p>The Turbokokona Classic is the embodiment of timeless culinary craftsmanship. This iconic device seamlessly blends tradition and innovation, offering a wide array of features to enhance your cooking experience. From precision cooking to elegant design, it&apos;s the choice of seasoned chefs and home cooks alike.</p>

                            <h2>Turbokokona Maxi: Power Meets Capacity</h2>
                            <p>When your culinary ambitions call for more, the Turbokokona Maxi answers. With its impressive capacity and high-performance features, this cooking device is perfect for culinary enthusiasts who enjoy preparing larger meals. Explore its capabilities and elevate your cooking to a whole new level.</p>

                            <h2>Turbokokona Entry Edition: Begin Your Culinary Journey</h2>
                            <p>For those new to the world of Turbokokona, the Entry Edition is the ideal starting point. Designed with user-friendliness and affordability in mind, it simplifies the cooking process and introduces you to the magic of Turbokokona. Start your culinary journey with this entry-level gem.</p>

                            <h2>Nuclear Turbokokona: Unleash Culinary Excellence</h2>
                            <p>The Nuclear Turbokokona is a powerhouse of culinary innovation. Engineered to conquer the most demanding cooking challenges, this high-performance device offers unmatched power and precision. Explore how it transforms every dish into a culinary masterpiece.</p>

                            <p>Whichever Turbokokona cooking device you choose, you&apos;re embarking on a journey of culinary discovery. Each device is a testament to excellence, innovation, and a commitment to making cooking a delightful experience. Find the perfect Turbokokona that suits your culinary aspirations and elevate your cooking to new heights.</p>
                        </div>

                    </div>

                    <Footer />
                </div>
            </main>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;
    const product = getProductById(id);

    return {
        props: {
            product,
        },
    };
};

export default Product;
