import React from 'react'
import { Item } from './Item'
import {Restaurant} from './Restaurant'
import Food from './images/food.webp'
export const ItemList = () => {

 const database= [
  {
    restaurantId: '5f48048b-b843-45aa-b906-ed1bbfdf60eb',
    restaurantName: 'simba mess',
    image: Food,
    menu: [
      {
        id: 'f6a40ff2-c385-4b4f-88c6-4224b4ca9c8f',
        name: 'idli',
        vegetarian: true,
        category: 'breakfast',
        ingredients: 'some ingredients separated, by, commas',
        price: 40
      },
      {
        id: '1d12b3e8-bce0-4a2e-bda8-57bd3203a1de',
        name: 'dosa',
        vegetarian: true,
        category: 'breakfast',
        ingredients: 'some ingredients separated, by, commas',
        price: 40
      },
      {
        id: '1eb15b2d-81f7-4392-8231-d557e82387b9',
        name: 'vada',
        vegetarian: true,
        category: 'snack',
        ingredients: 'some ingredients separated, by, commas',
        price: 50
      },
      {
        id: 'fb1a9e85-a835-4999-af49-e03b38fc2173',
        name: 'onion dosa',
        vegetarian: true,
        category: 'breakfast',
        ingredients: 'some ingredients separated, by, commas',
        price: 60
      },
      {
        id: '34a45156-cd55-4261-89ed-dd40f190932f',
        name: 'rava dosa',
        vegetarian: true,
        category: 'breakfast',
        ingredients: 'some ingredients separated, by, commas',
        price: 100
      },
      {
        id: '04a710b5-f98a-4768-af2e-2304500891d8',
        name: 'pongal',
        vegetarian: true,
        category: 'breakfast',
        ingredients: 'some ingredients separated, by, commas',
        price: 40
      },
      {
        id: 'c19f2303-555a-40a2-a276-d793b4ee5faa',
        name: 'curd vada',
        vegetarian: true,
        category: 'snack',
        ingredients: 'some ingredients separated, by, commas',
        price: 60
      },
      {
        id: 'c9ce7c9b-51a7-4c55-b9af-db205c76e9aa',
        name: 'masala dosa',
        vegetarian: true,
        category: 'breakfast',
        ingredients: 'some ingredients separated, by, commas',
        price: 80
      },
      {
        id: 'f4eb1834-00da-4213-939e-ca58612e7827',
        name: 'bajji',
        vegetarian: true,
        category: 'snack',
        ingredients: 'some ingredients separated, by, commas',
        price: 40
      },
      {
        id: '5e538c7c-cf61-4ec2-b1c2-8121ff15feea',
        name: 'tea',
        vegetarian: true,
        category: 'beverage',
        ingredients: 'some ingredients separated, by, commas',
        price: 40
      }
    ]
  }
 ]
  return (
    <div class= "restaurantList">
     <h1> Popular Brands </h1>
      {
        database.map(item => (
          <Restaurant name = {item.restaurantName} img = {item.image} menu = {item.menu} key = {item. restaurantId} />
        )

        )
      }
    </div>
  )



  //   <div class="itemList">
  //     {
  //       database.map(item => (
  //         <Item name={item.name} category= {item.category} ingredients= {item.ingredients} veg= {item.vegetarian}price={item.price} key={item.id} />
  //       ))
  //     }
  //   </div>
  // )
}
export default ItemList