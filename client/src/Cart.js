import React, { useContext, useEffect } from "react";
import { CartContext } from "./CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useContext(CartContext);
  console.log("carttt", Object.keys(cartItems.cart));

  const totalPrice = Object.keys(cartItems.cart).reduce(
    (sum, key) => sum + cartItems.cart[key].price,
    0
  );
  const totalItems = Object.keys(cartItems.cart).reduce(
    (sum, key) => sum + cartItems.cart[key].quantity,
    0
  );
  console.log("total items:" + totalPrice);

  async function fetchData() {
    try {
      let res = await fetch("http://tummypolice.iyangi.com/api/v1/cart");
      let data = await res.json();

      setCartItems(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

function renderCartItems(cart){
 return( Object.keys(cart).map(item => (
    <div className="cartItem">
      <div> {cart[item].name}</div>
      <div> {cart[item].quantity}</div>
      <div> &#8377; {cart[item].price}</div>
    </div>
  )))
}

  return (
    <div>
      {Object.keys(cartItems.cart).length=== 0 ? (
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
  );
};

export default Cart;
