const Redis = require("ioredis")
const redis = new Redis()

async function insertCart (cartObj) {
  try {
    await redis.set('cart', JSON.stringify(cartObj))
  }
  catch (error) {
    console.error(error)
  }
}

async function getCartState () {
  try {
    let cart = await redis.get('cart')
    return JSON.parse(cart)
  }
  catch (error) {
    console.error(error)
  }
} 

module.exports = { insertCart, getCartState }
