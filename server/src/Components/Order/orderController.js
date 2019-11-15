const Redis = require('ioredis')
const redis = new Redis()
const { orderTracking } = require('./orderDAL.js')

function placeOrder (req, res) {
}

function trackOrder (req, res) {
  orderTracking()
}

module.exports = { placeOrder, trackOrder }
