const { deliveryPartnerTracking } = require("../controllers/tracking.js")

const express = require("express")
const router = express.Router()

router.post('/deliverypartner/track', deliveryPartnerTracking)

module.exports = router
