const { register, login, logout, checkValidSession } = require("../controllers/customerManagementController.js")
const express = require("express")
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/checkValidSession', checkValidSession)

module.exports = router
