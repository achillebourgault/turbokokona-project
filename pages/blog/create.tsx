import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import { auth, provider } from "../../firebase.js";
import styles from '../../styles/CreateRecipe.module.css';
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import {onAuthStateChanged} from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Create = () => {
    const [inputTitle, setInputTitle] = useState("");
    const [inputDescription, setInputDescription] = useState("");
    const [inputCookingTime, setInputCookingTime] = useState("");
    const [inputPreparationTime, setInputPreparationTime] = useState("");
    const [inputImages, setInputImages] = useState("");
    const [images, setImages] = useState([]);
    const [inputIngredients, setInputIngredients] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [inputSteps, setInputSteps] = useState("");
    const [steps, setSteps] = useState([]);
    const router = useRouter();
    const [error, setError] = useState(null);
    const [uid, setUid] = useState("");

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUid(user.uid);
            } else {
            }
        });
    }, [])

    const onFormSubmit = async (event) => {
        setError(null);
        event.preventDefault();
        console.log("test")
        await fetch('/api/recipes/add', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                uid: uid,
                title: inputTitle,
                description: inputDescription,
                cookingTime: inputCookingTime,
                preparationTime: inputPreparationTime,
                images: images,
                ingredients: ingredients,
                steps: steps
            })
        }).then(async (res) => {
            if (res.status === 200 || res.status === 201) {
                console.log('recipe sent')
            } else {
                console.log("status: ", res.status)
                setError("An error occured while creating the Recipe")
            }
        }).catch((error) => {
            console.log(error)
            toast.info("You are currently offline, the website will be updated when you come back online")
            console.log("notified")
        }) 
    };

    const confirmImage = () => {
        setImages(images  => [...images, inputImages])
        setInputImages("")
    }
    const confirmIngredient = () => {
        setIngredients(ingredients  => [...ingredients, inputIngredients])
        setInputIngredients("")
    }

    const confirmStep = () => {
        setSteps(steps  => [...steps, inputSteps])
        setInputSteps("")
    }

    return (uid ?
        <>
            <NavBar/>
            <ToastContainer />
            <div className={styles.content}>
                <div className={styles.titleBox}>
                    <h2 className={styles.subtitle}>Turbokokona</h2>
                    <h1 className={styles.title}>Create a recipe</h1>
                </div>
                <div className={styles.description}>
                    Indicate recipe informations and choose whether or not you want to be notified when someone liked your recipe.
                </div>
            </div>
            <div className={styles.customContainer}>


                <div className={styles.customForm}>
                    <h2>Recipe Informations</h2>
                    <form onSubmit={onFormSubmit}>
                        {error && <div className={styles.danger}>{/*error*/}</div>}
                        <div className={styles.formGroup}>
                            <label htmlFor="loginEmail">Title</label>
                            <input
                                type="text"
                                value={inputTitle}
                                onChange={(event) => setInputTitle(event.target.value)}
                                name="inputTitle"
                                id="inputTitle"
                                placeholder="Title"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="loginEmail">Description</label>
                            <input
                                type="text"
                                value={inputDescription}
                                onChange={(event) => setInputDescription(event.target.value)}
                                name="inputDescription"
                                id="inputDescription"
                                placeholder="Description"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="loginEmail">Cooking Time</label>
                            <input
                                type="number"
                                value={inputCookingTime}
                                onChange={(event) => setInputCookingTime(event.target.value)}
                                name="inputCookingTime"
                                id="inputCookingTime"
                                placeholder="Cooking Time (minutes)"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="loginEmail">Preparation Time</label>
                            <input
                                type="number"
                                value={inputPreparationTime}
                                onChange={(event) => setInputPreparationTime(event.target.value)}
                                name="inputPreparationTime"
                                id="inputPreparationTime"
                                placeholder="Preparation Time (minutes)"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="loginEmail">Images</label>
                            {images && images.map((image) => {return (<div key={image}>{image}</div>)})}
                            <input
                                type="text"
                                value={inputImages}
                                onChange={(event) => setInputImages(event.target.value)}
                                name="inputImages"
                                id="inputImages"
                                placeholder="Image link"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <button type="button" className={styles.button} onClick={() => confirmImage()} >Add</button>
                        </div>
                        <h2>Recipe Ingredients</h2>
                        
                        <div className={styles.formGroup}>
                            <label htmlFor="loginEmail">Ingredient</label>
                            {ingredients && ingredients.map((ingredient) => {return (<div key={ingredient}>{ingredient}</div>)})}
                            <input
                                type="text"
                                value={inputIngredients}
                                onChange={(event) => setInputIngredients(event.target.value)}
                                name="inputIngredients"
                                id="inputIngredients"
                                placeholder="Ingredient"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <button type="button" className={styles.button} onClick={() => confirmIngredient()}>Add</button>
                        </div>
                        <h2>Recipe Steps</h2>
                        <div className={styles.formGroup}>
                            <label htmlFor="loginEmail">Step</label>
                            {steps && steps.map((step) => {return (<div key={step}>{step}</div>)})}
                            <input
                                type="text"
                                value={inputSteps}
                                onChange={(event) => setInputSteps(event.target.value)}
                                name="inputSteps"
                                id="inputSteps"
                                placeholder="Step"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <button type="button" className={styles.button} onClick={() => confirmStep()}>Add</button>
                        </div>
                        <p></p>
                        <div className={styles.formGroup}>
                            <a className={styles.submitButton} type="button" href={"/recipe/create"}>Reset form</a>
                        </div>
                        <div className={styles.formGroup}>
                            <button className={styles.submitButton} type="submit">Publish</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer/>
        </> : <></>
    );
};

export default Create;
