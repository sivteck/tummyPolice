const Redis = require('ioredis')
const publisher = new Redis()

async function publishLoc (geo) {
  await publisher.publish('deliverpartnerlocation', geo)
  return 'success'
}

module.exports = { publishLoc }
