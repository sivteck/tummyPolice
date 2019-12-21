const { register, login, logout, checkValidSession } = require('./deliveryPartnerHandlers.js')
const express = require('express')
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/checkValidSession', checkValidSession)
router.post('/updateLocation', updateLocation)

module.exports = router

