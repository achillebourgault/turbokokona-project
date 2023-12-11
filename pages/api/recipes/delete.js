import { deleteDocument, getDocumentById } from '../services/Firestore';
const jwt = require('jsonwebtoken');

/* /api/recipes/delete -- DELETE */
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'https://www.turbokokona.com');
    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { uid, recipeId } = req.body;
    const header = req.headers['authorization'];

    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;
    } else {
        console.log("HEADER UNDEFINED")
        //If header is undefined return Forbidden (403)
        res.status(403).json({message: 'Internal Server Error'})
    }
    await jwt.verify(req.token, process.env.JWT_SECRET_KEY, async (err, authorizedData) => {
        if(err){
            //If error send Forbidden (403)
            console.log('ERROR: Could not connect to the protected route');
            console.log(err);
            res.status(403).json({message: 'Internal Server Error'})
        } else {
            try {
                console.log("ICIIII")
                const recipe = await getDocumentById('recipes', recipeId);
                if (recipe.data.author === authorizedData.id) {
                    await deleteDocument('recipes', recipeId);
            
                    return res.status(200).json({ message: 'Recipe deleted successfully' });
                } else {
                    res.status(403).json({message: 'Internal Server Error'})
                }
            } catch (error) {
                console.error('Error deleting recipe:', error);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    })

}
