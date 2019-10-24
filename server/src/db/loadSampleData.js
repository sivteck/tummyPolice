const { initDb } = require("./relational/schema.js")
const { insertRestaurant } = require("./relational/restaurants.js")
const { insertMenuItem, getMenuByRestaurantId } = require("./objectStore/menu.js")

const restaurantData = require("../../sampleData/restaurantData.js")
const menuData = require("../../sampleData/menuData.js")

console.log('----------Following Sample Data Loaded----------')
console.log({ ...restaurantData, menu: menuData })

module.exports = async () => {
  try {
    await initDb()
    await insertRestaurant(restaurantData)
    for (let menuItem of menuData) {
      await insertMenuItem(restaurantData.id, menuItem)
      console.log(menuItem)
    }
    let testMenuInsertionResult = await getMenuByRestaurantId (restaurantData.id)
    console.log(testMenuInsertionResult)
  }
  catch (error) {
    console.error(error)
  }
}
