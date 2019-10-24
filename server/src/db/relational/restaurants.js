const { query } = require("./schema.js")

async function insertRestaurant (restaurantObj) {
  let { id, restaurantName, address, city } = restaurantObj
  let text = 'INSERT INTO restaurants VALUES ($1, $2, $3, $4)'
  let values = [id, restaurantName, address, city]
  try {
    let res = await query(text, values)
  }
  catch (error) {
    console.error(error)
  }
}

module.exports = { insertRestaurant }
