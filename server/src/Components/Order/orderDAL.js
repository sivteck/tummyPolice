const uuid = require('uuid/v4')
const { query } = require('../../db/relational/schema.js')

// subscriber.on('message', function (channel, message) {
//   console.log('current location: ', message)
// })

// function orderTracking (websocket) {
//   subscriber.subscribe('deliverpartnerlocation', function (channel, message) {
//     console.log(message)
//     websocket.send(message)
//   })
// }

async function insertOrder (orderDeets) {
  const { userDetails, order, location } = orderDeets
  const { restaurantId, cartItems, bill } = order
  const { latitude, longitude } = location
  const text = `INSERT INTO orders VALUES($1, $2, $3, ST_MakePoint($4, $5), $6) returning id`
  const values = [uuid(), userDetails.id, restaurantId, latitude, longitude, JSON.stringify(orderDeets)]
  try {
    const result = await query(text, values)
    return result.rows[0]
  }
  catch (error) {
    console.error(error)
  }
}

// subscriber.on('message', function (channel, message) {
//   console.log(message)
// })

module.exports = { insertOrder }
