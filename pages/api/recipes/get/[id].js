import { getDocumentById } from '../../services/Firestore'

/* /api/[id] -- GET */
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'https://www.turbokokona.com');
    const {
        query: { id },
    } = req;
    try {
        const doc = await getDocumentById('recipes', id);
        return res.status(200).json(doc);
    } catch (error) {
        console.error('Error fetching document:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}