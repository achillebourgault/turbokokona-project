import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Blog.module.css";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import React, {useState, useEffect} from "react";
import ComputerParts from "../../BlogData.json";
import shop_banner from "../public/shop_banner.svg";
import Header from "../../components/Header/Header";
import Link from "next/link";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../../firebase";

const Blog: NextPage = () => {
    const [posts, setPosts] = useState(null);
    const [inputPrepTime, setInputPrepTime] = useState(100);
    const [inputCookingTime, setInputCookingTime] = useState(100);
    const [inputShowFav, setInputShowFav] = useState(false);
    let allPosts = []
    let fetching = false;
    const [uid, setUid] = useState("");

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUid(user.uid);
            } else {
            }
        });
    }, [])

    useEffect(() => {
        if (fetching === false) {
            fetching = true;
            fetch('/api/recipes/get/all', {
                headers: {
                    'apiKey': 'tets'
                }
                }
                )
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                allPosts.push(...data);
                fetch('/api/blogs/get/all')
                .then((response) => {
                    if (!response.ok) {
                    throw new Error('Network response was not ok');
                    }
                    //allPosts
                    return response.json();
                })
                .then((data) => {
                    allPosts.push(...data);
                    allPosts.sort(function(a, b) {
                        return b.data.date - a.data.date;
                    })
                    //console.log(allPosts);
    
                    setPosts(allPosts);
                })
                .catch((error) => {
                    console.error('Error fetching blogs:', error);
                });
    
    
            })
            .catch((error) => {
                console.error('Error fetching recipes:', error);
            });
        }
      }, []);
    
    const handleChange = (event) => {
        let value = event.target.value
        setInputPrepTime(value)
    }

    const handleChangeCook = (event) => {
        let value = event.target.value
        setInputCookingTime(value)
    }

    const handleChangeFav = (e) => {
        const { checked } = e.target
        setInputShowFav(checked)
    }

    return (
        <>
            <Head>
                <title>
                    Honokokona Recipes - Turbokokona Blog
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
                            <h1 className={styles.title}>Blog & Recipes</h1>
                        </div>
                        <div className={styles.description}>
                            Find our latest posts related to the best Honokokona cooking device.
                        </div>
                    </div>
                    
                    <div className={styles.createSection}>
                        <div className={styles.filterBox}>
                            <div className={styles.createSign}>Max Preparation Time</div>
                            <input type="range" value={inputPrepTime} min="0" max="100" onInput={(event) => {handleChange(event)}}/>
                            <output id="rangevalue">{inputPrepTime}mn</output>
                        </div>
                        <div className={styles.filterBox}>
                            <div className={styles.createSign}>Max Cooking Time</div>
                            <input type="range" value={inputCookingTime} min="0" max="100" onInput={(event) => {handleChangeCook(event)}}/>
                            <output id="rangevalue">{inputCookingTime}mn</output>
                        </div>
                        {uid ? <div className={styles.filterBox}>
                            <div className={styles.createSign}>Show favorites only</div>
                            <input type="checkbox" id={"inputFav"} onChange={(event) => {
                                handleChangeFav(event)
                            }}/>
                        </div> : null}
                        <div className={styles.createBox}>
                            <div className={styles.createSign}>+</div>
                            <a className={styles.createText} href={"/recipe/create"}>Create your recipe</a>
                        </div>
                    </div>

                    <div className={styles.shopGridWrapper}>
                        <div className={styles.shopGrid}>
                            { posts !== null ? (
                            posts.map((item) => {
                                const data = item.data;
                                let filters = (data.preparationTime < inputPrepTime && data.cookingTime < inputCookingTime)
                                let favFilter = true
                                if (inputShowFav) {
                                    data.followers?.includes(uid) ? favFilter = true : favFilter = false
                                }
                                return (filters && favFilter ?
                                    <a
                                        key={item.id}
                                        href={`/${data.type}/${item.id}`}
                                    >
                                        <div className={styles.productBox}>
                                            <div className={styles.productType}>
                                                {data.type}
                                            </div>
                                            <div className={styles.productImage}>
                                                <Image
                                                    alt={data?.alt}
                                                    src={data.images[0] ? (data.images[0]) : ("")}
                                                    height={300}
                                                    width={300}
                                                />
                                            </div>
                                            <div className={styles.productTitleBox}>
                                                <span>{data.name}</span>
                                                <span className={styles.author}>
                                                    Author: {data.author}
                                                </span>
                                            </div>

                                        </div>
                                    </a> : null
                                )
                            })
                        ) : (
                            <p>No posts available</p>
                        )}

                        </div>

                        
                    </div>

                    <Footer />
                </div>
            </main>
        </>
    );
};

export default Blog;
