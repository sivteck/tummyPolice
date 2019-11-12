const { getPlaces } = require("../db/objectStore/places.js")

async function autocompletePlaces (req, res) {
  try {
    let str = req.query.input
    let places = await getPlaces(str)
    res.json(places)
  }
  catch (error) {
    console.error(error)
  }
}

module.exports = { autocompletePlaces }
