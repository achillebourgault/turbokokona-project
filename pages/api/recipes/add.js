import {firestore} from '../services/FirebaseAdmin'

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'https://www.turbokokona.com');
    const currentDate = new Date();
    try {
        const collectionRef = firestore.collection('recipes');
        await collectionRef.add({
            author: req.body.uid,
            name: req.body.title,
            description: req.body.description,
            cookingTime: req.body.cookingTime,
            preparationTime: req.body.preparationTime,
            images: req.body.images,
            ingredients: req.body.ingredients,
            steps: req.body.steps,
            date: currentDate.getTime(),
            type: "recipe",
            followers: [],
        });
        res.status(201).json({ status: "OK" });
    } catch (error) {
        console.error('Error adding document:', error);
        res.status(500).json({ error: 'Failed to add document' });
    }
}