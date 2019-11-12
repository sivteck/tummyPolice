const Redis = require("ioredis")
const redis = new Redis()

async function getPlaces (str) {
  try {
    const minStr = str.slice(0,-1) + String.fromCharCode(String(str[str.length-1].charCodeAt()+1))
    console.log(minStr, str)
    const res = await redis.zrevrangebylex('places', '[' + minStr, '[' + str)
    let placesInfo = getIds(res).map(getPlaceInfoById)
    placesInfo = await Promise.all(placesInfo)
    return placesInfo
  }
  catch (error) {
    console.error(error)
  }
}

function getIds (places) {
  const ids = []
  for (const place of places) {
    ids.push(place.split(':').slice(-1))[0]
  }
  return ids
}

async function getPlaceInfoById(id) {
  let res = await redis.hgetall('place:' + id)
  res.tags = JSON.parse(res.tags)
  return res
}

module.exports = { getPlaces }
