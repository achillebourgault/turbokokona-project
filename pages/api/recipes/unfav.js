import { removeFromFavorites } from '../services/Firestore';

/* /api/recipes/unfav -- POST */
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'https://www.turbokokona.com');
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { uid, recipeId } = req.body;

    try {
        // Assuming removeFromFavorites is a function that removes the recipe from the user's favorites
        await removeFromFavorites(uid, recipeId);

        return res.status(200).json({ message: 'Recipe removed from favorites successfully' });
    } catch (error) {
        console.error('Error removing recipe from favorites:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}