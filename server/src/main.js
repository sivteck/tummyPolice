const restaurantRoutes = require('./routes/restaurants.js')
const userManagementRoutes = require('./routes/userManagement.js')
const placesRoutes = require('./routes/places.js')
const trackingRoutes = require('./routes/tracking.js')
const fs = require('fs')

const express = require('express')
const Redis = require('ioredis')
const https = require('https');
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const port = 8080
const client = new Redis()

const app = express()

const privateKey = fs.readFileSync('/etc/letsencrypt/live/tummypolice.iyangi.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/tummypolice.iyangi.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/tummypolice.iyangi.com/chain.pem', 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca
};


app.use(
  session({
    store: new RedisStore({ client }),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
      domain: 'iyangi.com',
      httpOnly: false
    }
  })
)

app.use(express.json())
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(express.static('../../client/build'))

app.use('/api/v1', restaurantRoutes)
app.use('/api/v1', userManagementRoutes)
app.use('/api/v1', placesRoutes)
app.use('/api/v1', trackingRoutes)


const httpsServer = https.createServer(credentials, app)

app.listen(port, () => console.log("gonna kill your hunger starting from port", port))

httpsServer.listen(8088, () => {
  console.log('HTTPS Server running on port 8088');
})
