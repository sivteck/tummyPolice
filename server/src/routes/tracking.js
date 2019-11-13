const { deliveryPartnerTracking } = require("../controllers/tracking.js")

const express = require("express")
const router = express.Router()

router.get('/deliverypartner/track', deliveryPartnerTracking)

module.exports = router
