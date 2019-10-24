const express = require('express')
const restaurantRoutes = require('./routes/restaurants.js')

const app = express()
const port = 8080

app.use(express.json())
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use('/api/v1', restaurantRoutes)

app.listen(port, () => console.log("gonna kill your hunger starting from port", port))
