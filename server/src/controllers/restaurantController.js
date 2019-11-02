const { getRestaurantsByCity, getRestaurantInfoById } = require("../db/relational/restaurants.js")

async function restaurants (req, res) {
  let restaurants = await getRestaurantsByCity('Bangalore')
  res.status(200).json(restaurants)
}

async function restaurantInfo (req, res) {
  let deets = await getRestaurantInfoById(req.query.id)
  res.status(200).json(deets)
}

module.exports = { restaurants, restaurantInfo }
