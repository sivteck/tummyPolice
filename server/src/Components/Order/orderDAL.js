const Redis = require('ioredis')
const subscriber = new Redis()

subscriber.on('message', function (channel, message) {
  console.log('current location: ', message)
})

function orderTracking (websocket) {
  subscriber.subscribe('deliverpartnerlocation', function (channel, message) {
    console.log(message)
    websocket.send(message)
  })
}

subscriber.on('message', function (channel, message) {
  console.log(message)
})

module.exports = { orderTracking }
