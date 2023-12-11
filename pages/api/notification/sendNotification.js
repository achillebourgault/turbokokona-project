import { getSubscription } from '../services/Firestore'

const webPush = require('web-push')

webPush.setVapidDetails(
  `mailto:${process.env.WEB_PUSH_EMAIL}`,
  process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
  process.env.WEB_PUSH_PRIVATE_KEY
)

const SendNotification = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://www.turbokokona.com');
  if (req.method == 'POST') {
    const { uid } = req.body
    const subscription = await getSubscription(uid);
    if (subscription == null) {
      res.statusCode = 405
      res.end()
    }

    webPush
      .sendNotification(
        subscription,
        JSON.stringify({ title: 'Hello Web Push', message: 'Your web push notification is here!' })
      )
      .then(response => {
        res.writeHead(response.statusCode, response.headers).end(response.body)
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
  } else {
    res.statusCode = 405
    res.end()
  }
}

export default SendNotification