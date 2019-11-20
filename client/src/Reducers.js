export const incrementItem = (cart,id) => {
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

export const decrementItem = (cart,id) => {
    // let item = event.target.parentElement.id
    let { name, price, quantity } = cart.cartItems[id]
    let priceOfOneItem = price / quantity
    quantity -= 1
    if (quantity === 0) {
      const newObj = Object.assign({}, cart.cartItems)
      delete newObj[id]
      let cartValue = {
        restaurantId: cart.restaurantId,
        cartItems: newObj
      }
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

export const addToCart = (cart, props) => {
    let key = props.id
    console.log(props, cart)
    if (key in cart.cartItems) {
      let { quantity, price } = cart.cartItems[key]
      quantity += 1
      price = props.price * quantity
      let cartValue = {
        restaurantId: props.restaurantId,
        cartItems: Object.assign(cart.cartItems, {
          [props.id]: { name: props.name, price: price, quantity: quantity }
        })
      }
      return cartValue
    } 
      let cartValue = {
        restaurantId: props.restaurantId,
        cartItems: Object.assign(cart.cartItems, {
          [props.id]: {
            name: props.name,
            price: props.price,
            quantity: props.quantity
          }
        })
       
      }
      return cartValue
    } 

