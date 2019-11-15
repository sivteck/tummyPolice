const { autocompletePlaces } = require("../controllers/placesController.js")

const express = require("express")
const router = express.Router()

router.get('/place/autocomplete/json', autocompletePlaces)

module.exports = router
