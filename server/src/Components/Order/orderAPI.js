const express = require('express')
const router = express.Router()

const { placeOrder, trackOrder } = require('./orderController.js')

router.post('/order', placeOrder)
router.get('/trackorder', trackOrder)

module.exports = router
