import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useContext(CartContext);
  const totalPrice = cart.reduce((acc, curr) => acc + curr.price, 0);
  const totalItems = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  // console.log('total items:' + totalItems)

  async function fetchData() {
    try {
      let res = await fetch("http://tummypolice.iyangi.com/api/v1/cart");
      let data = await res.json();
      console.log(data);
      setCart(data);
    } catch (error) {
      console.log(error);
    }
  }

  fetchData();

  return (
    <div>
      {cart.length === 0 ? (
        <div>
          <h1>Cart Empty</h1>
        </div>
      ) : (
        <div>
          <h1>Cart</h1>
          {cart.length === 1 ? (
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

          {cart.map(item => (
            <div className="cartItem">
              <div> {item.name}</div>
              <div> {item.quantity}</div>
              <div> &#8377; {item.price}</div>
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
