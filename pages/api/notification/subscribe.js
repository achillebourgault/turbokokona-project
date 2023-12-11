import { subscribeUser } from "../services/Firestore"

const Subscribe = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://www.turbokokona.com');
    if (req.method == 'POST') {
      const { sub, uid } = req.body
      console.log(sub)
      subscribeUser(sub, uid).then((response) => {
        if (response === false)
            res.statusCode = 500;
        res.end()
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
  
  export default Subscribe