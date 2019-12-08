const { getRestaurantsByCity, getRestaurantInfoById, getRestaurantsByLoc } = require("../db/relational/restaurants.js")

async function restaurants (req, res) {
  const restaurants = await getRestaurantsByCity('Bangalore')
  res.json(restaurants)
}

async function restaurantInfo (req, res) {
  const deets = await getRestaurantInfoById(req.query.id)
  res.json(deets)
}

async function restaurantsByLoc (req, res) {
  const { latitude, longitude } = req.query
  if (latitude && longitude) {
    try {
      const restaurants = await getRestaurantsByLoc({ latitude, longitude })
      res.json(restaurants)
    }
    catch (error) {
      console.error(error)
    }
  }
}

module.exports = { restaurants, restaurantInfo, restaurantsByLoc }
