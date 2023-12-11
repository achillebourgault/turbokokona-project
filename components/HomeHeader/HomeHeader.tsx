import styles from "./HomeHeader.module.css";

import React from "react";
import Button from "../Button/Button";
import {BiDownArrow} from "react-icons/bi";
import IconButton from "../IconButton/IconButton";
import { useRouter } from "next/router";

const HomeHeader = () => {
    const router = useRouter();
    return (
        <div className={styles.header}>
            <div className={styles.title}>
                <span>New</span> <h1><span>Honokokona</span> <br/> <span>Cooking</span> <span>Device</span></h1>
                <p>By Turbokokona</p>
            </div>
            <div className={styles.cta}>
                <IconButton href={"/product/1"}>
                    Discover
                </IconButton>
            </div>
        </div>
    )
};

export default HomeHeader;
