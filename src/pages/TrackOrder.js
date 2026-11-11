import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OrderSummary from "../components/OrderSummary";

const stages = [
  { icon: "🧾", name: "Received" },
  { icon: "👨‍🍳", name: "Preparing" },
  { icon: "🛵", name: "On the way" },
  { icon: "🏠", name: "Delivered" },
];

const SECONDS_PER_STAGE = 10; 

function TrackOrder(props) {
  const order = props.order;
  const [now, setNow] = useState(Date.now());

 
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (order === null) {
    return (
      <div className="container center">
        <h1 className="page-title">Track Your Order</h1>
        <p className="empty">You have not placed an order yet.</p>
        <Link to="/menu" className="btn">
          Order something
        </Link>
      </div>
    );
  }


  const secondsPassed = (now - order.time) / 1000;
  let currentStage = Math.floor(secondsPassed / SECONDS_PER_STAGE);
  if (currentStage > stages.length - 1) {
    currentStage = stages.length - 1;
  }

  const progress = (currentStage / (stages.length - 1)) * 100;

  return (
    <div className="container">
      <h1 className="page-title">Order #{order.id}</h1>

      <div className="card">
        <h2 className="center">
          {stages[currentStage].icon} {stages[currentStage].name}
        </h2>

        <div className="progress">
          <div className="progress-fill" style={{ width: progress + "%" }}></div>
        </div>

        <div className="stages">
          {stages.map((stage, index) => (
            <div
              key={stage.name}
              className={index <= currentStage ? "stage done" : "stage"}
            >
              <span className="stage-icon">{stage.icon}</span>
              <span>{stage.name}</span>
            </div>
          ))}
        </div>

        <p className="note center">
          Demo: the status changes every {SECONDS_PER_STAGE} seconds.
        </p>
      </div>

      <div className="cart-layout">
        <div className="card">
          <h2>Delivery details</h2>
          <p><strong>Name:</strong> {order.name}</p>
          <p><strong>Phone:</strong> {order.phone}</p>
          <p><strong>Address:</strong> {order.address}</p>
          <p><strong>Payment:</strong> {order.payment === "cash" ? "Cash" : "Card"} on delivery</p>
        </div>

        <div className="card">
          <h2>Receipt</h2>
          {order.items.map((item) => (
            <div className="summary-row" key={item.id}>
              <span>{item.quantity} × {item.name}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <OrderSummary items={order.items} />
        </div>
      </div>
    </div>
  );
}

export default TrackOrder;
