import React from "react";
import { Link } from "react-router-dom";
import OrderSummary from "../components/OrderSummary";

function Cart(props) {
  const cart = props.cart;

  if (cart.length === 0) {
    return (
      <div className="container center">
        <h1 className="page-title">Your Cart</h1>
        <p className="empty">Your cart is empty.</p>
        <Link to="/menu" className="btn">
          Go to the menu
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">Your Cart</h1>

      <div className="cart-layout">
        <div className="card">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>${item.price.toFixed(2)} each</p>
              </div>

              <div className="quantity">
                <button onClick={() => props.changeQuantity(item.id, -1)}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => props.changeQuantity(item.id, 1)}>+</button>
              </div>

              <span className="item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </span>

              <button
                className="remove-btn"
                onClick={() => props.removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="card">
          <h2>Order Summary</h2>
          <OrderSummary items={cart} />
          <Link to="/checkout" className="btn btn-full">
            Go to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
