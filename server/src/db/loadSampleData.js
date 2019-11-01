const { initDb } = require("./relational/schema.js")
const { insertRestaurant } = require("./relational/restaurants.js")
const { insertMenuItem, getMenuByRestaurantId } = require("./objectStore/menu.js")
const { createUser } = require("./relational/userManagement.js")

const restaurantData = require("../../sampleData/restaurantData.js")
const menuData = require("../../sampleData/menuData.js")
const userData = require("../../sampleData/userData.js")

console.log('----------Following Sample Data Loaded----------')
console.log('userData:', userData)
console.log('RestaurantData:', { ...restaurantData, menu: menuData })

module.exports = async () => {
  try {
    await initDb()
    await insertRestaurant(restaurantData)
    for (let menuItem of menuData) {
      await insertMenuItem(restaurantData.id, menuItem)
    }
    for (let user of userData) {
      await createUser(user.userName, user.password, user.email, user.phone)
    }
    let testMenuInsertionResult = await getMenuByRestaurantId (restaurantData.id)
  }
  catch (error) {
    console.error(error)
  }
}
