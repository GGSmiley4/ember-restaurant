import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OrderSummary from "../components/OrderSummary";

function Checkout(props) {
  const [values, setValues] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "",
  });
  const [errors, setErrors] = useState([]);

 
  const navigate = useNavigate();

  
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = [];
    if (values.name.trim().length < 2) newErrors.push("Please enter your full name.");
    if (!/^[0-9 ]{7,15}$/.test(values.phone)) newErrors.push("Phone number must be 7 to 15 digits.");
    if (values.address.trim().length < 5) newErrors.push("Please enter your delivery address.");
    if (values.payment === "") newErrors.push("Please choose cash or card.");

    setErrors(newErrors);
    if (newErrors.length > 0) {
      return;
    }

    const order = {
      id: Math.floor(Math.random() * 9000) + 1000,
      name: values.name,
      phone: values.phone,
      address: values.address,
      payment: values.payment,
      items: props.cart,
      time: Date.now(), 
    };

    props.placeOrder(order);
    navigate("/track");
  };

  if (props.cart.length === 0) {
    return (
      <div className="container center">
        <h1 className="page-title">Checkout</h1>
        <p className="empty">Your cart is empty. Add some food first.</p>
        <Link to="/menu" className="btn">
          Go to the menu
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">Checkout</h1>

      <div className="cart-layout">
        <form className="card form" onSubmit={handleSubmit}>
          <h2>Delivery details</h2>

          <label htmlFor="name">Full Name</label>
          <input id="name" name="name" type="text" placeholder="Enter your name..."
            value={values.name} onChange={handleChange} />

          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" placeholder="e.g. 08 123 456"
            value={values.phone} onChange={handleChange} />

          <label htmlFor="address">Address</label>
          <textarea id="address" name="address" rows="3" placeholder="Street, building, city..."
            value={values.address} onChange={handleChange} />

          <label>Payment</label>
          <div className="payment-options">
            <label className="radio">
              <input type="radio" name="payment" value="cash"
                checked={values.payment === "cash"} onChange={handleChange} />
              💵 Cash on delivery
            </label>
            <label className="radio">
              <input type="radio" name="payment" value="card"
                checked={values.payment === "card"} onChange={handleChange} />
              💳 Card on delivery
            </label>
          </div>

          {errors.length > 0 && (
            <ul className="errors">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}

          <button type="submit" className="btn btn-full">
            Place Order
          </button>
          <p className="note">This is a demo. No real payment is taken.</p>
        </form>

        <div className="card">
          <h2>Your order</h2>
          {props.cart.map((item) => (
            <div className="summary-row" key={item.id}>
              <span>{item.quantity} × {item.name}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <OrderSummary items={props.cart} />
        </div>
      </div>
    </div>
  );
}

export default Checkout;
