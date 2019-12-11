export const incrementItem = (cart, id) => {
  // let item = event.target.parentElement.id
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
  // let item = event.target.parentElement.id
  let { name, price, quantity } = cart.cartItems[id]
  let priceOfOneItem = price / quantity
  quantity -= 1
  console.log(quantity)
  if (quantity === 0) {
    console.log("items in cart", cart.cartItems)
    const newObj = Object.assign({}, cart.cartItems)

    console.log("newobj before del", newObj)
    console.log("beforelength", Object.keys(newObj).length)
    console.log("id", id)
    delete newObj[id]
    console.log("newobj after del", newObj)

    console.log("afterlength", Object.keys(newObj).length)

    let cartValue = {
      restaurantId: cart.restaurantId,
      cartItems: newObj
    }
    console.log("cartlength", Object.keys(cartValue.cartItems).length)

    console.log(cartValue)
    return cartValue
  }
  price = priceOfOneItem * quantity
  let cartValue = {
    restaurantId: cart.restaurantId,
    cartItems: Object.assign(cart.cartItems, {
      [id]: { name: name, price: price, quantity: quantity }
    })
  }
  return cartValue
}

export const addToCart = (
  { cartItems },
  { id, restaurantId, name, price, quantity }
) => {
  if (id in cartItems) {
    let updateQuantity = cartItems[id].quantity
    let updatePrice = cartItems[id].price
    updateQuantity += 1
    updatePrice = price * updateQuantity
    let cartValue = {
      restaurantId,
      cartItems: Object.assign(cartItems, {
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
    cartItems: Object.assign(cartItems, {
      [id]: {
        name,
        price,
        quantity
      }
    })
  }
  return cartValue
}
