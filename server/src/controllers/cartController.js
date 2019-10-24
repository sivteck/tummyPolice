const { getCartState, insertCart } = require("../db/objectStore/cart.js")

async function getCart (req, res) {
  try {
    let cart = await getCartState()
    res.status(200).json(cart)
  }
  catch (error) {
    console.error(error)
  }
}

async function updateCart (req, res) {
  let cart = req.body.cart
  try {
    await insertCart(cart)
    res.status(201)
  }
  catch (error) {
    console.log(error)
  }
}

module.exports = { getCart, updateCart }
