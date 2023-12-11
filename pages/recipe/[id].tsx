import type {NextPage} from "next";
import Image from "next/image";
import styles from "../../styles/Posts.module.css";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import React, {useEffect, useState} from "react";
import ComputerParts from "../../BlogData.json";
import {useRouter} from "next/router";
import Link from "next/link";
import {BiAlarmAdd, BiCart, BiHeart, BiSolidHeart, BiTrash} from "react-icons/bi";

import {Helmet} from "react-helmet";
import Head from "next/head";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../../firebase";
import {ToastContainer, toast} from "react-toastify";
import ShareButton from "../../components/ShareButton/ShareButton";
import 'react-toastify/dist/ReactToastify.css';

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
    const [uid, setUid] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [postId, setPostId] = useState("");

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
                setPostId(data.id);
              })
              .catch((error) => {
                console.error('Error fetching post data:', error);
                router.push("/blog")
              });
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
                console.log("user is logged out")
            }
        });
    }, [router.query.id]);

    useEffect(() => {
        checkFavorite();
    }, [post, uid]);

    const checkFavorite = () => {
        if (post !== null && uid !== "") {
            setIsFavorite(post.followers?.includes(uid));
        }
    };

    const makeFavorite = () => {
        console.log("MAKE FAVORITE")
        fetch('/api/recipes/fav', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                uid: uid,
                recipeId: postId,
                recipeAuthor: post?.author,
                recipeName: post?.name
            })
        }).then(async (res) => {
            if (res.status === 200 || res.status === 201) {
                console.log('recipe favorited')
                setIsFavorite(true)
            } else {
                console.log("status: ", res.status)
            }
            return res.json();
        }).catch((error) => {
            console.log(error)
            toast.info("You are currently offline, the website will be updated when you come back online")
            console.log("notified")
        })
    };

    const removeFavorite = () => {
        console.log("REMOVE FAVORITE")
        fetch('/api/recipes/unfav', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                uid: uid,
                recipeId: postId
            })
        }).then(async (res) => {
            if (res.status === 200 || res.status === 201) {
                console.log('recipe no longer favorite')
                setIsFavorite(false)
            } else {
                console.log("status: ", res.status)
            }
            return res.json();
        }).catch((error) => {
            console.log(error)
            toast.info("You are currently offline, the website will be updated when you come back online")
            console.log("notified")
        })
    };

    const deleteRecipe = () => {
        console.log("DELETE RECIPE")
        fetch('/api/recipes/delete', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                uid: uid,
                recipeId: postId,
            })
        }).then(async (res) => {
            const resJson = await res.json();
            console.table(resJson.headersTest);
            if (res.status === 200 || res.status === 201) {
                console.log('recipe deleted')
            } else {
                console.log("status: ", res.status)
            }
            router.push("/blog")
            return resJson;
        }).catch((error) => {
            console.log(error)
            toast.info("You are currently offline, the website will be updated when you come back online")
            console.log("notified")
        })
    };
    
    const editbutton = () => {
        if (!loggedIn) {
            return (
                <></>
            )
        }
        else if (uid === post?.author) {
            return (
                <div>
                    {/*<button onClick={() => {}}>Edit</button>*/}
                    <button className={styles.trashButton} onClick={() => {deleteRecipe()}}><BiTrash size={30} /></button>
                </div>
            )
        } else {
            return (isFavorite ?
                <button className={styles.unFavButton} onClick={() => {removeFavorite()}}><BiSolidHeart size={30} /></button>
            :
                <button className={styles.favButton} onClick={() => {makeFavorite()}}><BiHeart size={30} /></button>
            )
        }
    }

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
                    <ToastContainer />

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
                            <div className={styles.productTopInfos}>
                                <div className={styles.productTitles}>
                                    <h3 className={styles.name}>{post?.name}</h3>
                                    <span className={styles.author}>Posted by {post?.author}</span>
                                </div>
                                <div className={styles.productTopFavoriteSection}>
                                    {editbutton()}
                                </div>
                            </div>

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
                                <div className={styles.productCustomersDataReview}>
                                    {post?.type === "recipe" ? 
                                        post?.followers.length + " people loved this" 
                                        :
                                        post?.followers.length + " people clapped this"}
                                </div>
                            </div>

                            <p className={styles.productContentSectionDetailsText}>
                                {post?.description}
                            </p>

                            <p className={styles.productContentSectionDetailsTitle}>
                                {post?.type === "recipe" ? "Preparation time:" : "Read time:"}
                                <span className={styles.productContentSectionDetailsText}>
                            {post?.preparationTime}min
                        </span>
                            </p>

                            {post?.type === "recipe" ? <p className={styles.productContentSectionDetailsTitle}>
                                Cooking time:
                                <span className={styles.productContentSectionDetailsText}>
                            {post?.cookingTime}min
                        </span>
                            </p> : <></>}

                            <div className={styles.productMetaData}>
                                <div className={styles.metadata}>
                                    <ShareButton title={"turbokokona.com"} text={post?.name} url={`https://turbokokona.com/recipe/${id}`} />
                                    
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
