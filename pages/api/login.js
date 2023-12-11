const jwt = require('jsonwebtoken');

/* /api/getAll -- GET */
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'https://www.turbokokona.com');
    const {uid} = req.body
    try {
        jwt.sign({id: uid}, process.env.JWT_SECRET_KEY, { expiresIn: '1d' },(err, token) => {
            if(err) { console.log(err) }
            res.send({token: token});
        });
    } catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).json({ error: 'Failed to fetch documents' });
    }
}
