const express = require("express")
const { restaurants } = require("../controllers/restaurantController.js")
const { getMenu } = require("../controllers/menuController.js")
const { getCart, updateCart } = require("../controllers/cartController.js")
const router = express.Router()

router.get('/restaurants', restaurants)
router.get('/menu', getMenu)
router.get('/cart', getCart)
router.post('/cart', updateCart)

module.exports = router
