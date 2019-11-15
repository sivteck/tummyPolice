const Redis = require('ioredis')
const redis = new Redis()

async function insertCart (userId, cartObj) {
  try {
    await redis.set('user:cart:'+ userId, JSON.stringify(cartObj))
  }
  catch (error) {
    console.error(error)
  }
}

async function getCartState (userId) {
  try {
    let cart = await redis.get('user:cart:' + userId)
    return JSON.parse(cart)
  }
  catch (error) {
    console.error(error)
  }
}

module.exports = { insertCart, getCartState }
