import styles from "./ValueBanner.module.css";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import IconButton from "../IconButton/IconButton";

const ValueBanner = () => {
    const router = useRouter();
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.subtitle}>Turbokokona</h2>
                <h3 className={styles.title}>Opens up a world of flavours</h3>
            </div>
            <div className={styles.content}>
                <div className={styles.valuesBox}>

                    <div className={styles.valueBox}>
                        <div className={styles.valueBoxHeader}>
                            <Image
                                alt={"Product Validation Mark"}
                                width={120}
                                height={120}
                                title="Product Validation Mark"
                                src={"https://media.vorwerk.com/is/image/vorwerk/int_vorwerk_icon_proven_quality:1x1?wid=133&hei=133&fmt=webp"}
                                className={styles.valueImage}/>
                            <div className={styles.valueTitle}>Time Saving</div>
                        </div>
                        <div className={styles.valueDescription}>
                            <ul>
                                <li>Plan your recipes</li>
                                <li>Generate shopping carts</li>
                                <li>Create personnalised lists based on your likings</li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.valueBox}>
                        <div className={styles.valueBoxHeader}>
                            <Image
                                alt={"Product Validation Mark"}
                                width={120}
                                height={120}
                                title="Product Validation Mark"
                                src={"https://media.vorwerk.com/is/image/vorwerk/int_vorwerk_icon_proven_quality:1x1?wid=133&hei=133&fmt=webp"}
                                className={styles.valueImage}/>
                            <div className={styles.valueTitle}>Over 9000 recipes</div>
                        </div>
                        <div className={styles.valueDescription}>
                            <ul>
                                <li>Innovative technologies like new cooking modes</li>
                                <li>18 different cooking modes and functions</li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.valueBox}>
                        <div className={styles.valueBoxHeader}>
                            <Image alt={"Product Validation Mark"}
                                   width={120}
                                   height={120}
                                   title="Product Validation Mark"
                                   src={"https://media.vorwerk.com/is/image/vorwerk/int_vorwerk_icon_proven_quality:1x1?wid=133&hei=133&fmt=webp"}
                                   className={styles.valueImage}/>
                            <div className={styles.valueTitle}>Impossible Failure</div>
                        </div>
                        <div className={styles.valueDescription}>
                            <ul>
                                <li>Guided cooking: Follow the steps written on thhe screen. Turbokokona will guide you
                                    step by step
                                </li>
                                <li>Video tutorials will guide you through your recipes</li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.valueBox}>
                        <div className={styles.valueBoxHeader}>
                            <Image
                                width={120}
                                height={120}
                                title="Product Validation Mark"
                                alt={"Product Validation Mark"}
                                src={"https://media.vorwerk.com/is/image/vorwerk/int_vorwerk_icon_proven_quality:1x1?wid=133&hei=133&fmt=webp"}
                                className={styles.valueImage}/>
                            <div className={styles.valueTitle}>Easy to use</div>
                        </div>
                        <div className={styles.valueDescription}>
                            <ul>
                                <li>Big touchscreen</li>
                                <li>Easy to lean with an auto-cleaning mode</li>
                                <li>4 simple buttons</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                    <IconButton href={"/products"}>
                        Get your Honokokona Cooker
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

export default ValueBanner;
