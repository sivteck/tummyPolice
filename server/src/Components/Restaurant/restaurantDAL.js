const { query } = require('../../db/relational/schema.js')

async function verifyRestaurant (restaurantName) {
  const text = 'SELECT * FROM restaurants WHERE name ILIKE $1'
  try {
    const result = await query(text, [restaurantName])
    return { ...result.rows[0] }
  }
  catch {
    console.error(error)
  }
}

module.exports = { verifyRestaurant }
