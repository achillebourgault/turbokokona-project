import { addToFavorites, getSubscription } from '../services/Firestore';

const webPush = require('web-push')

webPush.setVapidDetails(
  `mailto:${process.env.WEB_PUSH_EMAIL}`,
  process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
  process.env.WEB_PUSH_PRIVATE_KEY
)

/* /api/recipes/fav -- POST */
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'https://www.turbokokona.com');
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { uid, recipeId, recipeAuthor, recipeName } = req.body;

    try {
        // Assuming you have a function addToFavorites in your Firestore service
        // that adds the recipe to the user's favorites collection
        await addToFavorites(uid, recipeId, recipeAuthor);
        const subscription = await getSubscription(recipeAuthor);
        webPush
        .sendNotification(
            subscription,
            JSON.stringify({ title: 'Turbokokona', message: uid + ' liked your recipe: ' + recipeName + '!' })
        )
        .then(response => {
        })
        .catch(err => {
            if ('statusCode' in err) {
            res.writeHead(err.statusCode, err.headers).end(err.body)
            } else {
            console.error(err)
            res.statusCode = 500
            res.end()
            }
        })

        return res.status(201).json({ message: 'Recipe favorited successfully' });
    } catch (error) {
        console.error('Error favoriting recipe:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}