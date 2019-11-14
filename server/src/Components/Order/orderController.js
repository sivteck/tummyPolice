const Redis = require('ioredis')
const redis = new Redis()
const { orderTracking } = require('./orderDAL.js')

function placeOrder (req, res) {
}

function trackOrder (req, res) {
}

module.exports = { placeOrder, trackOrder }
