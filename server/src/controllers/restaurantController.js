const { getRestaurantsByCity, getRestaurantInfoById, getRestaurantsByLoc, getRestaurantsByPlace } = require("../db/relational/restaurants.js")

async function restaurants (req, res) {
  const restaurants = await getRestaurantsByCity('Bangalore')
  res.json(restaurants)
}

async function restaurantInfo (req, res) {
  const deets = await getRestaurantInfoById(req.query.id)
  res.json(deets)
}

async function restaurantsByLoc (req, res) {
  const { latitude, longitude, placeid } = req.query
  try {
    if (placeid) {
      const restaurants = await getRestaurantsByPlace(placeid)
      res.json(restaurants)
    }
    else if (latitude && longitude) {
      const restaurants = await getRestaurantsByLoc({ latitude, longitude })
      res.json(restaurants)
    }
  }
  catch (error) {
    console.error(error)
  }
}

module.exports = { restaurants, restaurantInfo, restaurantsByLoc }
