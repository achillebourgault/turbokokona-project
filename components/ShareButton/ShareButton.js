import styles from "./ShareButton.module.css";

export default function ShareButton({ url, title, text }) {
    const share = async () => {
        try {
            if (navigator.share)
                await navigator.share({ url, title, text });
            else
                alert("Your navigator doesn't support Sharing API");
        } catch (error) {
            console.error("Error sharing:", error, " Could be that the browser doesn't support Sharing without HTTPS protocol.");
        }
    };

    return (
        <button className={styles.shareBtn} onClick={share}>
            Share
        </button>
    );
}
