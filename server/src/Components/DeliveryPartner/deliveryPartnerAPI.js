const { register, login, logout, checkValidSession } = require('./deliveryPartnerHandlers.js')
const express = require('express')

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/checkValidSession', checkValidSession)

module.exports = router
