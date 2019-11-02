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
  let cart = req.body
  try {
    await insertCart(cart)
    res.status(201).json(cart)
  }
  catch (error) {
    console.error(error)
  }
}

async function checkout (req, res) {
  try {
    let cartState = await getCartState()
    let bill =  { ...cartState, bill: genBill(cartState.cart) }
    res.status(200).json(bill)
  }
  catch (error) {
    console.error(error)
  }
}

function genBill (cart) {
  let bill = {}
  bill.deliveryfee = calculateDeliveryFee(cart)
  bill.subtotal = calculateBillTotal(cart)
  bill.total = calculateBillTotal(cart) + bill.deliveryfee
  return bill
}

function calculateBillTotal (cart) {
  let total = 0
  for (let key in cart) total += cart[key].price
  return total
}

function calculateDeliveryFee (cart) {
  return 30
}

module.exports = { getCart, updateCart, checkout }
