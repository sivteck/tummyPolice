const { getMenuByRestaurantId } = require("../db/objectStore/menu.js")

async function getMenu (req, res) {
  let restaurantId = req.query.restaurantid
  let menu = await getMenuByRestaurantId(restaurantId)
  res.status(200).json(menu)
}

module.exports = { getMenu }
