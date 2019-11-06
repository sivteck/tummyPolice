const Redis = require("ioredis")
const redis = new Redis()

async function addRestaurantLocation (restaurantId, latitude, longitude) {
  try {
    redis.geoadd('restaurant:location', latitude, longitude, restaurantId)
  }
  catch (error) {
    console.error(error)
  }
}

async function getRestaurantLocation (restaurantId) {
  try {
    redis.geopos('restaurant:location', restaurantId)
  }
  catch (error) {
    console.error(error)
  }
}
