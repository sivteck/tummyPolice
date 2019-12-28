const fs = require('fs')
const express = require('express')
const Redis = require('ioredis')
const http = require('http')
const https = require('https')
const url = require('url')
const path = require('path')

const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const { updateLocation } = require('./Components/DeliveryPartner/deliveryPartnerDAL.js')
const { getOrderDetails } = require('./Components/Order/orderDAL.js')
const { getNearestDeliveryPartners } = require('./Components/DeliveryPartner/deliveryPartnerDAL.js')

const port = 8080
const client = new Redis()

const { orderTracking } = require('./Components/Order/orderDAL.js')

const app = express()

const privateKey = fs.readFileSync('/etc/letsencrypt/live/tummypolice.iyangi.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/tummypolice.iyangi.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/tummypolice.iyangi.com/chain.pem', 'utf8');

const Restaurants = {}
const Users = {}
const DeliveryPartners = {}
let DPUserMapping = {}

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca
}

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

const restaurantRoutes = require('./routes/restaurants.js')
const userManagementRoutes = require('./routes/userManagement.js')
const placesRoutes = require('./routes/places.js')
const trackingRoutes = require('./routes/tracking.js')

app.use('/api/v1', require('./routes/userManagement.js'))
app.use('/api/v1', require('./routes/restaurants.js'))
app.use('/api/v1', require('./routes/places.js'))
app.use('/api/v1/deliverypartner', require('./Components/DeliveryPartner/deliveryPartnerAPI.js'))
app.use('/api/v1/restaurant', require('./Components/Restaurant/restaurantAPI.js'))

app.use('/api/v1', require('./Components/Order/orderAPI.js'))

app.get('/*', (req, res) => {
  res.sendFile(path.normalize(__dirname + '../../../client/build' + '/index.html'))
})

const httpServer = http.createServer(app)
const httpsServer = https.createServer(credentials, app)

const io = require('socket.io')(httpsServer)

// io.on("connection", (socket) => {
//   console.log('connected')
//   socket.on('new location', (msg) => console.log(msg))
// })

async function notifyRestaurant (orderDeets, orderId) {
  const { orderdetails } = orderDeets
  const { userdetails, order, location } = orderdetails
  const { restaurantId, cartItems } = order
  const socket = Restaurants[restaurantId]
  order.orderId = orderId
  order.location = location
  socket.emit('order details', order)
}

async function assignDeliveryPartner (orderDeets, orderId) {
  const { orderdetails } = orderDeets
  const { userDetails, order, location } = orderdetails
  const { id } =  userDetails
  const { restaurantId } = order
  const nearestDeliveryPartners = await getNearestDeliveryPartners(restaurantId)

  const nearestDeliveryPartner = nearestDeliveryPartners[0]
  const dpId = nearestDeliveryPartner.id
  if (DeliveryPartners[dpId]) {
    order.location = location
    order.orderId = orderId
    DeliveryPartners[dpId].emit('new task', order)
    DeliveryPartners[dpId].removeAllListeners('task accepted')
    DeliveryPartners[dpId].on('task accepted', function (orderid) {
      DPUserMapping[dpId] = id
    })
  }
}

io.on("connection", socket => {
  socket.removeAllListeners('active restaurant')
  socket.on('active restaurant', async function (id) {
    if (!id) return
    Restaurants[id] = socket
    socket.removeAllListeners('order approved')
    socket.on('order approved', async function (orderId) {
      const orderDeets = await getOrderDetails(orderId)
      if (!(socket.dpAssigned === orderId)) await assignDeliveryPartner(orderDeets, orderId)
      socket.dpAssigned = orderId
    })
  })
  socket.removeAllListeners('active user')
  socket.on('active user', async function (id) {
    socket.removeAllListeners('active order', () => {})
    socket.on('active order', async function (orderId) {
      const orderDeets = await getOrderDetails(orderId)
      if (!(socket.orderSent === orderId)) notifyRestaurant(orderDeets, orderId)
      socket.orderSent = orderId
    })
    Users[id]= socket
  })
  socket.removeAllListeners('active delivery partner')
  socket.on('active delivery partner', async function (id) {
    DeliveryPartners[id] = socket
    socket.removeAllListeners('update location')
    socket.on('update location', async function(location) {
      await updateLocation(id, location)
      if (DPUserMapping[id]) {
        Users[DPUserMapping[id]].emit('order location', location)
      }
    })
  })
})

httpServer.listen(port, () => console.log("gonna kill your hunger starting from port", port))
httpsServer.listen(8088, () => console.log('HTTPS Server running on port 8088'))
