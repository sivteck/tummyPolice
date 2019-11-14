const Redis = require('ioredis')
const subscriber = new Redis()

subscriber.on('message', function (channel, message) {
  console.log('current location: ', message)
})

function orderTracking () {
}

subscriber.on('message', function (channel, message) {
  console.log(message)
})

module.exports = { orderTracking }
