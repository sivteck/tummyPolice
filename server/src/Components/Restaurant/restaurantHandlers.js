const { verifyRestaurant } = require('./restaurantDAL.js')

const login = async (req, res) => {
  const rName = req.body.name
  try {
    const restDeets = await verifyRestaurant(rName)
    if (!restDeets.id) return res.json({ error: 'invalid restaurant name' })
    const { id, name } = restDeets
    req.session.id = id
    req.session.name = name
    req.session.restaurant = true
    res.send(restDeets)
  }
  catch (error) {
    console.error(error)
  }
}

module.exports = { login }
