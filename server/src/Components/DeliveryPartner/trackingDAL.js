const Redis = require('ioredis')
const publisher = new Redis()

async function publishLoc (geo) {
  await publisher.publish('deliverypartnerlocation', geo)
  return 'success'
}

module.exports = { publishLoc }
