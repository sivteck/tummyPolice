const Redis = require('ioredis')
const producer = new Redis()

async function publishLoc (geo) {
  await producer.xadd('deliverypartnerlocation', geo)
  return 'success'
}

module.exports = { publishLoc }
