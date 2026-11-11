import React from "react";

const TAX_RATE = 0.08; 


function OrderSummary(props) {
  let subtotal = 0;
  props.items.forEach((item) => {
    subtotal = subtotal + item.price * item.quantity;
  });

  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  return (
    <div className="summary">
      <div className="summary-row">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="summary-row">
        <span>Tax (8%)</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      <div className="summary-row total">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default OrderSummary;
