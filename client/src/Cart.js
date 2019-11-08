import React, { useContext, useEffect } from "react"
import { CartContext } from "./CartContext"
import { Link } from "react-router-dom"

const Cart = () => {
  const [cartItems, setCartItems] = useContext(CartContext)
  console.log("carttt", cartItems)

  const totalPrice = Object.keys(cartItems.cart).reduce(
    (sum, key) => sum + cartItems.cart[key].price,
    0
  )
  const totalItems = Object.keys(cartItems.cart).reduce(
    (sum, key) => sum + cartItems.cart[key].quantity,
    0
  )
  console.log("total items:" + totalPrice)

  async function fetchData() {
    try {
      let res = await fetch("http://tummypolice.iyangi.com/api/v1/cart")
      let data = await res.json()

      setCartItems(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  function decQuantity(event) {
    let item = event.target.parentElement.id
    let { name, price, quantity } = cartItems.cart[item]
    let priceOfOneItem = price / quantity

    quantity -= 1
    if (quantity === 0) {
      const newObj = Object.assign({}, cartItems.cart)
      delete newObj[item]
      let cartValue = {
        restaurantId: cartItems.restaurantId,
        cart: newObj
      }
      setCartItems(cartValue)
    } else {
      price = priceOfOneItem * quantity
      let cartValue = {
        restaurantId: cartItems.restaurantId,
        cart: Object.assign(cartItems.cart, {
          [item]: { name: name, price: price, quantity: quantity }
        })
      }
      setCartItems(cartValue)
    }
  }

  function incQuantity(event){
    let item = event.target.parentElement.id
    let { name, price, quantity } = cartItems.cart[item]
    let priceOfOneItem = price / quantity
    quantity += 1
    price = priceOfOneItem * quantity
    let cartValue = {
      restaurantId: cartItems.restaurantId,
      cart: Object.assign(cartItems.cart, {
        [item]: { name: name, price: price, quantity: quantity }
      })
    }
    setCartItems(cartValue)

  }

  function renderCartItems(cart) {
    return Object.keys(cart).map(item => (
      <div className="cartItem">
        <div> {cart[item].name}</div>
        <div className="changeQuantity" id={item}>
          <button onClick={decQuantity}>-</button>
          <div> {cart[item].quantity}</div>
          <button onClick={incQuantity}>+</button>
        </div>
        <div> &#8377; {cart[item].price}</div>
      </div>
    ))
  }

  return (
    <div>
      {Object.keys(cartItems.cart).length === 0 ? (
        <div>
          <h1>Cart Empty</h1>
        </div>
      ) : (
        <div>
          <h1>Cart</h1>
          {Object.keys(cartItems.cart).length === 1 ? (
            <div>
              <p>{totalItems} ITEM</p>
            </div>
          ) : (
            <div>
              <p>{totalItems} ITEMS</p>
            </div>
          )}

          {renderCartItems(cartItems.cart)}
          <br />
          <br />
          <h4>Subtotal :&#8377;{totalPrice}</h4>
          <br />
          <br />
          <Link to="/checkout">
            <button>Checkout</button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Cart
