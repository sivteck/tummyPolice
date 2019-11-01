import React, { useContext, useEffect } from "react";
import { CartContext } from "./CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useContext(CartContext);
  console.log("carttt", Object.keys(cartItems.cart))
  
  const totalPrice = Object.keys(cartItems.cart).reduce((sum,key) => sum + cartItems.cart[key].price, 0)
  const totalItems =Object.keys(cartItems.cart).reduce((sum,key) => sum + cartItems.cart[key].quantity, 0)
  console.log('total items:' + totalPrice)

  async function fetchData() {
    try {
      let res = await fetch("http://tummypolice.iyangi.com/api/v1/cart");
      let data = await res.json();

      // console.log(data);
      setCartItems(data);
      // return () => ac.abort;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {cartItems.length === 0 ? (
        <div>
          <h1>Cart Empty</h1>
        </div>
      ) : (
        <div>
          <h1>Cart</h1>
          {cartItems.length === 1 ? (
            <div>
              {" "}
              <p>{totalItems} ITEM</p>
            </div>
          ) : (
            <div>
              {" "}
              <p>{totalItems} ITEMS</p>
            </div>
          )}

          { Object.keys(cartItems.cart).map(item => (
            <div className="cartItem">
              <div> {cartItems.cart[item].name}</div>
              <div> {cartItems.cart[item].quantity}</div>
              <div> &#8377; {cartItems.cart[item].price}</div>
            </div>
          ))}
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

      {/* <span>items in cart : {cart.totalItems}</span>
      <br />
      <span>total price : {totalPrice}</span>
      <br/>
      <br/>
      {cart.map(item => (
        <div class= "cartItem">
         <h4> Item : {item.name}</h4>
         <p> Quantity : {item.quantity}</p>
         <p> Price : {item.price}</p>

        </div>
      ))} */}
    </div>
  );
};

export default Cart;
