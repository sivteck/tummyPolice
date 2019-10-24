const uuid = require('uuid/v4')
const menu = require('./menuData.js')

let restaurantData = { id: uuid(), restaurantName: 'simba mess',
                       address: '18th Main, IndiraNagar', city: 'Bangalore'}

module.exports = restaurantData
