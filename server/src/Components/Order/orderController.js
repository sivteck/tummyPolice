const { insertOrder } = require('./orderDAL.js')

async function placeOrder (req, res) {
  const orderDeets = req.body
  try {
    const orderid = await insertOrder(orderDeets)
    res.send({ orderid })
  }
  catch (error) {
    console.error(error)
  }
}

function trackOrder (req, res) {
  orderTracking()
}

module.exports = { placeOrder, trackOrder }

