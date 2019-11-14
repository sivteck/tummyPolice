const express = require('express')
const router = express.Router()

const { placeOrder, trackOrder } = require('./orderController.js')

router.post('/order', placeOrder)
router.get('/track', trackOrder)

module.exports = router
