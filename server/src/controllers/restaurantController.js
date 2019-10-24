const { getRestaurantsByCity } = require("../db/relational/restaurants.js")

async function restaurants (req, res) {
  console.log(req.body.city)
  let restaurants = await getRestaurantsByCity('Bangalore')
  res.status(200).json(restaurants)
}

module.exports = { restaurants }
