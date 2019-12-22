const SET_CART = "SET_CART"
const ADD_TO_CART = "ADD_TO_CART"
const INCREMENT_ITEM = "INCREMENT_ITEM"
const DECREMENT_ITEM = "DECREMENT_ITEM"
const EMPTY_CART = "EMPTY_CART"

const emptyCartAction = async (id, dispatch) => {
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

export {
  SET_CART,
  ADD_TO_CART,
  INCREMENT_ITEM,
  DECREMENT_ITEM,
  EMPTY_CART,
  emptyCartAction
}
