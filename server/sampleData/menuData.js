let uuid = require('uuid/v4')

let ids = []

for (let i = 0; i < 10; i++) ids.push(uuid())

let names =  ['idli', 'dosa', 'vada', 'onion dosa', 'rava dosa',
              'pongal', 'curd vada', 'masala dosa', 'bajji', 'tea']

let isVegetarian = new Array(10).fill(true)

let itemCategories = ['breakfast', 'breakfast', 'snack', 'breakfast', 'breakfast',
                      'breakfast', 'snack', 'breakfast', 'snack', 'beverage']

let itemIngredients = new Array(10).fill('some ingredients separated, by, commas')

let menuData = []

let menu = ids.map((id, index, array) => ({ id: id, name: names[index], vegetarian: isVegetarian[index], category: itemCategories[index], ingredients: itemIngredients[index] }))

module.exports = menu
