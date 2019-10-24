const Redis = require("ioredis")
const { objectToKVs } = require("./utils")

const redis = new Redis()

async function insertMenuItem (restaurantId, itemObj) {
  let id = itemObj.id
  delete itemObj.id
  let key = 'restaurant:' + restaurantId + ':menu'
  try {
    let result = await redis.hmset(key, id, JSON.stringify(itemObj))
    return result
  }
  catch (error) {
    console.error(error)
  }
}

async function getMenuByRestaurantId (restaurantId) {
  let key = 'restaurant:' + restaurantId + ':menu'
  let result = await redis.hgetall(key)
  let menuItems = []
  for (let id in result) menuItems.push( { id, ...JSON.parse(result[id]) } )
  return menuItems 
}

module.exports = { insertMenuItem, getMenuByRestaurantId }
