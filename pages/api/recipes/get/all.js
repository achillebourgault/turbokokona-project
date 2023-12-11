import { getAllDocumentsInCollection } from '../../services/Firestore'

/* /api/getAll -- GET */
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'https://www.turbokokona.com');
    try {
        res.status(200).json(await getAllDocumentsInCollection('recipes'));
    } catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).json({ error: 'Failed to fetch documents' });
    }
}
