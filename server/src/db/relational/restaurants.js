const { query } = require("./schema.js")

async function insertRestaurant (restaurantObj) {
  let { id, restaurantName, address, city } = restaurantObj
  let text = 'INSERT INTO restaurants VALUES ($1, $2, $3, $4)'
  let values = [id, restaurantName, address, city]
  try {
    let result = await query(text, values)
  }
  catch (error) {
    console.log(error)
    console.error(error)
  }
}

async function getRestaurantsByCity (city) {
  let text = 'SELECT * FROM restaurants WHERE city = $1'
  let values = [city]
  try {
    let result = await query(text, values)
    return result.rows
  }
  catch (error) {
    console.error(error)
  }
}

async function getRestaurantInfoById (id) {
  let text = 'SELECT * FROM restaurants WHERE id = $1'
  let values = [id]
  try {
    let result = await query(text, values)
    return result.rows
  }
  catch (error) {
    console.error(error)
  }
}

module.exports = { insertRestaurant, getRestaurantsByCity, getRestaurantInfoById }
