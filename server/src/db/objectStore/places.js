const Redis = require("ioredis")
const redis = new Redis()

let itemsInDescription = ['name', 'street', 'city']

async function getPlaces (str) {
  try {
    const minStr = str.slice(0,-1) + String.fromCharCode(String(str[str.length-1].charCodeAt()+1))
    const res = await redis.zrevrangebylex('places', '[' + minStr, '[' + str)
    let placesInfo = getIds(res).map(getPlaceInfoById)
    placesInfo = await Promise.all(placesInfo)
    return buildPlacesObj(placesInfo)
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

async function getPlaceInfoById (id) {
  let res = await redis.hgetall('place:' + id)
  return res
}

function buildPlacesObj (placesInfo) {
  let places = { status: "OK" }
  places.predictions = placesInfo
  return places
}

module.exports = { getPlaces }
