require('dotenv').config()

const express = require('express')
const http = require('http')

const twilio = require('twilio');
const cors = require('cors')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())

const server = http.createServer(app)

app.get('/', (req, res) => {
  res.json({ message: 'hi, there !' })
})

app.get('/api/get-turn-credentials', (req, res) => {
  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  
  client.tokens.create().then(token => {
    console.log('turn server credentials: ', token)
    res.json({ token })
  }).catch(error => {
    console.log(error)
    res.send({ message: 'failed to fetch TURN crendntials', error })
  })
})

server.listen(PORT, () => console.log(`server listening on port ${PORT}`))