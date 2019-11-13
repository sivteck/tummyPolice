const restaurantRoutes = require('./routes/restaurants.js')
const userManagementRoutes = require('./routes/userManagement.js')
const placesRoutes = require('./routes/places.js')
const trackingRoutes = require('./routes/tracking.js')

const express = require('express')
const Redis = require('ioredis')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const port = 8080
const client = new Redis()

const app = express()

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

app.listen(port, () => console.log("gonna kill your hunger starting from port", port))
