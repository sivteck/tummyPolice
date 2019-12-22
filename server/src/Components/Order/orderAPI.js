const express = require('express')
const router = express.Router()

const { placeOrder } = require('./orderController.js')

router.post('/order', placeOrder)

module.exports = router
