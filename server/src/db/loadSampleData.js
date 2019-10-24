const { initDb } = require("./relational/schema.js")
const { insertRestaurant } = require("./relational/restaurants.js")
const restaurantData = require('../../sampleData/restaurantData.js')
const menuData = require('../../sampleData/menuData.js')

console.log('----------Following Sample Data Loaded----------')
console.log({ ...restaurantData, menu: menuData })

module.exports = async () => {
  try {
    await initDb()
    await insertRestaurant(restaurantData)
  }
  catch (error) {
    console.error(error)
  }
}
