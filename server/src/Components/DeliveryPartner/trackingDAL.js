const Redis = require('ioredis')
const publisher = new Redis()

async function publishLoc (geo) {
  publisher.publish(geo)
}
