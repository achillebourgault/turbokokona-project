import styles from '../styles/Fallback.module.css';
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, {useEffect} from "react";
import { useRouter } from 'next/router';

const Fallback = () => {
    const router = useRouter();

    useEffect(() => {
        if (navigator.onLine) {
            router.push("/")
        }
    }, [])

    return (
        <>
            <NavBar/>
            <ToastContainer />
            <div className={styles.content}>
                <div className={styles.titleBox}>
                    <h2 className={styles.subtitle}>Turbokokona</h2>
                    <h1 className={styles.title}>Fallback page</h1>
                </div>
                <div className={styles.description}>
                    This is a fallback page, you arrived here because you&apos;re trying to access content without an Internet connection.
                </div>
            </div>
            <div className={styles.connectSection}>
                <div className={styles.connectText}>You&apos;ll be redirected to the Homepage when the problem is solved.</div>
            </div>
            <Footer/>
        </>
    );
};

export default Fallback;
