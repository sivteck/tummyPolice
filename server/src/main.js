const fs = require('fs')
const express = require('express')
const Redis = require('ioredis')
const http = require('http')
const https = require('https')
const WebSocket = require('ws')
const url = require('url')
const path = require('path')

const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const port = 8080
const client = new Redis()

const { orderTracking } = require('./Components/Order/orderDAL.js')

const app = express()

const privateKey = fs.readFileSync('/etc/letsencrypt/live/tummypolice.iyangi.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/tummypolice.iyangi.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/tummypolice.iyangi.com/chain.pem', 'utf8');

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

app.use('/api/v1', require('./routes/restaurants.js'))
app.use('/api/v1', require('./routes/userManagement.js'))
app.use('/api/v1', require('./routes/places.js'))
app.use('/api/v1/deliverypartner', require('./Components/DeliveryPartner/deliveryPartnerAPI.js'))
app.use('/api/v1', require('./Components/Order/orderAPI.js'))

app.get('/*', (req, res) => {
  res.sendFile(path.normalize(__dirname + '../../../client/build' + '/index.html'))
})

const httpServer = http.createServer(app)
const httpsServer = https.createServer(credentials, app)


const webSocketServer = new WebSocket.Server({ noServer: true })

webSocketServer.on('connection', (webSocket) => {
  orderTracking(webSocket)
  console.log('Clients: ', webSocketServer.clients.size)
  app.locals.clients = webSocketServer.clients
})

httpsServer.on('upgrade', function upgrade (request, socket, head) {
  const pathname = url.parse(request.url).pathname
  console.log(pathname)
  if (pathname === '/api/v1/trackorder') {
    webSocketServer.handleUpgrade(request, socket, head, function done (ws) {
      webSocketServer.emit('connection', ws, request)
    })
  } else socket.destroy()
})

httpServer.listen(port, () => console.log("gonna kill your hunger starting from port", port))
httpsServer.listen(8088, () => console.log('HTTPS Server running on port 8088'))
