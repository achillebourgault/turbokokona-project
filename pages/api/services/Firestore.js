import { firestore } from "./FirebaseAdmin";
import { deleteDoc, doc, setDoc, getDoc } from "firebase/firestore"; 

/*
    * Returns all documents in the given collection.
    * @param {string} collectionName - The name of the collection to query.
    * @returns {array} All documents in the given collection.
 */
export async function getAllDocumentsInCollection(collectionName) {
    try {
        const collectionRef = firestore.collection(collectionName);
        const snapshot = await collectionRef.get();
        const documents = [];

        snapshot.forEach((doc) => {
            documents.push({id: doc.id, data: doc.data()});
        });
        return documents;
    } catch (error) {
        console.error('(getAllDocumentsInCollection) Error fetching documents:', error);
        return [];
    }
}

/*
    * Returns the document with the given id from the given collection.
    * @param {string} collectionName - The name of the collection to query.
    * @param {string} id - The id of the document to query.
    * @returns {object} The document with the given id from the given collection.
 */
export async function getDocumentById(collectionName, id) {
    try {
        const collectionRef = firestore.collection(collectionName).doc(id);
        const snapshot = await collectionRef.get()
        if (snapshot.exists) {
            return {id: snapshot.id, data: snapshot.data()}
        } else {
            return null
        }
    } catch (error) {
        console.error('(getDocumentById) Error fetching document:', error);
        return null;
    }
}

/*
    * Returns cross products from the given collection or similar products if no collection is given.
    * @param {string} collectionName - The name of the collection to query.
    * @param {array} ids - The ids of the documents to query.
    * @returns {array} The documents with the given ids from the given collection.
 */
export async function getCrossProducts(collectionName) {
    try {
        const collectionRef = !collectionName ? firestore.collection("products")
            : firestore.collection("products").where("collection", "==", collectionName);
        const snapshot = await collectionRef.limit(10).get();
        const documents = [];

        snapshot.forEach((doc) => documents.push(doc.data()));
        return documents;
    }
    catch (error) {
        console.error('(getCrossProducts) Error fetching documents:', error);
        return [];
    }
}

export async function subscribeUser(subscription, uid) {
    try {
        firestore.collection("pushSubs").doc(uid).set(subscription)
        .then(() => {
            console.log("Subscription successfully written!");
        })
        .catch((error) => {
            console.error("Error writing subscription: ", error);
        });
        return true
    } catch (error) {
        console.error('(subscribeUser) Error writing document:', error);
        return false;
    }
}

export async function unsubscribeUser(uid) {
    try {
        firestore.collection("pushSubs").doc(uid).delete()
        .then(() => {
            console.log("Subscription successfully deleted!");
        }).catch((error) => {
            console.error("Error removing subscription: ", error);
        });
        return true
    } catch (error) {
        console.error('(unsubscribeUser) Error removing document:', error);
        return false;
    }
}

export async function getSubscription(uid) {
    try {
        const docRef = firestore.collection("pushSubs").doc(uid);
        const docSnap = await docRef.get(docRef);

        if (docSnap.exists) {
            return docSnap.data();
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error('(getSubscription) Error fetching document:', error);
        return null;
    }
}

export const updateDocument = async (collectionName, documentId, data) => {
    try {
        const docRef = firestore.collection(collectionName).doc(documentId);

        // Use the update method to update the document with the specified data
        await docRef.update(data);

        console.log('Document updated successfully');
    } catch (error) {
        console.error('Error updating document:', error);
        throw error;
    }
};

export const addToFavorites = async (uid, recipeId) => {
    try {
        // Assuming 'recipes' is the collection
        const recipeRef = firestore.collection('recipes').doc(recipeId);
        let newArray
        
        let recipe = await recipeRef.get()
        if (recipe.exists) {
            const data = recipe.data();
            newArray = [...data.followers, uid]
        } else {
            // recipe.data() will be undefined in this case
            console.log("No such document!");
        }
        
        // Update the recipe to add the user's UID to the 'followers' array
        await updateDocument('recipes', recipeId, {
            followers: newArray,
        });

        console.log('Recipe added to favorites successfully');
    } catch (error) {
        console.error('Error adding recipe to favorites:', error);
        throw error;
    }
};

export const removeFromFavorites = async (uid, recipeId) => {
    try {
        // Assuming 'recipes' is the collection
        const recipeRef = firestore.collection('recipes').doc(recipeId);
        let newArray
        let index

        let recipe = await recipeRef.get()
        if (recipe.exists) {
            const data = recipe.data();
            index = data.followers.indexOf(uid)
            newArray = data.followers
        } else {
            // recipe.data() will be undefined in this case
            console.log("No such document!");
        }
        newArray.splice(index, 1)
        // Update the recipe to add the user's UID to the 'followers' array
        await updateDocument('recipes', recipeId, {
            followers: newArray,
        });

        console.log('Removed user from followers successfully');
    } catch (error) {
        console.error('Error removing user from favorites:', error);
        throw error;
    }
};

export const deleteDocument = async (collectionName, documentId) => {
    try {
        // Assuming 'recipes' is the collection where recipe documents are stored
        const recipeRef = firestore.collection(collectionName).doc(documentId);

        // Delete the recipe document
        await recipeRef.delete();

        console.log('Recipe deleted successfully');
    } catch (error) {
        console.error('Error deleting recipe:', error);
        throw error;
    }
};