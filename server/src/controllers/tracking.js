const { insertCurrentLocation } = require("../db/objectStore/tracking.js")

function deliveryPartnerTracking (req, res) {
  res.json({ msg: 'yeah recording' })
}

module.exports = { deliveryPartnerTracking }
