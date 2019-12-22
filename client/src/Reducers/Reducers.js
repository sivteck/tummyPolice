export const incrementItem = (cart, id) => {
  console.log("increment item")
  let { name, price, quantity } = cart.cartItems[id]
  let priceOfOneItem = price / quantity
  quantity += 1
  price = priceOfOneItem * quantity
  let cartValue = {
    restaurantId: cart.restaurantId,
    cartItems: Object.assign(cart.cartItems, {
      [id]: { name: name, price: price, quantity: quantity }
    })
  }
  return cartValue
}

export const decrementItem = (cart, id) => {
  console.log("decrement item", cart)
  let { name, price, quantity } = cart.cartItems[id]
  let priceOfOneItem = price / quantity
  quantity -= 1
  console.log(quantity)
  if (quantity === 0) {
    const newObj = Object.assign({}, cart.cartItems)

    delete newObj[id]

    let cartValue = {
      restaurantId: cart.restaurantId,
      cartItems: newObj
    }
    console.log("item decremented", cartValue)
    return cartValue
  }
  price = priceOfOneItem * quantity
  let cartValue = {
    restaurantId: cart.restaurantId,
    cartItems: Object.assign(cart.cartItems, {
      [id]: { name: name, price: price, quantity: quantity }
    })
  }
  console.log("item decremented", cartValue)
  return cartValue
}

export const addToCart = (
  cart,
  { id, restaurantId, name, price, quantity },
  urlId
) => {
  if (id in cart.cartItems) {
    let updateQuantity = cart.cartItems[id].quantity
    let updatePrice = cart.cartItems[id].price
    updateQuantity += 1
    updatePrice = price * updateQuantity
    let cartValue = {
      restaurantId,
      cartItems: Object.assign(cart.cartItems, {
        [id]: {
          name,
          price: updatePrice,
          quantity: updateQuantity
        }
      })
    }
    return cartValue
  }

  let cartValue = {
    restaurantId,
    cartItems: Object.assign(cart.cartItems, {
      [id]: {
        name,
        price,
        quantity
      }
    })
  }
  return cartValue
}

export const emptyCart = id => {
  const cartValue = {
    restaurantId: id,
    cartItems: {}
  }
  console.log("cartValue from emptycart", cartValue)
  return cartValue
}
