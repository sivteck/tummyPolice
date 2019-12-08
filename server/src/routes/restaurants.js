const { restaurants, restaurantInfo, restaurantsByLoc } = require("../controllers/restaurantController.js")
const { getMenu } = require("../controllers/menuController.js")
const { getCart, updateCart, checkout } = require("../controllers/cartController.js")
const express = require("express")
const router = express.Router()

router.get('/restaurants', restaurantsByLoc)
router.get('/restaurant/info', restaurantInfo)
router.get('/menu', getMenu)
router.get('/cart', getCart)
router.post('/cart', updateCart)
router.get('/checkout', checkout)

module.exports = router
