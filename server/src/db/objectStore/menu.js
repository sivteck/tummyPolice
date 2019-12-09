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
  //hardcode restaurant id, since no restaurant specific menu as of now
  restaurantId = 'f5a53e1d-bd5f-4609-9bb0-12710f96d584'
  let key = 'restaurant:' + restaurantId + ':menu'
  let result = await redis.hgetall(key)
  let menuItems = []
  for (let id in result) menuItems.push( { id, ...JSON.parse(result[id]) } )
  return menuItems 
}

module.exports = { insertMenuItem, getMenuByRestaurantId }
