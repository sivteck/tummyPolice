import URL from "../config"
const SET_CART = "SET_CART"
const ADD_TO_CART = "ADD_TO_CART"
const INCREMENT_ITEM = "INCREMENT_ITEM"
const DECREMENT_ITEM = "DECREMENT_ITEM"
const EMPTY_CART = "EMPTY_CART"

const emptyCartAction = async (id, dispatch) => {
  console.log("console in emptyCartAction")
  await fetch(`${URL}/cart`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      restaurantId: id,
      cartItems: {}
    })
  })
  dispatch({ type: EMPTY_CART, id: id })
}

const decrementItemAction = (cart, dispatch, id) => {
  if (
    Object.keys(cart.cartItems).length === 1 &&
    cart.cartItems[id].quantity === 1
  ) {
    console.log("1 item in cart")
    emptyCartAction(cart.restaurantId, dispatch)
    return
  }
  dispatch({
    type: DECREMENT_ITEM,
    id
  })
}

export {
  SET_CART,
  ADD_TO_CART,
  INCREMENT_ITEM,
  DECREMENT_ITEM,
  EMPTY_CART,
  emptyCartAction,
  decrementItemAction
}
