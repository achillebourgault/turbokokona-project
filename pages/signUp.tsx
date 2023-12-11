import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "../firebase.js";
import styles from '../styles/SignUp.module.css';
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";



const SignUp = () => {
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState(null);
  const [uid, setUid] = useState("");
  //
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [subscription, setSubscription] = useState(null)
  const [registration, setRegistration] = useState(null)


  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // run only in browser
      navigator.serviceWorker.ready.then(reg => {
        reg.pushManager.getSubscription().then(sub => {
          if (sub && !(sub.expirationTime && Date.now() > sub.expirationTime - 5 * 60 * 1000)) {
            setSubscription(sub)
            setIsSubscribed(true)
          }
        })
        setRegistration(reg)
      })
    }
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUid(user.uid);

      } else {
        // User is signed out
        // ...
      }
    });
  }, [])

  const sendNotificationButtonOnClick = async event => {
    event.preventDefault()
    if (subscription == null) {
      console.error('web push not subscribed')
      return
    }

    await fetch('/api/notification/sendNotification', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        uid: uid
      })
    })
  }


  const onSignUpSubmit = (event) => {
    setError(null);
    if (passwordOne === passwordTwo) {
      createUserWithEmailAndPassword(auth, email, passwordOne)
          .then(async authUser => {
            console.log("Success. The user is created in Firebase");
            const res = await fetch("/api/login", {
              method: 'POST',
              headers: {
                'Content-type': 'application/json'
              },
              body: JSON.stringify({
                uid: authUser.user.uid
              })
            })
            const token = await res.json();
            localStorage.setItem("token", token.token);
            router.push("/");
          })
          .catch(error => {
            setError(error.message);
          });
    } else {
      setError("Passwords do not match");
    }
    event.preventDefault();
  };

  const onLoginSubmit = (event) => {
    setError(null);
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        .then(async authUser => {
          const res = await fetch("/api/login", {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
              uid: authUser.user.uid
            })
          })
          const token = await res.json();
          localStorage.setItem("token", token.token);
          console.log("Success. The user is logged in");
          router.push("/");
        })
        .catch(error => {
          setError(error.message);
        });
    event.preventDefault();
  };

  const loginWithGoogle = () => {
    signInWithPopup(auth, provider).then(async authUser => {
      const res = await fetch("/api/login", {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          uid: authUser.user.uid
        })
      })
      const token = await res.json();
      localStorage.setItem("token", token.token);
      router.push("/");
    })
    .catch(error => {
      console.log(error.message);
    })
  }

  return (
      <>
        <NavBar/>
        <div className={styles.customContainer}>

          
          <div className={styles.customForm}>
            <form onSubmit={onLoginSubmit}>
              {error && <div className={styles.danger}>{error}</div>}
              <div className={styles.formGroup}>
                <label htmlFor="loginEmail">Email</label>
                <input
                    type="email"
                    value={loginEmail}
                    onChange={(event) => setLoginEmail(event.target.value)}
                    name="loginEmail"
                    id="loginEmail"
                    placeholder="Email"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="loginPassword">Password</label>
                <input
                    type="password"
                    name="loginPassword"
                    value={loginPassword}
                    onChange={(event) => setLoginPassword(event.target.value)}
                    id="loginPassword"
                    placeholder="Password"
                />
              </div>
              <div className={styles.formGroup}>
                <button type="submit">Log In</button>
                <button onClick={() => loginWithGoogle()}>Log In With google</button>
              </div>
            </form>
          </div>

            <div className={styles.customForm}>
                <form onSubmit={onSignUpSubmit}>
                    {error && <div className={styles.danger}>{error}</div>}
                    <div className={styles.formGroup}>
                        <label htmlFor="signUpEmail">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            name="email"
                            id="signUpEmail"
                            placeholder="Email"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="signUpPassword">Password</label>
                        <input
                            type="password"
                            name="passwordOne"
                            value={passwordOne}
                            onChange={(event) => setPasswordOne(event.target.value)}
                            id="signUpPassword"
                            placeholder="Password"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="signUpPassword2">Confirm Password</label>
                        <input
                            type="password"
                            name="passwordTwo"
                            value={passwordTwo}
                            onChange={(event) => setPasswordTwo(event.target.value)}
                            id="signUpPassword2"
                            placeholder="Password"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <button type="submit">Sign Up</button>
                    </div>
                </form>
            </div>
            
        </div>
          
        <Footer/>
      </>
  );
};

export default SignUp;
