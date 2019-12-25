const { getCartState, insertCart } = require("../db/objectStore/cart.js")

async function getCart (req, res) {
  let sessionId = req.session.id
  let userId = req.session.userid
  console.log('getCart', req.session)
  // if (userId === undefined) return res.json({ error: 'undefined user :-|' })
  try {
    let cart = await getCartState(userId)
    res.status(200).json(cart)
  }
  catch (error) {
    console.error(error)
  }
}

async function updateCart (req, res) {
  let sessionId = req.session.id
  let userId = req.session.userid
  let cart = req.body
  console.log('updateCart', req.session)
  console.log('getCart', req.session)
  // if (userId === undefined) return res.json({ error: 'undefined user :-|' })
  try {
    await insertCart(userId, cart)
    res.status(201).json(cart)
  }
  catch (error) {
    console.error(error)
  }
}

async function checkout (req, res) {
  let userid = req.session.userid
  console.log('checkout', req.session)
  try {
    let cartState = await getCartState(userid)
    let bill =  { ...cartState, bill: genBill(cartState.cart) }
    res.status(200).json(bill)
  }
  catch (error) {
    console.error(error)
    res.status(200).json({ msg: 'checkout failed', error })
  }
}

async function order (req, res) {
  try {
    let details = req.body
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
