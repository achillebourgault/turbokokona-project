import type {NextPage} from "next";
import Image from "next/image";
import styles from "../../styles/Posts.module.css";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import React, {useEffect, useState} from "react";
import ComputerParts from "../../BlogData.json";
import {useRouter} from "next/router";
import Link from "next/link";

import {Helmet} from "react-helmet";
import Head from "next/head";

// @ts-ignore
const getProductById = (id) => {
    return ComputerParts.posts.find(product => product.id === parseInt(id));
};

// @ts-ignore
const Blog: NextPage = () => {
    const router = useRouter();
    const { id } = router.query; // Ici, nous extrayons l'ID de l'URL
    const product = getProductById(id);
    const [viewMore, setViewMore] = React.useState(4);
    const [post, setPost] = useState(null);

    useEffect(() => {
        if (router.query.id) {
            fetch('/api/recipes/get/' + router.query.id)
            .then((response) => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.json();
              })
              .then((data) => {
                setPost(data.data);
              })
              .catch((error) => {
                console.error('Error fetching post data:', error);
              });
        }
    }, [router.query.id]);

    return (
        <>
            <Head>
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

                    <Helmet>
                        <title>
                            {product?.title ? `${product?.title} - Turbokokona Recipes` : 'Turbokokona Recipes'}
                        </title>
                        <script type="application/ld+json">
                            {JSON.stringify(
                                {
                                    "@context": "https://schema.org/",
                                    "@type": "Recipe",
                                    "name": product?.title,
                                    "image": [
                                        product?.image_url
                                    ],
                                    "author": {
                                        "@type": "Person",
                                        "name": product?.author
                                    },
                                    "datePublished": "2018-03-10",
                                    "description": product?.description,
                                    "recipeCuisine": "American",
                                    "prepTime": "PT1M",
                                    "cookTime": "PT2M",
                                    "totalTime": "PT3M",
                                    "keywords": "Honokokona, Honokokona Cooking Device, Turbokokona, cooking device, cooking, device, Turbokokona Honokokona, Turbokokona cooking device Honokokona",
                                    "recipeYield": "1 serving",
                                    "recipeCategory": "Drink",
                                    "nutrition": {
                                        "@type": "NutritionInformation",
                                        "calories": "120 calories"
                                    },
                                    "aggregateRating": {
                                        "@type": "AggregateRating",
                                        "ratingValue": "5",
                                        "ratingCount": "18"
                                    },
                                    "recipeIngredient": [
                                        "1 cup dried Honokokona spice pods",
                                        "1 teaspoon cumin seeds",
                                        "1 teaspoon coriander seeds",
                                        "2-3 dried red chilies (adjust to your preferred level of spiciness)"
                                    ],
                                    "recipeInstructions": [
                                        {
                                            "@type": "HowToStep",
                                            "text": "Begin by ensuring the Honokokona spice pods are thoroughly dried. You can sun-dry them or use a food dehydrator to remove any moisture."
                                        },
                                        {
                                            "@type": "HowToStep",
                                            "text": "In a dry, heated skillet, add cumin seeds, coriander seeds, black peppercorns, dried red chilies, cinnamon stick, green cardamom pods, cloves, and the bay leaf. Toast the spices over medium heat for a few minutes until they become fragrant. Stir frequently to prevent burning."
                                        },
                                        {
                                            "@type": "HowToStep",
                                            "text": "Allow the toasted spices to cool for a moment. In a spice grinder or a mortar and pestle, grind the toasted spices into a fine powder."
                                        }
                                    ],
                                    "video": {
                                        "@type": "VideoObject",
                                        "name": "How to make a Party Coffee Cake",
                                        "description": "This is how you make a Party Coffee Cake.",
                                        "thumbnailUrl": [
                                            product?.image_url
                                        ],
                                        "contentUrl": "https://www.example.com/video123.mp4",
                                        "embedUrl": "https://www.example.com/videoplayer?video=123",
                                        "uploadDate": "2018-02-05T08:00:00+08:00",
                                        "duration": "PT1M33S",
                                        "interactionStatistic": {
                                            "@type": "InteractionCounter",
                                            "interactionType": { "@type": "WatchAction" },
                                            "userInteractionCount": 2347
                                        },
                                        "expires": "2024-02-05T08:00:00+08:00"
                                    }
                                }
                            )}
                        </script>
                    </Helmet>

                    <div className={styles.headerBreadcrumb}>
                        <p>
                  <span className={styles.headerBreadCrumbNav}>
                    <a href={"/"}>Home</a>
                    <span>{">"}</span>
                    <a href={"/blog"}>Blog & Recipes</a>
                    <span>{">"}</span>
                  </span>
                            {post?.name}
                        </p>
                    </div>

                    <div className={styles.productContent}>
                        <div className={styles.productContentImageSection}>
                            {post?.images[0] ? (
                                <Image
                                    src={post?.images[0]}
                                    height={240}
                                    width={240}
                                    className={styles.productImage}
                                    alt={post?.alt}
                                />
                            ) : (
                                <div />
                            )}
                        </div>
                        <div className={styles.productContentSection}>
                            <h3>{post?.name}</h3>
                            <span>Posted by {post?.author}</span>
                            <div className={styles.productCustomersData}>
                                <div className={styles.productCustomersDataRating}>
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M10 1L13 7L19 7.75L14.88 12.37L16 19L10 16L4 19L5.13 12.37L1 7.75L7 7L10 1Z"
                                            fill="#FFDA5B"
                                        />
                                    </svg>
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M10 1L13 7L19 7.75L14.88 12.37L16 19L10 16L4 19L5.13 12.37L1 7.75L7 7L10 1Z"
                                            fill="#FFDA5B"
                                        />
                                    </svg>
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M10 1L13 7L19 7.75L14.88 12.37L16 19L10 16L4 19L5.13 12.37L1 7.75L7 7L10 1Z"
                                            fill="#FFDA5B"
                                        />
                                    </svg>
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M10 1L13 7L19 7.75L14.88 12.37L16 19L10 16L4 19L5.13 12.37L1 7.75L7 7L10 1Z"
                                            fill="#FFDA5B"
                                        />
                                    </svg>
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M7.1563 7.0125L0.800049 7.9375L5.40005 12.4188L4.31255 18.75L10 15.7625V1.25L7.1563 7.0125Z"
                                            fill="#FFDA5B"
                                        />
                                    </svg>
                                </div>
                                <a href={"#"} className={styles.productCustomersDataReview}>
                                    {post?.type === "Recipe" ? "5 people tried this" : "5 people clapped this"}
                                </a>
                            </div>

                            <p className={styles.productContentSectionDetailsText}>
                                {post?.description}
                            </p>

                            <p className={styles.productContentSectionDetailsTitle}>
                                Type:
                                <span className={styles.productContentSectionDetailsText}>
                            {post?.type}
                        </span>
                            </p>

                            <p className={styles.productContentSectionDetailsTitle}>
                                {post?.type === "Recipe" ? "Preparation time:" : "Read time:"}
                                <span className={styles.productContentSectionDetailsText}>
                            3min
                        </span>
                            </p>

                            <div className={styles.productMetaData}>
                                <div className={styles.metadata}>
                                    <span>Share</span>
                                    <div style={{ display: "flex", gap: 14 }}>
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g clipPath="url(#clip0_39_178)">
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M0 10.0558C0 15.0275 3.61083 19.1617 8.33333 20V12.7775H5.83333V10H8.33333V7.7775C8.33333 5.2775 9.94417 3.88917 12.2225 3.88917C12.9442 3.88917 13.7225 4 14.4442 4.11083V6.66667H13.1667C11.9442 6.66667 11.6667 7.2775 11.6667 8.05583V10H14.3333L13.8892 12.7775H11.6667V20C16.3892 19.1617 20 15.0283 20 10.0558C20 4.525 15.5 0 10 0C4.5 0 0 4.525 0 10.0558Z"
                                                    fill="black"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_39_178">
                                                    <rect width="20" height="20" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g clipPath="url(#clip0_39_182)">
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M0.833252 2.36501C0.833252 1.95879 0.994624 1.5692 1.28187 1.28196C1.56911 0.994717 1.9587 0.833346 2.36492 0.833346H17.6333C17.8346 0.833017 18.034 0.872398 18.22 0.949234C18.4061 1.02607 18.5752 1.13885 18.7176 1.28113C18.8601 1.4234 18.973 1.59237 19.0501 1.77835C19.1271 1.96434 19.1667 2.1637 19.1666 2.36501V17.6333C19.1668 17.8347 19.1273 18.0341 19.0504 18.2202C18.9735 18.4063 18.8606 18.5754 18.7183 18.7178C18.5759 18.8602 18.4069 18.9731 18.2209 19.0502C18.0348 19.1272 17.8354 19.1668 17.6341 19.1667H2.36492C2.16371 19.1667 1.96447 19.127 1.77858 19.05C1.5927 18.973 1.42381 18.8601 1.28157 18.7178C1.13933 18.5755 1.02653 18.4065 0.949604 18.2206C0.87268 18.0347 0.833143 17.8354 0.833252 17.6342V2.36501ZM8.08992 7.82335H10.5724V9.07001C10.9308 8.35335 11.8474 7.70835 13.2249 7.70835C15.8658 7.70835 16.4916 9.13585 16.4916 11.755V16.6067H13.8191V12.3517C13.8191 10.86 13.4608 10.0183 12.5508 10.0183C11.2883 10.0183 10.7633 10.9258 10.7633 12.3517V16.6067H8.08992V7.82335ZM3.50659 16.4925H6.17992V7.70835H3.50659V16.4917V16.4925ZM6.56242 4.84335C6.56746 5.07224 6.52673 5.29983 6.44262 5.51277C6.35851 5.72571 6.23271 5.91971 6.07261 6.08337C5.91251 6.24704 5.72133 6.37707 5.5103 6.46585C5.29926 6.55463 5.07262 6.60036 4.84367 6.60036C4.61472 6.60036 4.38808 6.55463 4.17704 6.46585C3.966 6.37707 3.77483 6.24704 3.61473 6.08337C3.45463 5.91971 3.32883 5.72571 3.24472 5.51277C3.16061 5.29983 3.11988 5.07224 3.12492 4.84335C3.13481 4.39406 3.32024 3.9665 3.64149 3.65225C3.96274 3.338 4.39427 3.16203 4.84367 3.16203C5.29307 3.16203 5.7246 3.338 6.04585 3.65225C6.3671 3.9665 6.55253 4.39406 6.56242 4.84335Z"
                                                    fill="black"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_39_182">
                                                    <rect width="20" height="20" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        <svg
                                            width="25"
                                            height="25"
                                            viewBox="0 0 25 25"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M12.5 1.5625C6.45996 1.5625 1.5625 6.45996 1.5625 12.5C1.5625 18.54 6.45996 23.4375 12.5 23.4375C18.54 23.4375 23.4375 18.54 23.4375 12.5C23.4375 6.45996 18.54 1.5625 12.5 1.5625ZM17.7563 9.80713C17.7637 9.92188 17.7637 10.0415 17.7637 10.1587C17.7637 13.7427 15.0342 17.8711 10.0464 17.8711C8.5083 17.8711 7.08252 17.4243 5.88135 16.6553C6.10107 16.6797 6.31104 16.6895 6.53565 16.6895C7.80518 16.6895 8.97217 16.2598 9.90234 15.5322C8.71094 15.5078 7.70996 14.7266 7.36816 13.6523C7.78564 13.7134 8.16162 13.7134 8.59131 13.6035C7.97785 13.4789 7.42645 13.1457 7.0308 12.6606C6.63515 12.1755 6.41964 11.5684 6.4209 10.9424V10.9082C6.77979 11.1108 7.20215 11.2354 7.64404 11.2524C7.27256 11.0049 6.96792 10.6695 6.75711 10.276C6.5463 9.88244 6.43585 9.443 6.43555 8.99658C6.43555 8.49121 6.56738 8.02979 6.8042 7.62939C7.48511 8.46762 8.33479 9.15318 9.29801 9.64152C10.2612 10.1299 11.3164 10.41 12.395 10.4639C12.0117 8.62061 13.3887 7.12891 15.0439 7.12891C15.8252 7.12891 16.5283 7.45605 17.0239 7.9834C17.6367 7.86865 18.2227 7.63916 18.7451 7.33154C18.5425 7.95898 18.1177 8.48877 17.5537 8.82324C18.1006 8.76465 18.6279 8.61328 19.1162 8.40088C18.7476 8.94287 18.2861 9.42383 17.7563 9.80713Z"
                                                fill="black"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.productInfo}>
                    {post !== null ? (
                        <div>
                            <h1>{post.name}</h1>
                            <h2>Ingredients:</h2>
                            <ul>
                            {post.ingredients.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                            </ul>
                            <h2>Instructions:</h2>
                            <ol>
                            {post.steps.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                            </ol>
                        </div>
                        ) : (
                        <div></div>
                        )}

                    </div>

                    <Footer />
                </div>
            </main>
        </>
    );
};

export default Blog;
